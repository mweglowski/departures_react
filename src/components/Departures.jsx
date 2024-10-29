import React from "react";
import Departure from "./Departure";

const Departures = ({ departures }) => {
  return (
    <div className="flex flex-col p-2 h-fit">
      {departures.length !== 0 ? (
        <>
          {departures.map((departure, index) => {
            if (index < 20) {
              return <Departure departure={departure} key={Math.random()} />;
            }
          })}
        </>
      ) : (
        <div className="text-slate-500 m-auto flex">
          <p>There are not any near departures.</p>
        </div>
      )}
    </div>
  );
};

export default Departures;
