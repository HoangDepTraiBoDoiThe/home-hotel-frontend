import React, {useEffect, useState} from 'react'
import {getAllRooms} from "../../utils/ApiHelperFunctions.ts";
import RoomFilter from "./roomFilter.tsx";

const ExitingRoom = () => {
  const [roomData, setRoomData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchRoomData = async () => {
    try {
      setIsLoading(true);
      const rooms = await getAllRooms();
      setRoomData(rooms);
    } catch (error) {
      console.error(error)
      setIsLoading(true)
    }
  }

  useEffect(() => {
    fetchRoomData().finally(() => {
      setRoomData(null)
      setIsLoading(false)
    });
  }, []);

  return (
      <div>
        <RoomFilter data={roomData} setFilteredRooms={setRoomData}/>
      </div>
  )
}

export default ExitingRoom