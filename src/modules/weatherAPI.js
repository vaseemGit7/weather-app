const weatherAPI = (() => {
  const parseWeatherData = (data) => {
    const { current } = data;
    const { hourly } = data;
    const { daily } = data;
    const weatherData = {
      currentData: {
        currentTime: current.dt,
        currentSunrise: current.sunrise,
        currentSunset: current.sunset,
        currentTemp: current.temp,
        currentFeelsLike: current.feels_like,
        currentHumidity: current.humidity,
        currentUVIndex: current.uvi,
        currentPressure: current.pressure,
        currentWindSpeed: current.wind_speed,
        currentWeather: current.weather[0].main,
      },
      hourlyData: {
        hourlyArr: hourly,
      },
      dailyData: {
        dailyArr: daily,
      },
    };
    return weatherData;
  };

  const getCoords = async (location) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=aaef257495c3f595680e4bb46f989362`,
        { mode: "cors" },
      );

      const data = await response.json();
      console.log("Data", data[0]);
      console.log("lat :", data[0].lat, " ", "lon :", data[0].lon, " ");
      const coords = {
        lat: data[0].lat,
        lon: data[0].lon,
        location: data[0].name,
      };
      return coords;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const getWeatherData = async (location) => {
    try {
      const coords = await getCoords(location);
      const response = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=aaef257495c3f595680e4bb46f989362`,
        { mode: "cors" },
      );
      const locationName = coords.location;
      const data = parseWeatherData(await response.json());
      console.log(data);
      return { data, locationName };
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  return {
    getWeatherData,
  };
})();

export default weatherAPI;
