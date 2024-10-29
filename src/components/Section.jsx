import Panel from "./Panel";
import { getAreaVehicleDepartures } from "../utils/getAreaVehicleDepartures";
import { getSKMDepartures } from "../utils/getSKMDepartures";

const Section = ({ currentDepartures, area }) => {
  let leftDepartures = area.startsWith("SKM")
    ? getSKMDepartures("Śródmieście")
    : getAreaVehicleDepartures(currentDepartures, area, "Autobus");

  let rightDepartures = area.startsWith("SKM")
    ? getSKMDepartures("Wejherowo")
    : getAreaVehicleDepartures(currentDepartures, area, "Tramwaj");

  if (area == "Hucisko") {
    leftDepartures = leftDepartures.slice(0, 13);
    rightDepartures = rightDepartures.slice(0, 13);
  }

  const sectionStyles =
    area === "Brama Wyżynna"
      ? "section-brama"
      : area === "Hucisko"
      ? "section-hucisko"
      : area === "Dworzec Główny"
      ? "section-glowny"
      : "section-skm";

  const areaStyles = area.startsWith("SKM")
    ? "flex text-center bg-blue-700 text-gray-100 rounded-lg text-lg mx-2 mt-2 p-1 justify-center font-bold"
    : "panel-red-box";

  const secondStyles = area.startsWith("SKM")
    ? "flex text-center bg-yellow-400 text-gray-600 rounded-lg text-lg mx-2 mt-2 p-1 justify-center font-bold"
    : "panel-red-box";

  return (
    <div className={sectionStyles}>
      <div className={areaStyles}>
        <p className="mx-auto text-2xl">{area}</p>
      </div>

      <div className="flex w-full">
        <div className="w-full">
          <div className={secondStyles}>
            {area.startsWith("SKM") ? "➡ Śródmieście" : "BUS"}
          </div>

          <Panel departures={leftDepartures} />
        </div>

        <div className="w-full">
          <div className={secondStyles}>
            {area.startsWith("SKM") ? "➡ Wejherowo" : "TRAM"}
          </div>

          <Panel departures={rightDepartures} />
        </div>
      </div>
    </div>
  );
};
export default Section;
