import React, {useCallback, useMemo, useState} from 'react'
import {Room} from "../types";
import {Button} from "../ui/button"

type Props = {
    data: Room[],
    setFilteredData: (data: Room[]) => void
}

const RoomType: React.FC<Props> = ({data, setFilteredData}) => {
    const [filter, setFilter] = useState("")

    const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(e.target.value)
        if (e.target.value === "all") {
            setFilteredData(data)
        } else {
            const filteredRooms = data.filter(room => room.roomType === e.target.value)
            setFilteredData(filteredRooms)
        }
    }, [data, setFilteredData]);

    const clearFilter = useCallback(() => {
        setFilter("")
        setFilteredData(data)
    }, [data, setFilteredData]);

    const uniqueRoomTypes = useMemo(() => {
        return Array.from(new Set(data.map(room => room.roomType)))
    }, [data])

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