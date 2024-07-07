import React, {useEffect, useState} from 'react'
import {getAllRooms} from "../../utils/ApiHelperFunctions.ts";
import {Room} from "../types";
import {RoomDataTable} from "./roomDataTable.tsx";
import {RoomDataColumn} from "./roomDataColumn.tsx";

const ExitingRoom = () => {
  const [roomData, setRoomData] = useState<Room[]>([])
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
      setIsLoading(false)
    });
  }, []);

  return (
      <div className="container mx-auto py-10">
        <RoomDataTable columns={RoomDataColumn} data={roomData} />
      </div>
  )
}

export default ExitingRoom