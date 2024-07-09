import React from 'react'
import {Room} from "../types";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../ui/card.tsx";
import { Button } from '../ui/button.tsx';
import {Badge} from "../ui/badge.tsx";
import {useNavigate} from "react-router-dom";

type Props = {
    roomData: Room
}

const RoomCard: React.FC<Props> = ({roomData : room}) => {
    const navigate = useNavigate();

    const handleOnClick = () => {
        navigate(`rooms/${room.id}/booking`, {state: {
                roomUrls: room._links
            }})
    }

    return (
        <Card className="w-full max-w-sm bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 z-1">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">{room.roomType}</CardTitle>
                <CardDescription className="text-sm text-gray-500">Room #{room.roomNumber}</CardDescription>
            </CardHeader>
            <CardContent>
                {room.roomPic && (
                    <img
                        src={`data:image/png;base64, ${room.roomPic}`}
                        alt={`${room.roomType} - Room ${room.roomNumber}`}
                        className="w-full h-48 object-cover rounded-md mb-4"
                    />
                )}
                <p className="text-gray-700 mb-4">{room.roomDescription}</p>
                <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-green-600">${room.roomPrice}/night</span>
                    <Badge className={"py-2 px-3"} variant={room.booked ? "destructive" : "default"}>
                        {room.booked ? "Booked" : "Available"}
                    </Badge>
                </div>
            </CardContent>
            <CardFooter className="bg-gray-50 border-t border-gray-200 p-4">
                <Button
                    className="w-full"
                    disabled={room.booked}
                    onClick={handleOnClick}
                >
                    {room.booked ? "Not Available" : "Book Now"}
                </Button>
            </CardFooter>
        </Card>
    );
};


export default RoomCard