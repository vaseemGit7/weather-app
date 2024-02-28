import weatherAPI from "./weatherAPI";
import utils from "./utils";

const uiController = (() => {
  const displayCurrent = (currentData, locationName) => {
    const currentLocation = document.querySelector("#currentPlace");
    currentLocation.textContent = locationName;

    const currentTime = document.querySelector("#currentTime");
    currentTime.textContent = utils.getTime(currentData.currentTime);

    const currentTemp = document.querySelector("#currentTemp");
    currentTemp.textContent = currentData.currentTemp;

    const currentFeelsLike = document.querySelector("#currentFeelsLike");
    currentFeelsLike.textContent = currentData.currentFeelsLike;

    const currentWeather = document.querySelector("#currentWeatherText");
    currentWeather.textContent = currentData.currentWeather;
  };

  const displayHour = (hourlyData) => {
    const { hourlyArr } = hourlyData;

    const hourlyWeatherDiv = document.querySelector(".hourly-weather");
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 24; i++) {
      const weatherInfoDiv = document.createElement("div");
      weatherInfoDiv.classList.add("weather-info");

      const hourTime = document.createElement("p");
      hourTime.classList.add("hour");
      hourTime.textContent = utils.getTime(hourlyArr[i].dt);

      const weatherIcon = document.createElement("img");
      weatherIcon.classList.add("hour-weather-icon");
      weatherIcon.src = "";
      weatherIcon.alt = "";

      const hourTemp = document.createElement("p");
      hourTemp.classList.add("hour-temperature");
      hourTemp.textContent = hourlyArr[i].temp;

      weatherInfoDiv.appendChild(hourTime);
      weatherInfoDiv.appendChild(weatherIcon);
      weatherInfoDiv.appendChild(hourTemp);

      hourlyWeatherDiv.appendChild(weatherInfoDiv);

      // const hourWeather = document.createElement("div");
      // hourWeather.textContent = `Weather ${hourlyArr[i].weather[0].main}`;
    }
  };

  const displayDaily = (dailyData) => {
    const { dailyArr } = dailyData;

    const dailyWeatherDiv = document.querySelector(".daily-weather");

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 7; i++) {
      const weatherInfoDiv = document.createElement("div");
      weatherInfoDiv.classList.add("weather-info");

      const day = document.createElement("p");
      day.classList.add("day");
      day.textContent = utils.getDay(dailyArr[i].dt);

      const weatherIcon = document.createElement("img");
      weatherIcon.classList.add("day-weather-icon");
      weatherIcon.src = "";
      weatherIcon.alt = "";

      const dayTemp = document.createElement("p");
      dayTemp.classList.add("hour-temperature");
      dayTemp.textContent = dailyArr[i].temp.max;

      weatherInfoDiv.appendChild(day);
      weatherInfoDiv.appendChild(weatherIcon);
      weatherInfoDiv.appendChild(dayTemp);

      dailyWeatherDiv.appendChild(weatherInfoDiv);

      // const dailyWeather = document.createElement("div");
      // dailyWeather.textContent = ` Day Weather ${dailyArr[i].weather[0].main}`;
    }
  };

  const displayExtraInfo = (current, hourly, daily) => {
    const { hourlyArr } = hourly;
    const { dailyArr } = daily;

    const currentRainProbability = document.querySelector(
      "#currentRainProbability",
    );
    const popPercentage = (hourlyArr[0].pop * 100).toFixed(0);
    currentRainProbability.textContent = `${popPercentage}%`;

    const currentData = document.querySelector("#currentDate");
    currentData.textContent = `${utils.getDate(current.currentTime)}`;

    const currentTempMax = document.querySelector("#currentTempMax");
    currentTempMax.textContent = dailyArr[0].temp.max;

    const currentTempMin = document.querySelector("#currentTempMin");
    currentTempMin.textContent = dailyArr[0].temp.min;

    const currentSunrise = document.querySelector("#currentSunrise");
    currentSunrise.textContent = utils.getTime(current.currentSunrise);

    const currentSunset = document.querySelector("#currentSunset");
    currentSunset.textContent = utils.getTime(current.currentSunset);

    const currentHumidity = document.querySelector("#currentHumidity");
    currentHumidity.textContent = `${current.currentHumidity}%`;

    const currentUVIndex = document.querySelector("#currentUVIndex");
    currentUVIndex.textContent = current.currentUVIndex;

    const currentPressure = document.querySelector("#currentPressure");
    currentPressure.textContent = current.currentPressure;

    const currentWindSpeed = document.querySelector("#currentWindSpeed");
    currentWindSpeed.textContent = current.currentWindSpeed;
  };

  const displayData = () => {
    const searchBtn = document.querySelector("#searchBtn");
    searchBtn.addEventListener("click", async () => {
      const searchInput = document.querySelector("#searchInput").value;
      const obtainedData = await weatherAPI.getWeatherData(searchInput);

      if (obtainedData) {
        displayCurrent(
          obtainedData.data.currentData,
          obtainedData.locationName,
        );
        displayHour(obtainedData.data.hourlyData);
        displayDaily(obtainedData.data.dailyData);
        displayExtraInfo(
          obtainedData.data.currentData,
          obtainedData.data.hourlyData,
          obtainedData.data.dailyData,
        );
      } else {
        console.log("Unable to fetch data");
      }
    });
  };

  return {
    displayData,
  };
})();

export default uiController;
