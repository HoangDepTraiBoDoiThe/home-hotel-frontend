import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../ui/card";
import { BookRoom, Room } from "../../types";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { useBookRoom } from "./bookingCustomHooks";
import {BookingDetailItem} from "./bookingDetailItem.tsx";

type Props = {
    bookRoomData?: BookRoom;
    roomData: Room;
};

const BookingSummary: React.FC<Props> = ({ bookRoomData, roomData }) => {
    const { bookRoom, isLoading, error, response } = useBookRoom(roomData?._links, bookRoomData);

    function onSubmit() {
        bookRoom()
    }

    return (
        <Card className="overflow-hidden shadow-lg h-full w-full">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">{roomData.roomType}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                    <Badge className={"p-2"}>
                        Room #{roomData.roomNumber}
                    </Badge>
                </CardDescription>
            </CardHeader>
            <CardContent>
                {bookRoomData && (
                    <>
                        <BookingDetailItem label="Book date" value={bookRoomData.bookDate} />
                        <BookingDetailItem label="Return date" value={bookRoomData.returnDate} />
                        <BookingDetailItem label="Temporary price" value={bookRoomData.price} />
                        <BookingDetailItem label="Adult" value={bookRoomData.adultCount} />
                        <BookingDetailItem label="Children" value={bookRoomData.childrenCount} />
                    </>
                )}
            </CardContent>
            <CardFooter>
                {bookRoomData && (
                    <Button className={"w-full"} onClick={onSubmit} disabled={isLoading}>
                        {isLoading ? 'Booking...' : 'Book this room'}
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
};

export default BookingSummary;