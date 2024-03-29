import React from "react";
import Departures from "./Departures";

const Panel = ({ departures }) => {
  return (
    <div className="bg-white shadow-lg flex-1 rounded-md">
      <Departures departures={departures} />
    </div>
  );
};

export default Panel;
