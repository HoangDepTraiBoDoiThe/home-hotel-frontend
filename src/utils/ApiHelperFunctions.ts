import axios from "axios";
import {Room} from "../components/types";

export const api = axios.create({
    baseURL: "http://localhost:8080/api",
    timeout: 100000,
    headers: {"X-Custom-Header": "foobar"},
});

export const getAllRooms = async (): Promise<Room[]> => {
    try {
        const response = await api.get("/rooms");
        return response.data._embedded.roomResponseList;
    } catch (error) {
        console.error(error);
        return [];
    }
};

interface RoomRequest {
    roomType: string;
    roomPrice: number;
    roomNumber: number;
    roomPic: File | null;
}

export const createNewRoom = async (roomRequest: RoomRequest): Promise<Room> => {
    try {
        const formData = new FormData();
        formData.append("roomType", roomRequest.roomNumber.toString());
        formData.append("roomPrice", roomRequest.roomPrice.toString());
        formData.append("roomNumber", roomRequest.roomPrice.toString());
        if (roomRequest.roomPic) {
            formData.append("roomPic", roomRequest.roomPic);
        }
        const response = await api.post('/rooms', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return {} as Room;
    }
}
