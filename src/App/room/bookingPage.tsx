import React, {useState} from 'react'
import {Form, FormControl, FormField, FormLabel, FormMessage} from '../../components/ui/form';
import {FormItem} from "../../components/ui/form.tsx";
import {Input} from "../../components/ui/input.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Button} from "../../components/ui/button.tsx";
import DatePickerForm from "../../components/ui/datePickerForm.tsx";
import {BookRoom, Room, RoomURLs} from "../../components/types";
import {useLocation, useParams} from "react-router-dom";
import RoomDetail from "../../components/room/commons/roomDetailCard.tsx";
import BookingSummary from "../../components/room/booking/bookingSummary.tsx";
import {useRoomData} from "../../components/room/booking/bookingCustomHooks.tsx";
import BookingForm from "../../components/room/booking/bookingForm.tsx";

const BookingPage = () => {
    const location = useLocation()
    const roomUrls: RoomURLs = location.state?.roomUrls;
    const roomId = useParams().id;
    const [roomData, isLoading] = useRoomData(roomUrls) as [Room, boolean]
    const [bookRoomData, setBookRoomData] = useState<BookRoom>()

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

    const Submit = async () => {
        const bookRoomData: BookRoom = {
            roomId: roomId || "",
            bookDate: form.getValues("bookDate"),
            returnDate: form.getValues("returnDate"),
            adultCount: Number.parseInt(form.getValues("adultCount")),
            childrenCount: Number.parseInt(form.getValues("childrenCount")),
        }
        setBookRoomData(bookRoomData)
    }
    if (isLoading) return <div>Loading...</div>
    return (
        <div className={"flex flex-col w-full container my-5"}>
            <div className={"gap-4 justify-between flex flex-col sm:flex-row"}>
                <RoomDetail roomData={roomData}/>
                <BookingForm form={form} onSubmit={Submit}/>
                <BookingSummary roomData={roomData} bookRoomData={bookRoomData}/>
            </div>
        </div>
    )
}

export default BookingPage