import React, { useEffect, useState, useCallback, useRef } from 'react'
import Panel from './Panel';

const Panels = () => {
  const [currentDepartures, setCurrentDepartures] = useState([])

  const fetchDepartures = async () => {
    let fetchedDepartures = []

    try {
      const response = await fetch('https://ckan2.multimediagdansk.pl/delays?stopId=2001');
      const data = await response.json();

      const currentTime = new Date()

      // ITERATE THROUGH DEPARTURES
      for (let dep of data.delay) {
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
        fetchedDepartures.push(departure)
      }

      setCurrentDepartures(fetchedDepartures)
    } catch (error) {
      console.error('Error: ', error)
    }
  }


  useEffect(() => {
    const fetchData = async () => {
      console.log('fetching')
      await fetchDepartures();
    }

    fetchData()

    const intervalId = setInterval(() => {
      fetchData()
    }, 15000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className='flex justify-center pt-10 flex-wrap'>
      <Panel departures={currentDepartures} />
    </div>
  )
}

export default Panels