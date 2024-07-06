import {useEffect, useState} from "react";
import {getAllRooms} from "../utils/ApiHelperFunctions.ts";
import { Room } from "../types"; // Import the Room interface


const HomePage = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [test, setTest] = useState<Room[] | undefined[]>()

    useEffect(() => {
        const fetchData = async () => {
            const rooms = await getAllRooms();
            setTest(rooms || []);
        }
        fetchData();
    }, []);
    return (
        <div>
            {test ? test.at(0)?.roomNumber : "Loading..."}
        </div>
    )
}

export default HomePage