import React from "react";
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

export function DialogDeleteTeacher({ id }) {
    const [openModal, setOpenModal] = useState(false);
    const inventoryToken = Cookies.get("inventory_token");

    const DeleteTeacher = async () => {
        console.log(id);
        return;
        try {
            const { data: getUser } = await axios.delete(
                `/api/v1/teachers/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${inventoryToken}`,
                    },
                }
            );
        } catch (error) {
            console.log(error);
            if (error.response?.data?.message === "Unauthenticated.") {
                Inertia.visit("/login");
                return;
            }
        }
    };

    return (
        <Dialog>
            <DialogTrigger className="bg-red-500 py-[10px] px-[10px] rounded-sm">
                <FaTrash className="text-white h-[14px] w-[14px]" />
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
