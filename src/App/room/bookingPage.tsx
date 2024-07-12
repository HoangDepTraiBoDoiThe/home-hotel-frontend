import React from 'react'
import {Form, FormControl, FormDescription, FormField, FormLabel, FormMessage} from '../../components/ui/form';
import {FormItem} from "../../components/ui/form.tsx";
import {Input} from "../../components/ui/input.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Button} from "../../components/ui/button.tsx";
import DatePickerForm from "../../components/ui/datePickerForm.tsx";
import {BookRoom, Room, RoomURLs} from "../../components/types";
import {useLocation, useParams} from "react-router-dom";
import {useBookRoom, useRoomData} from "../../components/room/Booking/bookingCustomHooks.tsx";

const BookingPage= () => {
    const location = useLocation()
    const roomUrls:RoomURLs = location.state?.roomUrls;
    const roomId = useParams().id;
    const [roomData, isLoading] = useRoomData(roomUrls) as [Room, boolean]

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
        const bookRoomData:BookRoom = {
            roomId: roomId || "",
            bookDate: form.getValues("bookDate"),
            returnDate: form.getValues("returnDate"),
            adultCount: Number.parseInt(form.getValues("adultCount")),
            childrenCount: Number.parseInt(form.getValues("childrenCount")),
        }
        await useBookRoom(bookRoomData, roomData?._links)
    }
    if (isLoading) return <div>Loading...</div>
    return (
        <div className={"flex flex-col w-full"}>
            <div className={"justify-center items-center flex"}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(Submit)} className="space-y-3 w-1/3">
                        <FormField
                            control={form.control}
                            name="bookDate"
                            render={({field}) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Book date</FormLabel>
                                    <DatePickerForm field={field} disablePrevDates={true}/>
                                    <FormDescription>

                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="returnDate"
                            render={({field}) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Return date</FormLabel>
                                    <DatePickerForm field={field} disablePrevDates={true}/>
                                    <FormDescription>

                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="adultCount"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Adult count</FormLabel>
                                    <FormControl>
                                        <Input min={1} type={"number"} {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="childrenCount"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Children count</FormLabel>
                                    <FormControl>
                                        <Input min={0} type={"number"} {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button className={"w-full"} type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default BookingPage