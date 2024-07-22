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
import {
    DialogDeleteItem,
    DialogEditItem,
    DialogDetailItem,
} from "../dialog/index";
import { FaUserAlt } from "react-icons/fa";
import { ButtonDownloadPdf } from "../button/ButtonDownloadPdf";

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
            return (
                <div className="text-left font-medium">
                    {getStatus === "available" ? "Available" : "Not Available"}
                </div>
            );
        },
    },
    {
        id: "actions",
        header: () => <div className="text-left">Action</div>,
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <ButtonDownloadPdf row={row.original} />
                    <DialogDetailItem row={row.original} />
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
