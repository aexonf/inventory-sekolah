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
            <DialogContent className="max-w-[349px]">
                <div className="">
                    <p className="max-w-max text-[12px] text-[#4E3984] rounded-[50px] px-[11px] py-[4px] bg-[#DACDFF]">
                        {capitalizeFirstLetter(status)}
                    </p>

                    <h1 className="text-[20px] mt-[25px] font-semibold mb-[5px]">
                        {name}
                    </h1>
                    <p className="text-start text-[14px]">{description_item}</p>

                    <div className="mt-[21px]">
                        <p className="text-[#3C3B3B] text-[12px]">Categories</p>
                        <div className="bg-[#F0EBFF] max-w-max px-[7px] rounded-md py-[4px]">
                            <p className="text-[#4E3984] text-[14px] rounded-[50px]">
                                {category}
                            </p>
                        </div>
                    </div>
                    <div className="mt-[21px] flex gap-[20px]">
                        <div>
                            <p className="text-[#3C3B3B] text-[12px]">
                                Borrowed Date{" "}
                            </p>
                            <div className="bg-[#F0EBFF] max-w-max px-[7px] rounded-md py-[4px]">
                                <p className="text-[#4E3984] text-[14px] rounded-[50px]">
                                    {formatDate(loan_date)}
                                </p>
                            </div>
                        </div>
                        {return_date && (
                            <div>
                                <p className="text-[#3C3B3B] text-[12px]">
                                    Returned Date{" "}
                                </p>
                                <div className="bg-[#F0EBFF] max-w-max px-[7px] rounded-md py-[4px]">
                                    <p className="text-[#4E3984] text-[14px] rounded-[50px]">
                                        {formatDate(return_date)}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
