import * as React from "react"
import {format} from "date-fns"
import {Calendar as CalendarIcon} from "lucide-react"
import {Button} from "./button"
import {cn} from "../../utils/lib/utils.ts";
import {Popover, PopoverContent, PopoverTrigger} from "./popover.tsx"
import {Calendar} from "./calendar.tsx";
import {FormControl} from "./form.tsx";
import {FieldValues} from "react-hook-form";

interface DatePickerFormProps {
    field: FieldValues
    className?: React.HTMLAttributes<HTMLDivElement>
    disablePrevDates?: boolean
}

const DatePickerForm:React.FC<DatePickerFormProps> = ({field, disablePrevDates, className}) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <FormControl>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "pl-3 text-left font-normal w-full",
                            !field.value && "text-muted-foreground"
                        )}
                    >
                        {field.value ? (
                            format(field.value, "PPP")
                        ) : (
                            <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => {
                        const inputDate = new Date(date);
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return (disablePrevDates && inputDate < today) || inputDate < new Date("1900-01-01");
                    }}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}

export default DatePickerForm