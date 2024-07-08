import {ColumnDef} from "@tanstack/react-table";
import {Room} from "../types";
import {Link} from "react-router-dom";
import {Button} from "../ui/button.tsx";
import {ArrowUpDown} from "lucide-react";

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
        header:  ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Room price
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({row}) => {
            let amount = parseFloat(row.getValue("roomPrice"));
            amount = isNaN(amount) ? 0 : amount;
            const formattedAmount = new Intl.NumberFormat("es-US", {
                style: "currency",
                currency: "USD"
            }).format(amount)

            return <div className="text-right font-medium">{formattedAmount}</div>
        }
    },
    {
        id: "actions",
        header: "Controls",
        cell: ({row}) => {
            const payment = row.original
            return (
                <div>
                    <Link className={"border-2 p-2 rounded-sm"} to={"#"}>Edit/View</Link>
                </div>
            )
        },
    },
]