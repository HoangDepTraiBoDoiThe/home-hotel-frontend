export interface Room {
    id: number;
    roomType: string;
    roomNumber: number;
    roomPrice: number;
    roomPic: string | null;
    roomDescription: string;
    booked: boolean;
    roomServices: [],
    _links: {
        self: { href: string };
        getAllRooms: { href: string };
        bookRoom: { href: string, method: HttpMethod };
    };
}

export interface BookRoom {
    roomId: string;
    bookDate: Date;
    returnDate: Date;
    adultCount: number;
    childrenCount: number;
    price?: number;
    confirmationCode?: string
    _links?: {
        self: { href: string };
    };
}

// Routing
export interface RoomURLs {
    self: {href: string, method?: HttpMethod};
    getAllRooms: {href: string, method?: HttpMethod};
    bookRoom: { href: string, method?: HttpMethod };
}

// API
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface ApiError {
    message: string;
    status?: number;
}

export interface RoomResponse<T = never> {
    data?: T,
    message: string,
    status: number
}

export interface RoomRequest {
    roomType: string;
    roomPrice: number;
    roomNumber: number;
    roomPic: File | null;
}

interface Embedded {
    roomResponseList: Room[];
}

interface Links {
    self: { href: string };
}

export interface RoomApiResponse {
    _embedded: Embedded;
    _links: Links;
}
