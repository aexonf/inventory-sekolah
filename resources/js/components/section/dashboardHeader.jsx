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
import { FaUserCircle } from "react-icons/fa";
import { CustomSheet } from "./customSheet";

export function DashboardHeader() {
    return (
        <div className="w-full px-[25px] flex items-center bg-[#885ff9] pt-[20px] justify-between min-[1000px]:justify-end pb-[70px]">
            {/* <div className="max-[1000px]:block hidden"></div> */}
            <CustomSheet />
            <div className="flex items-center gap-2">
                <FaUserCircle className="h-[30px] w-[30px] text-slate-100" />
                <h1 className="text-white">Hi, User!</h1>
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
