import React from 'react'
import Departures from './Departures'

const Panel = ({ departures }) => {
  return (
    <div className='bg-white shadow-lg w-[70%] max-w-[600px] rounded-md'>
      <div className='text-center bg-red-100 text-red-500 rounded-lg text-lg m-3 p-1'>Dworzec Główny</div>
      <Departures departures={departures} />
    </div>
  )
}

export default Panel