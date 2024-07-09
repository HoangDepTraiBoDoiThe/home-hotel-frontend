import React from 'react'
import RoomCard from "./roomCard.tsx";
import {Room} from "../types";

type Props = {
    roomData: Room[]
}

const RoomCardContainer:React.FC<Props> = ({roomData}) => {
  return (
      <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roomData.map(room => (
                  <RoomCard key={room.id} roomData={room}/>
              ))}
          </div>
      </div>
  )
}

export default React.memo(RoomCardContainer)