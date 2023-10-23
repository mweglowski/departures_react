import React from 'react'
import Departures from './Departures'

const Panel = ({ departures, id }) => {
  return (
    <div className='bg-white shadow-lg flex-1 min-w-[20vw] max-w-[50vw] rounded-md'>
      <div className='text-center bg-red-100 text-red-500 rounded-lg text-lg mx-2 mt-2 p-1'>{id}</div>
      <Departures departures={departures} />
    </div>
  )
}

export default Panel