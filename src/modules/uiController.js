import weatherAPI from "./weatherAPI";

const uiController = (() => {
  const displayData = () => {
    const searchBtn = document.querySelector("#searchBtn");
    searchBtn.addEventListener("click", async () => {
      const searchInput = document.querySelector("#searchInput").value;
      const obtainedData = await weatherAPI.getWeatherData(searchInput);

      if (obtainedData) {
        console.log("Obtained data ", obtainedData.currentData);
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
