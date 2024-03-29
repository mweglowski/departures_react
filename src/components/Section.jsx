import Panel from "./Panel";
import { getAreaVehicleDepartures } from "../utils/getAreaVehicleDepartures";

const Section = ({ currentDepartures, area }) => {
  const busDepartures = getAreaVehicleDepartures(
    currentDepartures,
    area,
    "Autobus"
  );

  const tramDepartures = getAreaVehicleDepartures(
    currentDepartures,
    area,
    "Tramwaj"
  );

  return (
    <div className="">
      <div className="panel-red-box font-bold">
        <p className="mx-auto text-2xl">{area}</p>
      </div>
      <div className="flex">
        <div>
          <div className="panel-red-box">BUS</div>
          <Panel departures={busDepartures} />
        </div>
        <div>
          <div className="panel-red-box">TRAM</div>
          <Panel departures={tramDepartures} />
        </div>
      </div>
    </div>
  );
};

export default Section;
