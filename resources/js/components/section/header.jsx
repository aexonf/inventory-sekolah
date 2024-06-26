import React from "react";
import { Inertia } from "@inertiajs/inertia";
import Cookies from "js-cookie";
import {
    Button,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/index";

export function Header({ title, profilePage }) {
    return (
        <div className="px-[25px] flex items-center bg-primary-low  justify-between py-[17px]">
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
        </div>
    );
}

export function LogoutDialog() {
    return (
        <Dialog>
            <DialogTrigger className="w-full bg-red-800 text-white py-[5px] rounded-sm mt-[10px] text-[14px]">
                Logout
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

/*
   {!profilePage && (
                <div className="bg-[#4600FF] bg-opacity-[10%] flex justify-center items-center h-[45px] w-[45px] rounded-full p-0">
                    <span className="text-[20px] pt-[4px] text-center leading-none">
                        JD
                    </span>

                    {/* <Popover>
                    <PopoverTrigger
                       
                        // onClick={() => {
                        //     Cookies.remove("inventory_token");
                        //     Inertia.visit("/");
                        // }}
                    >
                        {" "}
                        
                    </PopoverTrigger>
                    <PopoverContent className="w-auto">
                        <div>John Doe</div>
                        <div>johndoe@gmail.com</div>

                        <LogoutDialog />
                    </PopoverContent>
                
                </div>
            )}
*/
