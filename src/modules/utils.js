import { fromUnixTime } from "date-fns";

const utils = (() => {
  const convertUnix = (unix) => {
    const date = fromUnixTime(unix);
    return date;
  };

  const getTime = (unixData) => {
    const date = convertUnix(unixData);

    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${hours}:${minutes}`;
  };

  const getDay = (unixData) => {
    const date = convertUnix(unixData);

    const day = date.getDay();

    const weekDays = {
      0: "Sunday",
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday",
    };

    return weekDays[day];
  };

  const getMonth = (unixData) => {
    const date = convertUnix(unixData);

    const month = date.getMonth();

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return months[month];
  };

  const getDate = (unixData) => {
    const converted = convertUnix(unixData);

    const day = getDay(unixData);
    const date = converted.getDate();
    const month = getMonth(unixData);
    const year = converted.getFullYear();

    const result = `${day} ${date}, ${month} ${year}`;

    return result;
  };

  const chooseDayNight = (currentTime, sunrise, sunset) => {
    let time;
    if (currentTime >= sunrise && currentTime < sunset) {
      time = "d";
    } else {
      time = "n";
    }
    return time;
  };

  const getWeatherIcon = (weatherCode, currentTime, sunrise, sunset) => {
    const codeMap = {
      800: 0,
      801: 1,
      802: 2,
      803: 3,
      804: 4,
      300: 5,
      301: 6,
      302: 7,
      310: 8,
      311: 8,
      312: 9,
      313: 9,
      314: 10,
      321: 10,
      200: 18,
      201: 20,
      202: 22,
      210: 11,
      211: 17,
      212: 19,
      221: 21,
      230: 12,
      231: 14,
      232: 16,
      500: 23,
      501: 24,
      502: 25,
      503: 25,
      504: 26,
      511: 26,
      520: 27,
      521: 27,
      522: 28,
      531: 28,
      600: 29,
      601: 30,
      602: 30,
      611: 31,
      612: 31,
      613: 32,
      615: 32,
      616: 33,
      620: 33,
      621: 34,
      622: 34,
      701: 38,
      711: 39,
      721: 36,
      731: 37,
      741: 35,
      751: 37,
      761: 37,
      762: 37,
      771: 38,
      781: 38,
    };

    const weatherIcon = `${codeMap[weatherCode]}${chooseDayNight(currentTime, sunrise, sunset)}`;

    return weatherIcon;
  };
  return {
    getTime,
    getDay,
    getDate,
    getWeatherIcon,
  };
})();

export default utils;
