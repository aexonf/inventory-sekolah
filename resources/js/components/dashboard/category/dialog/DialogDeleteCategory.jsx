import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
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

export function DialogDeleteCategory({ id }) {
    const [openModal, setOpenModal] = useState(false);
    const inventoryToken = Cookies.get("inventory_token");

    const DeleteCategory = async () => {
        try {
            const { data: deleteCategory } = await axios.delete(
                `/api/v1/categories/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${inventoryToken}`,
                    },
                }
            );
            setOpenModal(false);
            toast.success("Success Delete Categories", {
                duration: 3000,
            });
        } catch (error) {
            console.log(error);
            toast.error("Failed Delete Categories", {
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
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are delete this category?</DialogTitle>
                    </DialogHeader>
                    <button onClick={DeleteCategory}>Hapus</button>
                </DialogContent>
            </Dialog>
        </>
    );
}
