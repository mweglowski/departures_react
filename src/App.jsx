import { useEffect, useState } from "react";
import Clock from "./components/Clock";
import Sections from "./components/Sections";
import FetchingNotification from "./components/FetchingNotification";

const App = () => {
  const [currentDepartures, setCurrentDepartures] = useState({});
  const [isFetchingStops, setIsFetchingStops] = useState(true);

  const fetchStopsData = async () => {
    const response = await fetch(
      "https://ckan.multimediagdansk.pl/dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/4c4025f0-01bf-41f7-a39f-d156d201b82b/download/stops.json"
    );
    const data = await response.json();

    const currentTime = new Date();
    const formattedDate = currentTime.toISOString().split("T")[0];

    return data[formattedDate].stops;
  };

  const fetchDepartures = async (stopsData) => {
    let fetchedDepartures = {};

    // IDS OF STOPS
    // 1... - BUS
    // 2... - TRAM
    // ... - KOLEJKI
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
          .map((dep) => {
            const estimatedTimeDate = new Date();
            const [hours, minutes] = dep.estimatedTime.split(":");
            estimatedTimeDate.setHours(Number(hours), Number(minutes), 0);

            const timeDifference = Math.round(
              (estimatedTimeDate - new Date()) / (1000 * 60)
            );

            if (timeDifference >= 3) {
              return {
                routeNumber: dep.routeId,
                routeName: dep.headsign,
                timeLeft: timeDifference,
              };
            } else {
              return null;
            }
          })
          .filter((dep) => dep !== null);
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
    setIsFetchingStops(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const stopsData = await fetchStopsData();
      await fetchDepartures(stopsData);
    };

    fetchData();

    const intervalId = setInterval(fetchData, 20000);
    return () => clearInterval(intervalId);
  }, [currentDepartures]);

  const areas = ["Brama Wyżynna", "Hucisko", "Dworzec Główny", "SKM Gdańsk Główny"];

  return (
    <div className="flex flex-col relative">
      <Clock />

      {isFetchingStops ? (
        <FetchingNotification />
      ) : (
        <Sections {...{ areas, currentDepartures }} />
      )}
    </div>
  );
};

export default App;
