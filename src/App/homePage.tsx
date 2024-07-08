import {useEffect, useState} from "react";
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
        <div>
            {rooms.map((room, index) => (
                <RoomCard key={index} roomData={room} />
            ))}
        </div>
    )
}

export default HomePage