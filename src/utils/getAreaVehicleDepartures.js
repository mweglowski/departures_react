import { getAreaName } from "./getAreaName";
import { getPanelVehicleType } from "./getPanelVehicleType";

export const getAreaVehicleDepartures = (allDepartures, area, vehicleType) => {
  let departures = [];

  Object.keys(allDepartures).forEach((stopName) => {
    if (
      getAreaName(stopName) === area &&
      getPanelVehicleType(stopName) === vehicleType
    ) {
      for (let currentDeparture of allDepartures[stopName]) {
        departures.push(currentDeparture);
      }
    }
  });

  departures.sort((a, b) => a.timeLeft - b.timeLeft);

  departures = departures.map((dep) => {
    return { ...dep, timeLeft: dep.timeLeft <= 0 ? ">>>" : `${dep.timeLeft}min` };
  });

  return departures;
};
