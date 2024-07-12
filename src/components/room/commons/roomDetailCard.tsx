import React from 'react'
import {Badge} from "../../ui/badge.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../../ui/card.tsx";
import {Separator} from "@radix-ui/react-select";
import {Room} from "../../types";


interface Props {
    roomData: Room
}

const RoomDetail: React.FC<Props> = ({ roomData }) => {
    return (
        <Card className="overflow-hidden shadow-lg h-full w-full">
            <div className="relative h-48 overflow-hidden">
                <img
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    src={`data:image/png;base64, ${roomData.roomPic}`}
                    alt={`Room ${roomData.roomNumber}`}
                />
                <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground p-2">
                    Room #{roomData.roomNumber}
                </Badge>
            </div>
            <CardHeader>
                <CardTitle className="text-2xl font-bold">{roomData.roomType}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                    {roomData.roomDescription}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Price/night</span>
                    <span className="text-xl text-primary">${roomData.roomPrice.toFixed(2)}</span>
                </div>
                <Separator />
                <div>
                    <h3 className="text-lg font-semibold mb-2">Room Services</h3>
                    {roomData.roomServices && roomData.roomServices.length > 0 ? (
                        <ul className="list-disc list-inside">
                            {roomData.roomServices.map((service, index) => (
                                <li key={index} className="text-sm">{service}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-muted-foreground">No additional services</p>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

export default RoomDetail