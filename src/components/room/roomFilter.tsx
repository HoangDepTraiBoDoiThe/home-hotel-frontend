import React, {useCallback, useMemo, useState} from 'react'
import {Room} from "../types";
import {Button} from "../ui/button"

type Props = {
    roomData: Room[],
    setRoomData: (x: Room[]) => void
}

const RoomFilter: React.FC<Props> = ({roomData, setRoomData}) => {
    const [filter, setFilter] = useState("")
    const [originData, setOriginData] = useState<Room[]>([])

    const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(e.target.value)
        setOriginData(roomData)
        if (e.target.value === "all") {
            setRoomData(originData)
        } else {
            setRoomData(roomData.filter(room => room.roomType === e.target.value))
        }
    }, [roomData, setRoomData]);

    const clearFilter = useCallback(() => {
        setFilter("")
        setRoomData(originData)
    }, [roomData, setRoomData]);

    const uniqueRoomTypes = useMemo(() => {
        return Array.from(new Set(roomData.map(room => room.roomType)))
    }, [roomData])

    return (
        <div className="flex items-center justify-center gap-2">
            <h2 className="text-lg font-semibold">Room type</h2>
            <select onChange={handleFilterChange} value={filter} className="border p-2 rounded">
                <option value="all">All</option>
                {uniqueRoomTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>)
                )}
            </select>
            <Button onClick={clearFilter}>Clear</Button>
        </div>
    );
}

export default React.memo(RoomFilter)