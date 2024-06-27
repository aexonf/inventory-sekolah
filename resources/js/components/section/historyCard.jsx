import React, { useState } from "react";
import moment from "moment";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/index";

export function HistoryCard({
    id,
    name,
    description_item,
    category,
    loan_date,
    return_date,
    status,
}) {
    const formatDate = (dateString) => {
        return moment(dateString).format("DD MMMM YYYY");
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <Dialog>
            <DialogTrigger className="flex flex-col items-start bg-[#E1D6FF] bg-opacity-[25%] py-[16px] px-[23px] rounded-[5px]">
                <h1 className="text-[17px] font-semibold mb-[7px]">{name}</h1>
                <p className="text-start text-[14px] line-clamp-2">
                    {description_item}
                </p>
                <div className="mt-[21px] flex justify-end w-full gap-2">
                    <p className="text-[12px] text-[#4E3984] rounded-[50px] px-[11px] py-[4px] bg-[#DACDFF]">
                        {capitalizeFirstLetter(status)}
                    </p>
                    <p className="text-[12px] text-[#4E3984] rounded-[50px] px-[11px] py-[4px] bg-[#DACDFF]">
                        {formatDate(loan_date)}
                    </p>
                </div>
            </DialogTrigger>
            <DialogContent>
                {/* <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                    </DialogDescription>
                </DialogHeader> */}
                <div>Halo Dunia</div>
            </DialogContent>
        </Dialog>
    );
}
