import React from 'react'

const Departure = ({ departure }) => {
  return (
    <div className='flex justify-between items-center border-b-2'>
      <div className='flex'>
        <div className='mr-3 text-center w-[2.5em] font-bold rounded-md p-2 m-1 shadow-md bg-red-50 text-red-500'>{departure.routeNumber}</div>
        <div className='flex items-center text-slate-500'>{departure.routeName}</div>
      </div>
      <div className='font-bold text-lg mr-2 text-slate-500'>{departure.timeLeft}</div>
    </div>
  )
}

export default Departure