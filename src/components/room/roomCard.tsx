import React from 'react'
import {Room} from "../types";
import {Link} from "react-router-dom";

type Props = {
    roomData: Room
}

const RoomCard: React.FC<Props> = (props: Props) => {
    return (
        <div className="justify-between items-center flex h-[300px] p-4 rounded overflow-hidden shadow-lg">
            <div className={"flex"}>
                <img className=" h-[200px]" src={`data:image/png;base64, ${props.roomData.roomPic}`}
                     alt={"room-image"}/>
                <div className="px-6 ">
                    <div className="font-bold text-xl mb-2">{props.roomData.roomNumber}</div>
                    <p className="text-gray-700 text-base">
                        {props.roomData.roomPrice}
                    </p>
                </div>
            </div>
            <div>
                <Link to={`/${props.roomData._links.bookRoom}`}>
                    Book room
                </Link>
            </div>
        </div>
    );
}

export default RoomCard