export const getPanelVehicleType = (stopName) => {
  return stopName[stopName.indexOf("(") + 1] == "2" ? "Tramwaj" : "Autobus";
};
