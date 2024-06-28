import React, { useState } from "react";
import Cookies from "js-cookie";
import { Inertia } from "@inertiajs/inertia";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/index";

export function LogoutButton() {
    const [openModal, setOpenModal] = useState(false);

    return (
        <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogTrigger className="py-[5px] px-[20px] bg-[#A589F0] max-w-max mx-auto text-white rounded-[50px]">
                Logout
            </DialogTrigger>
            <DialogContent className="max-w-[270px] px-0 py-[23px]">
                <DialogHeader>
                    <DialogTitle className="font-medium text-[16px] text-center mb-[18px]">
                        Are you sure you want to logout?
                    </DialogTitle>
                    <div className="flex gap-4 justify-center">
                        <button className="px-[11px] py-[5px] border-[1px] border-[#A589F0] text-[#A589F0] rounded-sm">
                            <span
                                onClick={() => setOpenModal(false)}
                                className="mt-[15px] leading-3"
                            >
                                Cancel
                            </span>
                        </button>
                        <button
                            className="px-[11px] py-[5px] bg-[#A589F0] text-[#A589F0] rounded-sm"
                            onClick={() => {
                                Cookies.remove("inventory_token");
                                Inertia.visit("/");
                            }}
                        >
                            <span className="mt-[15px] leading-3 text-white">
                                Logout
                            </span>
                        </button>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
