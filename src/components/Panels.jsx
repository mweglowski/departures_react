import React, { useEffect, useState } from 'react'
import Panel from './Panel';

const Panels = () => {
  const [currentDepartures, setCurrentDepartures] = useState([])

  const fetchDepartures = async () => {
    let fetchedDepartures = []

    try {
      const response = await fetch('http://ckan2.multimediagdansk.pl/delays?stopId=2001');
      const data = await response.json();

      // ITERATE THROUGH DEPARTURES
      for (let dep of data.delay) {
        const departure = {
          routeNumber: dep.routeId,
          routeName: dep.headsign,
          estimatedTime: dep.estimatedTime,
        };
        fetchedDepartures.push(departure)
      }

      setCurrentDepartures(fetchedDepartures)
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  useEffect(() => {
    fetchDepartures()
  }, [])

  return (
    <div className='flex justify-center pt-10'>
      <Panel departures={currentDepartures} />
    </div>
  )
}

export default Panels