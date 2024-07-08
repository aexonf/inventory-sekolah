import React from "react";
import {
    Checkbox,
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../../ui/index";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { DialogDeleteTeacher, DialogEditTeacher } from "../dialog";
import { FaUserAlt } from "react-icons/fa";

export const columns = [
    {
        accessorKey: "image",
        header: () => <div className="text-center">No</div>,
        cell: ({ row }) => {
            const amount = row.getValue("image");

            return (
                <div className="flex justify-center items-center">
                    <h1>{row.index + 1}</h1>
                </div>
            );
        },
    },
    {
        accessorKey: "image",
        header: () => <div className="text-center">Image</div>,
        cell: ({ row }) => {
            const amount = row.getValue("image");

            return (
                <div className="flex justify-center items-center">
                    <div className="bg-violet-100 rounded-full h-[40px] w-[40px] flex justify-center items-end overflow-hidden">
                        {/* <img
                            className="h-[40px] w-[40px]"
                            src={amount}
                            alt="ll"
                        /> */}
                        <FaUserAlt className="h-[30px] w-[30px] text-violet-500" />
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "id_number",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Number Id
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const getName = row.getValue("id_number");
            return <div className="text-left font-medium">{getName}</div>;
        },
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const getName = row.getValue("name");
            return <div className="text-left font-medium">{getName}</div>;
        },
    },
    {
        id: "actions",
        header: () => <div className="text-left">Action</div>,
        cell: ({ row }) => {
            const payment = row.original;

            return (
                <div className="flex items-center gap-2">
                    <DialogEditTeacher />
                    <DialogDeleteTeacher />
                </div>
            );
        },
    },
];
