import axios, {AxiosError, AxiosResponse} from "axios";
import {ApiError, BookRoom, BookRoomResponse, HttpMethod, Room, RoomRequest} from "../components/types";

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

export async function bookARoom<T = never>(ApiUrl: string, method: HttpMethod, data: BookRoom) : Promise<BookRoomResponse<T>> {
    let response: AxiosResponse<T>;
    try {
        switch (method) {
            case "GET":
                response = await api.get<T>(ApiUrl)
                break;
            case "POST":
                response = await api.post<T>(ApiUrl, data)
                break;
            case "DELETE":
                response = await api.delete<T>(ApiUrl)
                break;
            case "PUT":
                response = await api.put<T>(ApiUrl)
                break;
            default:
                throw new Error(`Unsupported HTTP method: ${method}`);
        }

        return {
            data: response.data,
            message: response.statusText,
            statusText: response.statusText
        }
    }
    catch (error) {
        const apiError: ApiError = {
            message: "An unknown error occur."
        }
        if (error instanceof AxiosError) {
            apiError.message = error.response?.data?.message || error.message;
            apiError.status = error.response?.status;
        } else if (error instanceof Error) {
            apiError.message = error.message;
        }

        console.error(error);
        return { message: `Error: ${apiError.message}`, statusText: `${apiError.status}` };
    }
}
