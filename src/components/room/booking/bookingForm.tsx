import React from 'react'
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../../ui/form.tsx";
import DatePickerForm from "../../ui/datePickerForm.tsx";
import {Input} from "../../ui/input.tsx";
import {Button} from "../../ui/button.tsx";
import {UseFormReturn} from "react-hook-form";

type Props = {
    form: UseFormReturn<{
        bookDate: Date
        returnDate: Date
        adultCount: string
        childrenCount: string
    }, any, undefined>,
    onSubmit: ()=>void
}

const BookingForm: React.FC<Props> = ({form, onSubmit:Submit}) => {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(Submit)}
                  className="w-full space-y-3 overflow-hidden shadow-lg p-4 rounded-lg">
                <FormField
                    control={form.control}
                    name="bookDate"
                    render={({field}) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Book date</FormLabel>
                            <DatePickerForm field={field} disablePrevDates={true}/>

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
    )
}

export default BookingForm