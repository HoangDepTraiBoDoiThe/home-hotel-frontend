import React from 'react'
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from '../../ui/carousel'
import {Room} from "../../types";
import RoomCard from "../roomCard.tsx";
import {cn} from "../../../utils/lib/utils.ts";

type Props = {
    roomsData: Room[],
    className?: string
}

const RoomCarousel:React.FC<Props> = ({roomsData, className}) => {
  return (
      <Carousel
          opts={{
              align: "start",
              loop: true
          }}
          className={cn("w-full", className)}
      >
          <CarouselContent>
              {roomsData.map(room => (
                  <CarouselItem key={room.id} className="md:basis-1/2 lg:basis-1/3 p-5">
                      <RoomCard roomData={room}/>

                  </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
      </Carousel>
  )
}

export default RoomCarousel