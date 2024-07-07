import React, {useState} from 'react'
import {Room} from "../types";
import {Button} from "../ui/button"

type Props = {
    data: Room[],
    setFilteredData: (data: Room[]) => void
}

const RoomType = (props: Props) => {
    const [filter, setFilter] = useState("")

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(e.target.value)
        const filteredRooms = props.data.filter(room => room.roomType === e.target.value)
        props.setFilteredData(filteredRooms)
    }

    const clearFilter = () => {
        setFilter("")
        props.setFilteredData(props.data)
    }

    const roomTypes = props.data.map((room) => room.roomType)

    return (
        <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Room type</h2>
            <select onChange={handleFilterChange} value={filter} className="border p-2 rounded">
                <option value="all">All</option>
                {roomTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>)
                )}
            </select>
            <Button onClick={clearFilter}>Clear</Button>
        </div>
    );
}

export default RoomType