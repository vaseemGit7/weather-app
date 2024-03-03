import weatherAPI from "./weatherAPI";
import utils from "./utils";

const uiController = (() => {
  const importIcon = (weatherIcon) =>
    import(`../weather-icons/${weatherIcon}.svg`);

  const displayCurrent = (currentData, locationName, timeOffset) => {
    const cityTime = utils.getCityTime(timeOffset);
    const weatherId = currentData.currentWeatherId;
    const weatherIcon = utils.getWeatherIcon(
      weatherId,
      currentData.currentTime,
      currentData.currentSunrise,
      currentData.currentSunset,
    );

    const currentLocation = document.querySelector("#currentPlace");
    currentLocation.textContent = locationName;

    const currentTime = document.querySelector("#currentTime");
    currentTime.textContent = utils.getTime(cityTime);

    const currentTemp = document.querySelector("#currentTemp");
    currentTemp.textContent = Math.round(currentData.currentTemp);

    const currentFeelsLike = document.querySelector("#currentFeelsLike");
    currentFeelsLike.textContent = `${Math.round(currentData.currentFeelsLike)}°C`;

    const currentWeather = document.querySelector("#currentWeatherText");
    currentWeather.textContent = utils.captitalizeText(
      currentData.currentWeather,
    );

    const currentWeatherIcon = document.querySelector("#currentWeatherIcon");

    importIcon(weatherIcon).then((iconSrc) => {
      const icon = iconSrc.default;
      currentWeatherIcon.src = icon;
    });
  };

  const displayHour = (hourlyData, currentData, timeOffset) => {
    const { hourlyArr } = hourlyData;
    const currentLocationTime = utils.getCityTime(timeOffset);
    const hourlyWeatherDiv = document.querySelector(".hourly-weather");
    hourlyWeatherDiv.innerHTML = "";

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 24; i++) {
      const weatherId = hourlyArr[i].weather[0].id;
      const weatherIcon = utils.getWeatherIcon(
        weatherId,
        currentData.currentTime,
        currentData.currentSunrise,
        currentData.currentSunset,
      );

      const weatherInfoDiv = document.createElement("div");
      weatherInfoDiv.classList.add("weather-info");

      const hourTime = document.createElement("p");
      hourTime.classList.add("hour");
      hourTime.textContent = utils.getHour(
        currentLocationTime,
        hourlyArr[i].dt,
      );

      const hourlyWeatherIcon = document.createElement("img");
      hourlyWeatherIcon.classList.add("hour-weather-icon");
      hourlyWeatherIcon.src = "";

      importIcon(weatherIcon).then((iconSrc) => {
        const icon = iconSrc.default;
        hourlyWeatherIcon.src = icon;
      });

      const hourTemp = document.createElement("p");
      hourTemp.classList.add("hour-temperature");
      hourTemp.textContent = `${Math.round(hourlyArr[i].temp)}°C`;

      weatherInfoDiv.appendChild(hourTime);
      weatherInfoDiv.appendChild(hourlyWeatherIcon);
      weatherInfoDiv.appendChild(hourTemp);

      hourlyWeatherDiv.appendChild(weatherInfoDiv);
    }
  };

  const displayDaily = (dailyData) => {
    const { dailyArr } = dailyData;

    const dailyWeatherDiv = document.querySelector(".daily-weather");
    dailyWeatherDiv.innerHTML = "";

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 7; i++) {
      const weatherId = dailyArr[i].weather[0].id;
      const weatherIcon = utils.getWeatherIcon(
        weatherId,
        dailyArr[i].dt,
        dailyArr[i].sunrise,
        dailyArr[i].sunset,
      );

      const weatherInfoDiv = document.createElement("div");
      weatherInfoDiv.classList.add("weather-info");

      const day = document.createElement("p");
      day.classList.add("day");
      day.textContent = utils.getDay(dailyArr[i].dt);

      const dayWeatherIcon = document.createElement("img");
      dayWeatherIcon.classList.add("day-weather-icon");

      importIcon(weatherIcon).then((iconSrc) => {
        const icon = iconSrc.default;
        dayWeatherIcon.src = icon;
      });

      const dayTemp = document.createElement("p");
      dayTemp.classList.add("hour-temperature");
      dayTemp.textContent = `${Math.round(dailyArr[i].temp.max)}°C`;

      weatherInfoDiv.appendChild(day);
      weatherInfoDiv.appendChild(dayWeatherIcon);
      weatherInfoDiv.appendChild(dayTemp);

      dailyWeatherDiv.appendChild(weatherInfoDiv);
    }
  };

  const displayExtraInfo = (current, hourly, daily, timeOffset) => {
    const { hourlyArr } = hourly;
    const { dailyArr } = daily;
    const cityDate = utils.getCityTime(timeOffset);

    const currentRainProbability = document.querySelector(
      "#currentRainProbability",
    );
    const popPercentage = (hourlyArr[0].pop * 100).toFixed(0);
    currentRainProbability.textContent = `${popPercentage}%`;

    const currentData = document.querySelector("#currentDate");
    currentData.textContent = `${utils.getDate(cityDate)}`;

    const currentTempMax = document.querySelector("#currentTempMax");
    currentTempMax.textContent = `${Math.round(dailyArr[0].temp.max)}°C`;

    const currentTempMin = document.querySelector("#currentTempMin");
    currentTempMin.textContent = `${Math.round(dailyArr[0].temp.min)}°C`;

    const currentSunrise = document.querySelector("#currentSunrise");
    currentSunrise.textContent = utils.getTime(current.currentSunrise);

    const currentSunset = document.querySelector("#currentSunset");
    currentSunset.textContent = utils.getTime(current.currentSunset);

    const currentHumidity = document.querySelector("#currentHumidity");
    currentHumidity.textContent = `${current.currentHumidity}%`;

    const currentUVIndex = document.querySelector("#currentUVIndex");
    currentUVIndex.textContent = current.currentUVIndex;

    const currentPressure = document.querySelector("#currentPressure");
    currentPressure.textContent = `${current.currentPressure}hPa`;

    const currentWindSpeed = document.querySelector("#currentWindSpeed");
    currentWindSpeed.textContent = `${current.currentWindSpeed}m/s`;
  };

  const displayData = () => {
    const searchBtn = document.querySelector("#searchBtn");
    const errorMessage = document.querySelector(".error-message");
    const searchInput = document.querySelector("#searchInput");

    searchInput.addEventListener("input", () => {
      errorMessage.textContent = "";
    });

    searchBtn.addEventListener("click", async () => {
      const obtainedData = await weatherAPI.getWeatherData(searchInput.value);

      if (obtainedData) {
        displayCurrent(
          obtainedData.data.currentData,
          obtainedData.locationName,
          obtainedData.data.timeOffset,
        );
        displayHour(
          obtainedData.data.hourlyData,
          obtainedData.data.currentData,
          obtainedData.data.timeOffset,
        );
        displayDaily(obtainedData.data.dailyData);
        displayExtraInfo(
          obtainedData.data.currentData,
          obtainedData.data.hourlyData,
          obtainedData.data.dailyData,
          obtainedData.data.timeOffset,
        );
      } else {
        errorMessage.textContent = "Unable to find city";
      }
    });
    window.onload = () => {
      searchInput.value = "London";
      searchBtn.click();
    };
  };

  return {
    displayData,
  };
})();

export default uiController;
