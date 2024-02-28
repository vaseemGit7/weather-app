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
  return {
    getTime,
    getDay,
    getDate,
  };
})();

export default utils;
