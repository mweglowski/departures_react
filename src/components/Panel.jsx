import React from 'react'
import Departures from './Departures'

const Panel = ({ departures, stopName }) => {
  return (
    <div className='bg-white shadow-lg flex-1 min-w-[90vw] sm:min-w-[40vw] sm:max-w-[50vw] lg:min-w-[24vw] rounded-md'>
      <div className='text-center bg-red-100 text-red-500 rounded-lg text-lg mx-2 mt-2 p-1'>{stopName}</div>
      <Departures departures={departures} />
    </div>
  )
}

export default Panel