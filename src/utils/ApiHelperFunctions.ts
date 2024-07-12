import axios, {AxiosError, AxiosResponse} from "axios";
import {ApiError, BookRoom, RoomResponse, HttpMethod, Room, RoomRequest} from "../components/types";
import {takeUri} from "./lib/utils.ts";

export const api = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 100000,
    headers: {"X-Custom-Header": "foobar"},
});

export const getAllRooms = async (): Promise<Room[]> => {
    try {
        const response = await api.get("/api/rooms");
        return response.data._embedded.roomResponseList;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export async function fetchRoomByUrl<T = never>(url : string): Promise<RoomResponse<T>> {
    let response: AxiosResponse<T>
    try {
        const uri = takeUri(url)
        response = await api.get<T>(uri);
        return {
            data: response.data,
            message: response.statusText,
            statusText: response.statusText
        }
    } catch (error) {
        const apiError: ApiError = {
            message: "An unknown error occur."
        }
        if (error instanceof AxiosError) {
            apiError.message = error.response?.data.message || error.message;
            apiError.status = error.response?.data.status;
        }
        else if (error instanceof Error) {
            apiError.message = error.message;
        }
        return {message: `Error: ${apiError.message}`, statusText: `${apiError.status}`};
    }
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

export async function bookARoom<T = never>(ApiUrl: string, method: HttpMethod, data: BookRoom): Promise<RoomResponse<T>> {
    let response: AxiosResponse<T>;
    const uri = takeUri(ApiUrl)
    try {
        switch (method) {
            case "GET":
                response = await api.get<T>(uri)
                break;
            case "POST":
                response = await api.post<T>(uri, data)
                break;
            case "DELETE":
                response = await api.delete<T>(uri)
                break;
            case "PUT":
                response = await api.put<T>(uri)
                break;
            default:
                throw new Error(`Unsupported HTTP method: ${method}`);
        }

        return {
            data: response.data,
            message: response.statusText,
            statusText: response.statusText
        }
    } catch (error) {
        const apiError: ApiError = {
            message: "An unknown error occur."
        }
        if (error instanceof AxiosError) {
            apiError.message = error.response?.data?.message || error.message;
            apiError.status = error.response?.status;
        } else if (error instanceof Error) {
            apiError.message = error.message;
        }
        return {message: `Error: ${apiError.message}`, statusText: `${apiError.status}`};
    }
}
