import {useCallback, useEffect, useReducer, useState} from "react";
import {BookRoom, Room, RoomResponse, RoomURLs} from "../../types";
import {bookARoom, fetchRoomByUrl} from "../../../utils/ApiHelperFunctions.ts";
import {toast} from "../../ui/use-toast.ts";

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

type BookingState = {
    isLoading: boolean;
    error: Error | null;
    response: RoomResponse | null;
};

type BookingAction = | { type: 'BOOKING_START' } | { type: 'BOOKING_SUCCESS'; payload: RoomResponse } | { type: 'BOOKING_ERROR'; payload: Error };

const bookingReducer = (state: BookingState, action: BookingAction): BookingState => {
    switch (action.type) {
        case 'BOOKING_START':
            return { ...state, isLoading: true, error: null };
        case 'BOOKING_SUCCESS':
            return { ...state, isLoading: false, response: action.payload };
        case 'BOOKING_ERROR':
            return { ...state, isLoading: false, error: action.payload };
        default:
            return state;
    }
};

export const useBookRoom = (bookLink: RoomURLs, roomData?: BookRoom) => {
    const [state, dispatch] = useReducer(bookingReducer, {
        isLoading: false,
        error: null,
        response: null,
    });

    const bookRoom = useCallback(async () => {
        if (!roomData) return;

        dispatch({ type: 'BOOKING_START' });

        try {
            const result = await bookARoom(bookLink.bookRoom.href, bookLink.bookRoom.method || 'POST', roomData);
            dispatch({ type: 'BOOKING_SUCCESS', payload: result });
            toast({
                title: result.status === 200 ? 'Room booked successfully' : 'Failed to book room',
                variant: result.status === 200 ? 'default' : 'destructive',
            });
        } catch (err) {
            dispatch({ type: 'BOOKING_ERROR', payload: err instanceof Error ? err : new Error('An unknown error occurred') });
            console.error(err);
        }
    }, [bookLink, roomData]);

    return {
        bookRoom,
        ...state,
    };
};
