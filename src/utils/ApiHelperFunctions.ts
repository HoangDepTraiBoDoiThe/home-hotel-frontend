import axios from "axios";
import { Room } from "../types";

export const api = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
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
