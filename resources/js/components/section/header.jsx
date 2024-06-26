import React from "react";
import { Inertia } from "@inertiajs/inertia";
import Cookies from "js-cookie";
import { Button, Popover, PopoverContent, PopoverTrigger } from "../ui/index";

export function Header({ title }) {
    return (
        <div className="px-[25px] flex items-center bg-primary-low  justify-between py-[10px]">
            <div className="flex items-center gap-2">
                {/* <CircleUserRound className="h-[42px] w-[42px] stroke-1" /> */}
                <h1 className="text-[20px] font-[500] flex flex-col justify-center leading-[17px]">
                    {title}
                    {/* Welcome <br />
                                    <span className="font-semibold">
                                        John Doe
                                    </span> */}
                </h1>
            </div>

            <div className="relative">
                <Popover>
                    <PopoverTrigger
                        className="bg-[#4600FF] bg-opacity-[10%] flex justify-center items-center h-[50px] w-[50px] rounded-full p-0"
                        // onClick={() => {
                        //     Cookies.remove("inventory_token");
                        //     Inertia.visit("/");
                        // }}
                    >
                        {" "}
                        <span className="text-[20px] pt-[4px] text-center leading-none">
                            JD
                        </span>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto">
                        <div>John Doe</div>
                        <div>johndoe@gmail.com</div>
                        <Button className="text-[14px] mt-[10px] bg-red-800">
                            Logout
                        </Button>
                    </PopoverContent>
                </Popover>
                {/* <button
                    
                >
                   
                </button> */}
            </div>
        </div>
    );
}
