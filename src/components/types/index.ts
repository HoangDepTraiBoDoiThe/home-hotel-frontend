export interface Room {
    id: number;
    roomType: string;
    roomNumber: number;
    roomPrice: number;
    roomPic: string | null;
    booked: boolean;
    _links: {
        self: { href: string };
        getAllRooms: { href: string };
    };
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
