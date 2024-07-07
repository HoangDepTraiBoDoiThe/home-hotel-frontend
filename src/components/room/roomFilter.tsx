import React, {useCallback, useMemo, useState} from 'react'
import {Room} from "../types";
import {Button} from "../ui/button"

type Props = {
    filteredRooms: Room[],
    setFilteredRooms: (filteredRooms: Room[]) => void
}

const RoomType: React.FC<Props> = ({filteredRooms, setFilteredRooms}) => {
    const [filter, setFilter] = useState("")

    const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(e.target.value)
        if (e.target.value === "all") {
            setFilteredRooms(filteredRooms)
        } else {
            setFilteredRooms(filteredRooms.filter(room => room.roomType === e.target.value))
        }
    }, [filteredRooms, setFilteredRooms]);

    const clearFilter = useCallback(() => {
        setFilter("")
        setFilteredRooms(filteredRooms)
    }, [filteredRooms, setFilteredRooms]);

    const uniqueRoomTypes = useMemo(() => {
        return Array.from(new Set(filteredRooms.map(room => room.roomType)))
    }, [filteredRooms])

    return (
        <div className="flex items-center justify-between">
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

export default React.memo(RoomType)