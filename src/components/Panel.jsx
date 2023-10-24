import React from 'react'
import Departures from './Departures'

const Panel = ({ departures, stopName }) => {
  const panelVehicleType = stopName[stopName.indexOf('(') + 1] == '2' ? '(Tramwaj)' : '(Autobus)'
  const stopId = stopName.slice(stopName.indexOf('(') + 1, stopName.indexOf('(') + 5)
  stopName = stopName.slice(0, stopName.indexOf('('))

  return (
    <div className='bg-white shadow-lg flex-1 min-w-[90vw] sm:min-w-[40vw] sm:max-w-[50vw] lg:min-w-[24vw] rounded-md'>
      <div className='flex text-center bg-red-100 text-red-500 rounded-lg text-lg mx-2 mt-2 p-1 justify-between'>
        <div>{panelVehicleType}</div>
        <div className='font-bold'>{stopName}</div>
        <div>({stopId})</div>
        </div>
      <Departures departures={departures} />
    </div>
  )
}

export default Panel