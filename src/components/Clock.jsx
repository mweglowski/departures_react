import React, { useEffect, useState } from "react";
import { formatWithLeadingZero } from "../utils/formatWithLeadingZero";

const Clock = () => {
  const [currentTime, setCurrentTime] = useState("Loading...");

  useEffect(() => {
    setInterval(() => {
      const newTime = new Date();

      const hours = formatWithLeadingZero(newTime.getHours());
      const minutes = formatWithLeadingZero(newTime.getMinutes());
      const seconds = formatWithLeadingZero(newTime.getSeconds());

      const formattedTime = `${hours}:${minutes}:${seconds}`;

      setCurrentTime(formattedTime);
    }, 1000);
  }, []);

  return (
    <div className="flex mx-auto text-slate-700 bg-white rounded-md p-3 px-5 text-4xl font-bold text-center w-[5.45em]">
      <p className="text-center flex m">{currentTime}</p>
    </div>
  );
};

export default Clock;
