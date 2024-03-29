import React, { useEffect, useState } from "react";
import Section from "./Section";

const Sections = () => {
  const [currentDepartures, setCurrentDepartures] = useState({});
  const [isFetchingStops, setIsFetchingStops] = useState(false);

  const fetchStopsData = async () => {
    const response = await fetch(
      "https://ckan.multimediagdansk.pl/dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/4c4025f0-01bf-41f7-a39f-d156d201b82b/download/stops.json"
    );
    const data = await response.json();
    const currentTime = new Date();
    const formattedDate = currentTime.toISOString().split("T")[0];

    // setIsFetchingStops(false);

    return data[formattedDate].stops;
  };

  const fetchDepartures = async (stopsData) => {
    let fetchedDepartures = {};
    const ids = [
      "1013",
      "1014",
      "1015",
      "1016",
      "1017",
      "1019",
      "1020",
      "1021",
      "1022",
      "1025",
      "1026",
      "1028",
      "1030",
      "1033",
      "2001",
      "2002",
      "2101",
      "2102",
      "2137",
      "2138",
    ];

    const stopsMap = stopsData.reduce((acc, stop) => {
      acc[stop.stopId.toString()] = stop.stopName;
      return acc;
    }, {});

    await Promise.all(
      ids.map(async (id) => {
        const departuresResponse = await fetch(
          `https://ckan2.multimediagdansk.pl/delays?stopId=${id}`
        );
        const departuresData = await departuresResponse.json();

        const stopName = stopsMap[id]
          ? `${stopsMap[id]} (${id})`
          : `Unknown (${id})`;
        fetchedDepartures[stopName] = departuresData.delay
          .slice(0, 5)
          .map((dep) => {
            const estimatedTimeDate = new Date();
            const [hours, minutes] = dep.estimatedTime.split(":");
            estimatedTimeDate.setHours(Number(hours), Number(minutes), 0);

            const timeDifference = Math.round(
              (estimatedTimeDate - new Date()) / (1000 * 60)
            );
            // const timeLeft =
            // timeDifference <= 0 ? "delay... 😴" : `${timeDifference}min`;

            return {
              routeNumber: dep.routeId,
              routeName: dep.headsign,
              timeLeft: timeDifference,
            };
          });
      })
    );

    setCurrentDepartures(
      Object.keys(fetchedDepartures)
        .sort()
        .reduce((acc, key) => {
          acc[key] = fetchedDepartures[key];
          return acc;
        }, {})
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const stopsData = await fetchStopsData();
      await fetchDepartures(stopsData);
    };

    fetchData();

    const intervalId = setInterval(fetchData, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const areas = ["Brama Wyżynna", "Hucisko", "Dworzec Główny"];

  return (
    <div>
      {isFetchingStops ? (
        <div className="text-2xl mt-[200px] flex justify-center animate-pulse">
          HERE SHOULD BE ANIMATION OF FETCHING STOPS
        </div>
      ) : (
        <div className="flex gap-2 p-2">
          {areas.map((area, index) => (
            <Section
              currentDepartures={currentDepartures}
              area={area}
              key={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Sections;
