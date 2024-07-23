import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    Button,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../../ui";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Inertia } from "@inertiajs/inertia";
import Cookies from "js-cookie";
import { Toaster, toast } from "sonner";
import { useNotificationRefresher } from "@/lib/context/refresherNotification";

export function DialogDeleteNotification({ row }) {
    const [openModal, setOpenModal] = useState(false);
    const inventoryToken = Cookies.get("inventory_token");
    const { refresh } = useNotificationRefresher();

    const DeleteNotification = async () => {
        try {
            const { data: deleteNotification } = await axios.delete(
                `/api/v1/notification/${row.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${inventoryToken}`,
                    },
                }
            );
            setOpenModal(false);
            toast.success("Success Delete Notification", {
                duration: 3000,
            });
            refresh();
        } catch (error) {
            console.log(error);
            toast.error("Failed Delete Notification", {
                duration: 3000,
            });
            if (error.response?.data?.message === "Unauthenticated.") {
                Inertia.visit("/login");
                return;
            }
        }
    };

    return (
        <>
            <Toaster richColors position="top-center" />
            <Dialog open={openModal} onOpenChange={setOpenModal}>
                <DialogTrigger className="bg-red-500 py-[10px] px-[10px] rounded-sm">
                    <FaTrash className="text-white h-[14px] w-[14px]" />
                </DialogTrigger>
                <DialogContent className="w-auto py-[20px] px-[25px]">
                    <DialogHeader>
                        <DialogTitle className="text-center font-medium">
                            Hapus Notifikasi ini?
                        </DialogTitle>
                    </DialogHeader>
                    <div className="flex items-center justify-center gap-3 mt-[10px]">
                        <Button
                            className="bg-violet-500 hover:bg-violet-400 font-semibold"
                            onClick={() => setOpenModal(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="bg-red-500 hover:bg-red-400 font-semibold"
                            onClick={DeleteNotification}
                        >
                            Hapus
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
