import React, {useEffect, useState} from "react";
import RoomCard from "../components/room/roomCard.tsx";
import {Room} from "../components/types";
import {getAllRooms} from "../utils/ApiHelperFunctions.ts";

const HomePage = () => {
    const [rooms, setRooms] = useState<Room[]>([])

    async function fetchAllRooms() {
        try {
            const rooms = await getAllRooms();
            setRooms(rooms);
        } catch (error) {
            console.error(error)
        }
    }


    useEffect(() => {
        fetchAllRooms()
    }, []);
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-8">Available Rooms</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rooms.map(room => (
                    <RoomCard key={room.id} roomData={room}/>
                ))}
            </div>
        </div>
    )
}

export default HomePage