import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../ui/form.tsx";
import {InputAce} from "../ui/inputAce.tsx";
import {Button} from "../ui/button.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select.tsx";
import {Input} from "../ui/input.tsx";
import {createNewRoom} from "../../utils/ApiHelperFunctions.ts";

const roomSchema = z.object({
    roomType: z.string().min(2, "Room type must be selected."),
    roomPrice: z.number().min(1, "Room price must be greater than 0."),
    roomNumber: z.number().min(1, "Room number must be greater than 0."),
    roomPic : z.instanceof(File).refine((file) => file.size < 5000000, "Image size must be less than 5MB.")
})
type RoomFormValues = z.infer<typeof roomSchema>;

const AddRoom = () => {

    const form = useForm<RoomFormValues>({
        resolver: zodResolver(roomSchema),
        defaultValues: {
            roomType: "",
            roomPrice: 0,
            roomNumber: 0,
            roomPic: null as unknown as File
        }
    })

    async function onSubmit() {
        try {
            const res = await createNewRoom(form.getValues());
            console.log(res)
        }
        catch (error) {
            console.error(error)
        }
    }

  return (
      <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                  control={form.control}
                  name={"roomType"}
                  render={({ field }) => (
                      <FormItem>
                          <FormLabel className={""}>Room type</FormLabel>
                          <FormControl>
                              <Select onValueChange={(value) => field.onChange(value)}>
                                  <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Select room type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                      <SelectItem value="Create">Light</SelectItem>
                                      <SelectItem value="Single bed">Single bed</SelectItem>
                                      <SelectItem value="Double bed">Double bed</SelectItem>
                                  </SelectContent>
                              </Select>
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                  )}
              />
              <FormField
                  control={form.control}
                  name={"roomNumber"}
                  render={({ field }) => (
                      <FormItem>
                          <FormLabel>Room price</FormLabel>
                          <FormControl>
                              <InputAce type="number" placeholder="Enter room number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                  )}
              />
              <FormField
                  control={form.control}
                  name={"roomPrice"}
                  render={({ field }) => (
                      <FormItem>
                          <FormLabel>Room price</FormLabel>
                          <FormControl>
                              <InputAce type="number" placeholder="Enter room price" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                  )}
              />
              <FormField
                  control={form.control}
                  name={"roomPic"}
                  render={({ field }) => (
                      <FormItem>
                          <FormLabel>Room price</FormLabel>
                          <FormControl>
                              <Input type="file" accept="image/*" onChange={e => field.onChange(e.target.files?.[0])} />
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                  )}
              />

              <Button className={"w-full"} type="submit">Submit</Button>
          </form>
      </Form>
  )
}

export default AddRoom