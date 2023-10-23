import React from 'react'
import Departure from './Departure'

const Departures = ({ departures }) => {
  return (
    <div className="flex flex-col p-2">
      {departures.map((departure) =>
        <Departure departure={departure} key={Math.random()} />
      )}
    </div>
  )
}

export default Departures