import React, { useEffect, useState } from 'react'
import Panel from './Panel';

const Panels = () => {
  const [currentDepartures, setCurrentDepartures] = useState([])

  const fetchStopDepartures = async (id) => {
    const response = await fetch('https://ckan2.multimediagdansk.pl/delays?stopId=' + id);
    const data = await response.json();

    return data
  }

  const fetchDepartures = async () => {
    let fetchedDepartures = {}

    try {
      const ids = ['1013', '1014', '1015', '1016', '1017', '1019', '1020', '1021', '1022', '1025', '1026', '1028', '1030', '1033', '2001', '2002', '2101', '2102', '2137', '2138']

      await Promise.all(ids.map(async (id) => {
        fetchedDepartures[id] = []

        // const data = await fetchStopDepartures();
        // console.log(data)
        const response = await fetch('https://ckan2.multimediagdansk.pl/delays?stopId=' + id);
        const data = await response.json();

        const currentTime = new Date()

        // ITERATE THROUGH DEPARTURES
        for (let dep of data.delay) {
          if (fetchedDepartures[id].length >= 5) {
            break
          }

          const estimatedTimeDate = new Date()
          const [hours, minutes] = dep.estimatedTime.split(':')
          estimatedTimeDate.setHours(Number(hours))
          estimatedTimeDate.setMinutes(Number(minutes))

          let timeDifference = Math.round((estimatedTimeDate - currentTime) / (1000 * 60))
          if (timeDifference === 0) {
            timeDifference = ">>>"
          } else if (timeDifference < 0) {
            timeDifference = "spóźnia się " + String(timeDifference * -1) + "min"
          } else {
            timeDifference += "min"
          }

          const departure = {
            routeNumber: dep.routeId,
            routeName: dep.headsign,
            timeLeft: timeDifference,
          };
          fetchedDepartures[id].push(departure)
        }
      }))

      setCurrentDepartures(fetchedDepartures)
    } catch (error) {
      console.error('Error: ', error)
    }
  }


  useEffect(() => {
    const fetchData = async () => {
      await fetchDepartures();
    }

    fetchData()

    const intervalId = setInterval(() => {
      fetchData()
    }, 15000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className='flex justify-evenly flex-wrap gap-2 p-2'>
      {Object.keys(currentDepartures).map((id) => {
        const departures = currentDepartures[id]

        return <Panel id={id} departures={departures} key={id} />
      })}
    </div>
  )
}

export default Panels