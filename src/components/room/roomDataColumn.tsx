import {ColumnDef} from "@tanstack/react-table";
import {Room} from "../types";

export const RoomDataColumn: ColumnDef<Room>[] = [
    {
        accessorKey: "roomType",
        header: "Room type"
    },
    {
        accessorKey: "roomNumber",
        header: "Room number"
    },
    {
        accessorKey: "roomPrice",
        header: "Room price"
    },
]