import React from 'react'
import AddRoom from "../../components/room/addRoom.tsx";
import ExitingRoom from "../../components/room/exitingRoom.tsx";


const RoomPage = () => {
  return (
      <div>
        <AddRoom />
        <ExitingRoom />
      </div>
  )
}

export default RoomPage