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
import { DialogDeleteItem, DialogEditItem } from "../dialog/index";
import { FaUserAlt } from "react-icons/fa";

export const columns = [
    {
        accessorKey: "no",
        header: () => <div className="text-center">No</div>,
        cell: ({ row }) => {
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
        accessorKey: "description",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Description
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const getDescription = row.getValue("description");
            return (
                <div className="text-left font-medium">{getDescription}</div>
            );
        },
    },
    {
        accessorKey: "stock",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Stock
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const getStock = row.getValue("stock");
            return <div className="text-left font-medium">{getStock}</div>;
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const getStatus = row.getValue("status");
            return <div className="text-left font-medium">{getStatus}</div>;
        },
    },
    {
        id: "actions",
        header: () => <div className="text-left">Action</div>,
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <DialogEditItem
                        id={row.original.id}
                        id_number={row.original.id_number}
                        name={row.original.name}
                        description={row.original.description}
                        status={row.original.status}
                        stock={row.original.stock}
                        categories_id={row.original.categories_id}
                        image={row.original.image}
                    />
                    <DialogDeleteItem id={row.original.id} />
                </div>
            );
        },
    },
];
