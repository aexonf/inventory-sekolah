import { FaEdit } from "react-icons/fa";
import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../../ui";

export function DialogEditTeacher() {
    return (
        <Dialog>
            <DialogTrigger className="bg-violet-500 py-[10px] px-[10px] rounded-sm">
                <FaEdit className="text-white h-[14px] w-[14px]" />
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
