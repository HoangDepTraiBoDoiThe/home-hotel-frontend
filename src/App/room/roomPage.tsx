import React, { useMemo, useState, useCallback } from "react";
import {Room} from "../../components/types";
import RoomFilter from "../../components/room/roomFilter.tsx";
import RoomPaginator from "../../components/room/roomPaginator.tsx";
import RoomCardContainer from "../../components/room/roomCardContainer.tsx";
import {useRoomsData} from "../../components/room/commons/roomCustomHooks.tsx";

const RoomPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [numberRoomPerPage, setNumberRoomPerPage] = useState<number>(6);
    const [rooms] = useRoomsData();

    const totalPages = useMemo(() => Math.ceil(rooms.length / numberRoomPerPage), [rooms.length, numberRoomPerPage]);

    const paginatedRooms = useMemo(() => {
        const lastIndex = currentPage * numberRoomPerPage;
        const firstIndex = lastIndex - numberRoomPerPage;
        return rooms.slice(firstIndex, lastIndex);
    }, [rooms, currentPage, numberRoomPerPage]);

    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
    }, []);

    const handleFilterChange = useCallback((filteredRooms: Room[]) => {
        //setRooms(filteredRooms);
        setCurrentPage(1); // Reset to first page when filter changes
    }, []);

    return (
        <section className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Available Rooms</h1>
            <RoomFilter roomData={rooms} setRoomData={handleFilterChange}/>
            <RoomPaginator
                totalPages={totalPages}
                onPaging={handlePageChange}
                currentPage={currentPage}
            />
            <RoomCardContainer roomData={paginatedRooms}/>
        </section>
    );
};

export default RoomPage;