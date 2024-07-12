import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../ui/card";
import {BookRoomRequest, Room} from "../../types";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { useBookRoom } from "../commons/roomCustomHooks.tsx";
import {BookingDetailItem} from "./bookingDetailItem.tsx";
import {Separator} from "@radix-ui/react-select";

type Props = {
    bookRoomRequestData?: BookRoomRequest;
    roomData: Room;
};

const BookingSummary: React.FC<Props> = ({ bookRoomRequestData, roomData }) => {
    const { bookRoom, isLoading, error, response } = useBookRoom(roomData?._links, bookRoomRequestData);

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
                {bookRoomRequestData && (
                    <>
                        <BookingDetailItem label="Book date" value={bookRoomRequestData.bookDate} />
                        <BookingDetailItem label="Return date" value={bookRoomRequestData.returnDate} />
                        <BookingDetailItem label="Number of adult" value={bookRoomRequestData.adultCount} />
                        <BookingDetailItem label="Number of children" value={bookRoomRequestData.childrenCount} />
                        <Separator className={"border-t-2 mb-5"}/>
                        <BookingDetailItem label="Temporary price" value={`$${bookRoomRequestData.tempPrice}`} />
                    </>
                )}
            </CardContent>
            <CardFooter>
                {bookRoomRequestData && (
                    <Button className={"w-full"} onClick={onSubmit} disabled={isLoading}>
                        {isLoading ? 'Booking...' : 'Book this room'}
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
};

export default BookingSummary;