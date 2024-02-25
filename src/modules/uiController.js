import weatherAPI from "./weatherAPI";
import utils from "./utils";

const uiController = (() => {
  const displayCurrent = (currentData) => {
    const currentTime = document.querySelector(".currentTime");
    currentTime.textContent = `Current Time : ${utils.getTime(currentData.currentTime)} `;

    const currentSunRise = document.querySelector(".currentSunRise");
    currentSunRise.textContent = `Sun Rise : ${utils.getTime(currentData.currentSunRise)}`;

    const currentTemp = document.querySelector(".currentTemp");
    currentTemp.textContent = `Temp : ${currentData.currentTemp}`;

    const currentFeelsLike = document.querySelector(".currentFeelsLike");
    currentFeelsLike.textContent = `Feels like : ${currentData.currentFeelsLike}`;

    const currentHumidity = document.querySelector(".currentHumidity");
    currentHumidity.textContent = `Humidity : ${currentData.currentHumidity}`;

    const currentUVIndex = document.querySelector(".currentUVIndex");
    currentUVIndex.textContent = ` UVIndex : ${currentData.currentUVIndex}`;

    const currentWindSpeed = document.querySelector(".currentWindSpeed");
    currentWindSpeed.textContent = `Wind Speed : ${currentData.currentWindSpeed}`;

    const currentWindDeg = document.querySelector(".currentWindDeg");
    currentWindDeg.textContent = `Wind Drag : ${currentData.currentWindDeg}`;

    const currentWeather = document.querySelector(".currentWeather");
    currentWeather.textContent = `Weather : ${currentData.currentWeather}`;
  };

  const displayHour = (hourlyData) => {
    const { hourlyArr } = hourlyData;

    const hourlyWeather = document.querySelector(".hourly-weather");
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 24; i++) {
      const hourDiv = document.createElement("div");
      hourDiv.style.display = "flex";

      const hourTime = document.createElement("div");
      hourTime.textContent = `Hour : ${utils.getTime(hourlyArr[i].dt)}`;

      const hourTemp = document.createElement("div");
      hourTemp.textContent = `Temp : ${hourlyArr[i].temp}`;

      const hourWeather = document.createElement("div");
      hourWeather.textContent = `Weather ${hourlyArr[i].weather[0].main}`;

      hourDiv.appendChild(hourTime);
      hourDiv.appendChild(hourWeather);
      hourDiv.appendChild(hourTemp);
      hourlyWeather.appendChild(hourDiv);
    }
  };

  const displayData = () => {
    const searchBtn = document.querySelector("#searchBtn");
    searchBtn.addEventListener("click", async () => {
      const searchInput = document.querySelector("#searchInput").value;
      const obtainedData = await weatherAPI.getWeatherData(searchInput);

      if (obtainedData) {
        displayCurrent(obtainedData.currentData);
        displayHour(obtainedData.hourlyData);
        console.log("Daily data", obtainedData.dailyData);
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
