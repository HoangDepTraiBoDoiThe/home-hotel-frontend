import {useEffect, useState} from "react";
import {BookRoom, Room, RoomURLs} from "../../types";
import {bookARoom, fetchRoomByUrl} from "../../../utils/ApiHelperFunctions.ts";

export const useRoomData = (roomUrls: RoomURLs) => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [roomError, setRoomError] = useState<string | unknown>(null);
    const [roomData, setRoomData] = useState<Room | undefined>(undefined);

    useEffect(() => {
        const fetchRoomData = async () => {
            setIsLoading(true)
            try {
                const result = await fetchRoomByUrl<Room>(roomUrls.self.href);
                setRoomData(result.data);
            } catch (error) {
                setRoomError('Failed to fetch room data. Please try again.')
                console.error('Error fetching room data:', error)
            } finally {
                setIsLoading(false)
            }
        };
        fetchRoomData()
    }, [roomUrls]);

    return [roomData, isLoading, roomError]
};

export const useBookRoom = async (roomData: BookRoom, bookLink:RoomURLs) => {
    const [bookingError, setBookingError] = useState<string | unknown>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    try {
        setIsLoading(true)
        await bookARoom(bookLink.bookRoom.href, bookLink.bookRoom.method || "POST", roomData);
    } catch (err) {
        setBookingError(err)
        console.error(err)
    }
    finally {
        setIsLoading(false)
    }

    return [bookingError, isLoading]
};