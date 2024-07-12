import React, {useState} from 'react'
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {BookRoomRequest, BookRoomResponse, Room, RoomURLs} from "../../components/types";
import {useLocation, useParams} from "react-router-dom";
import RoomDetail from "../../components/room/commons/roomDetailCard.tsx";
import BookingSummary from "../../components/room/booking/bookingSummary.tsx";
import {useRoomData, useRoomsData} from "../../components/room/commons/roomCustomHooks.tsx";
import BookingForm from "../../components/room/booking/bookingForm.tsx";
import RoomCarousel from "../../components/room/commons/roomCarousel.tsx";
import {Separator} from "@radix-ui/react-select";

const BookingPage = () => {
    const location = useLocation()
    const roomUrls: RoomURLs = location.state?.roomUrls;
    const roomId = useParams().id;
    const [roomData, isLoading] = useRoomData(roomUrls) as [Room, boolean];
    const [rooms] = useRoomsData()
    const [bookRoomRequestData, setBookRoomRequestData] = useState<BookRoomRequest>()

    const bookingSchema = z.object({
        bookDate: z.date(),
        adultCount: z.string(),
        childrenCount: z.string(),
        returnDate: z.date()
    })
    type bookingFormType = z.infer<typeof bookingSchema>;
    const form = useForm<bookingFormType>({
        resolver: zodResolver(bookingSchema),
        defaultValues: {}
    })

    const Submit = () => {
        const bookRoomData: BookRoomRequest = {
            roomId: roomId || "",
            bookDate: form.getValues("bookDate"),
            returnDate: form.getValues("returnDate"),
            adultCount: Number.parseInt(form.getValues("adultCount")),
            childrenCount: Number.parseInt(form.getValues("childrenCount")),
            tempPrice: roomData.roomPrice * (new Date(form.getValues("returnDate")).getTime() - new Date(form.getValues("bookDate")).getTime()) / (1000 * 60 * 60 * 24)}
        setBookRoomRequestData(bookRoomData)
    }
    const onChange = () => {
        const bookRoomData: BookRoomRequest = {
            roomId: roomId || "",
            bookDate: form.getValues("bookDate"),
            returnDate: form.getValues("returnDate"),
            adultCount: Number.parseInt(form.getValues("adultCount")),
            childrenCount: Number.parseInt(form.getValues("childrenCount")),
            tempPrice: roomData.roomPrice * (new Date(form.getValues("returnDate")).getTime() - new Date(form.getValues("bookDate")).getTime()) / (1000 * 60 * 60 * 24)}
        setBookRoomRequestData(bookRoomData)
    }

    if (isLoading) return <div>Loading...</div>
    return (
        <div className={"flex flex-col w-full container my-5 space-y-10"}>
            <div className={"gap-4 justify-between flex flex-col sm:flex-row"}>
                <RoomDetail roomData={roomData}/>
                <BookingForm form={form} onChange={onChange} onSubmit={Submit}/>
                <BookingSummary roomData={roomData} bookRoomRequestData={bookRoomRequestData}/>
            </div>
            <div className={"items-center content-center flex flex-col mt-2"}>
                <Separator className={"border-t-2 w-full"}/>
                <h2 className={"text-2xl font-semibold p-3"}>Other Rooms</h2>
                <RoomCarousel roomsData={rooms} className={""}/>
            </div>
        </div>
    )
}

export default BookingPage