import weatherAPI from "./weatherAPI";

const uiController = (() => {
  const displayCurrent = (currentData) => {
    const currentTime = document.querySelector(".currentTime");
    currentTime.textContent = `Current Time : ${currentData.currentTime}`;

    const currentSunRise = document.querySelector(".currentSunRise");
    currentSunRise.textContent = `Sun Rise : ${currentData.currentSunRise}`;

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

  const displayData = () => {
    const searchBtn = document.querySelector("#searchBtn");
    searchBtn.addEventListener("click", async () => {
      const searchInput = document.querySelector("#searchInput").value;
      const obtainedData = await weatherAPI.getWeatherData(searchInput);

      if (obtainedData) {
        displayCurrent(obtainedData.currentData);
        console.log("Hourly data", obtainedData.hourlyData);
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
