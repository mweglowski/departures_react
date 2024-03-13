// import React, { useEffect, useState } from 'react'
// import Panel from './Panel';

// const Panels = () => {
//   const [currentDepartures, setCurrentDepartures] = useState([])

//   const fetchDepartures = async () => {
//     let fetchedDepartures = {}

//     try {
//       const ids = ['1013', '1014', '1015', '1016', '1017', '1019', '1020', '1021', '1022', '1025', '1026', '1028', '1030', '1033', '2001', '2002', '2101', '2102', '2137', '2138']

//       await Promise.all(ids.map(async (id) => {
//         const departures_response = await fetch('https://ckan2.multimediagdansk.pl/delays?stopId=' + id);
//         const departures_data = await departures_response.json()

//         const stops_response = await fetch('https://ckan.multimediagdansk.pl/dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/4c4025f0-01bf-41f7-a39f-d156d201b82b/download/stops.json')
//         const stops_data = await stops_response.json()

//         const currentTime = new Date()
//         const formattedDate = currentTime.toISOString().split('T')[0]

//         let stopName = ""
//         // FINDING STOP NAME
//         for (let stop of stops_data[formattedDate].stops) {
//           if (stop.stopId === Number(id)) {
//             stopName = `${stop.stopName} (${id})`
//             break
//           }
//         }

//         fetchedDepartures[stopName] = []

//         // ITERATE THROUGH DEPARTURES
//         for (let dep of departures_data.delay) {
//           if (fetchedDepartures[stopName].length >= 5) {
//             break
//           }

//           const estimatedTimeDate = new Date()
//           const [hours, minutes] = dep.estimatedTime.split(':')
//           estimatedTimeDate.setHours(Number(hours))
//           estimatedTimeDate.setMinutes(Number(minutes))

//           let timeDifference = 0

//           // HANDLING PROBLEM WHEN CURRENT HOUR IS BIGGER THAN IN ESTIMATED TIME EX. currentTime = 23:54, estimatedTime = 01:32
//           if (currentTime.getHours() > Number(hours)) {
//             timeDifference += 60 * (24 - currentTime.getHours())
//             timeDifference += (60 * Number(hours)) + Number(minutes)
//           } else {
//             estimatedTimeDate.setHours(Number(hours))
//             estimatedTimeDate.setMinutes(Number(minutes))

//             timeDifference = Math.round((estimatedTimeDate - currentTime) / (1000 * 60))
//           }

//           if (timeDifference === 0) {
//             timeDifference = ">>>"
//           } else if (timeDifference < 0) {
//             timeDifference = "opóźnienie 😴"
//             //  + String(timeDifference * -1) + "min"
//           } else {
//             timeDifference += "min"
//           }

//           const departure = {
//             routeNumber: dep.routeId,
//             routeName: dep.headsign,
//             timeLeft: timeDifference,
//           };
//           fetchedDepartures[stopName].push(departure)
//         }
//       }))

//       // SORT FETCHED DEPARTURES
//       let keysArray = Object.keys(fetchedDepartures)
//       keysArray.sort()
//       let sortedFetchedDepartures = {}
//       for (let key of keysArray) {
//         sortedFetchedDepartures[key] = fetchedDepartures[key]
//       }

//       setCurrentDepartures(sortedFetchedDepartures)
//     } catch (error) {
//       console.error('Error: ', error)
//     }
//   }


//   useEffect(() => {
//     const fetchData = async () => {
//       await fetchDepartures();
//     }

//     fetchData()

//     // REFRESH PAGE EVERY 10 SECONDS
//     const intervalId = setInterval(() => {
//       fetchData()
//     }, 10000)

//     return () => clearInterval(intervalId)
//   }, [])

//   return (
//     <div className='flex justify-evenly flex-wrap gap-2 p-2'>
//       {Object.keys(currentDepartures).map((stopName) => {
//         const departures = currentDepartures[stopName]

//         return <Panel stopName={stopName} departures={departures} key={Math.random()} />
//       })}
//     </div>
//   )
// }

// export default Panels

import React, { useEffect, useState } from 'react';
import Panel from './Panel';

const Panels = () => {
  const [currentDepartures, setCurrentDepartures] = useState({});

  // Fetch stops data once and store it for later use
  const fetchStopsData = async () => {
    const response = await fetch('https://ckan.multimediagdansk.pl/dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/4c4025f0-01bf-41f7-a39f-d156d201b82b/download/stops.json');
    const data = await response.json();
    const currentTime = new Date();
    const formattedDate = currentTime.toISOString().split('T')[0];
    return data[formattedDate].stops; // Assuming this path is correct
  };

  const fetchDepartures = async (stopsData) => {
    let fetchedDepartures = {};
    const ids = ['1013', '1014', '1015', '1016', '1017', '1019', '1020', '1021', '1022', '1025', '1026', '1028', '1030', '1033', '2001', '2002', '2101', '2102', '2137', '2138'];

    const stopsMap = stopsData.reduce((acc, stop) => {
      acc[stop.stopId.toString()] = stop.stopName;
      return acc;
    }, {});

    await Promise.all(ids.map(async (id) => {
      const departuresResponse = await fetch(`https://ckan2.multimediagdansk.pl/delays?stopId=${id}`);
      const departuresData = await departuresResponse.json();

      const stopName = stopsMap[id] ? `${stopsMap[id]} (${id})` : `Unknown (${id})`;
      fetchedDepartures[stopName] = departuresData.delay.slice(0, 5).map(dep => {
        const estimatedTimeDate = new Date();
        const [hours, minutes] = dep.estimatedTime.split(':');
        estimatedTimeDate.setHours(Number(hours), Number(minutes), 0);

        const timeDifference = Math.round((estimatedTimeDate - new Date()) / (1000 * 60));
        const timeLeft = timeDifference <= 0 ? "opóźnienie 😴" : `${timeDifference}min`;

        return {
          routeNumber: dep.routeId,
          routeName: dep.headsign,
          timeLeft: timeLeft,
        };
      });
    }));

    setCurrentDepartures(Object.keys(fetchedDepartures).sort().reduce((acc, key) => {
      acc[key] = fetchedDepartures[key];
      return acc;
    }, {}));
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

  return (
    <div className='flex justify-evenly flex-wrap gap-2 p-2'>
      {Object.keys(currentDepartures).map((stopName) => (
        <Panel stopName={stopName} departures={currentDepartures[stopName]} key={stopName} />
      ))}
    </div>
  );
};

export default Panels;
