import { fromUnixTime } from "date-fns";

const utils = (() => {
  const convertUnix = (unix) => {
    const date = fromUnixTime(unix);
    return date;
  };

  const getTime = (unixDate) => {
    const date = convertUnix(unixDate);

    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${hours}:${minutes}`;
  };
  return {
    getTime,
  };
})();

export default utils;
