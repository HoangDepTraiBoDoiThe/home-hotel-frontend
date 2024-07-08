import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Room } from "../components/types";
import { getAllRooms } from "../utils/ApiHelperFunctions";
import RoomCardContainer from "../components/room/roomCardContainer";
import RoomFilter from "../components/room/roomFilter";
import RoomPaginator from "../components/room/roomPaginator";

const HomePage: React.FC = () => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [numberRoomPerPage, setNumberRoomPerPage] = useState<number>(6);

    const fetchAllRooms = useCallback(async () => {
        try {
            const fetchedRooms = await getAllRooms();
            setRooms(fetchedRooms);
        } catch (error) {
            console.error("Failed to fetch rooms:", error);
            // Consider adding user-friendly error handling here
        }
    }, []);

    useEffect(() => {
        fetchAllRooms();
    }, [fetchAllRooms]);

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
        setRooms(filteredRooms);
        setCurrentPage(1); // Reset to first page when filter changes
    }, []);

    return (
        <section className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Available Rooms</h1>
            <RoomFilter roomData={rooms} setRoomData={handleFilterChange} />
            <RoomPaginator
                totalPages={totalPages}
                onPaging={handlePageChange}
                currentPage={currentPage}
            />
            <RoomCardContainer roomData={paginatedRooms} />
        </section>
    );
};

export default HomePage;