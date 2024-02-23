const parseWeatherData = (data) => {
  const { current } = data;
  const weatherData = {
    currentData: {
      currentTime: current.dt,
      currentSunRise: current.sunrise,
      currentTemp: current.temp,
      currentFeelsLike: current.feels_like,
      currentHumidity: current.humidity,
      currentUVIndex: current.uvi,
      currentWindSpeed: current.wind_speed,
      currentWindDeg: current.wind_deg,
      currentWeather: current.weather[0].main,
    },
  };
  return weatherData;
};

const getCoords = async () => {
  try {
    const response = await fetch(
      "https://api.openweathermap.org/geo/1.0/direct?q=Trichy&appid=aaef257495c3f595680e4bb46f989362",
      { mode: "cors" },
    );

    const data = await response.json();
    console.log("Data", data[0]);
    console.log("lat :", data[0].lat, " ", "lon :", data[0].lon);
    const coords = { lat: data[0].lat, lon: data[0].lon };
    return coords;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getWeatherData = async (coordsData) => {
  const coords = await coordsData;
  console.log("Coords Data", coords);
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=aaef257495c3f595680e4bb46f989362`,
      { mode: "cors" },
    );
    const data = await response.json();
    const weatherData = parseWeatherData(data);
    console.log(weatherData.currentData);
  } catch (err) {
    console.log(err);
  }
};

getWeatherData(getCoords());
