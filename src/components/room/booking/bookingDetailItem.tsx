import React from "react";
import {Separator} from "@radix-ui/react-select";

export const BookingDetailItem: React.FC<{ label: string; value: string | number | Date }> = ({ label, value }) => (
    <>
        <div className="flex justify-between items-center">
            <span className="text-sm font-semibold">{label}:</span>
            <span className="text-sm text-primary">
        {value instanceof Date ? value.toLocaleDateString() : value}
      </span>
        </div>
        <Separator />
    </>
);