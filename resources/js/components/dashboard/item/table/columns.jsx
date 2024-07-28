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
                <div className="text-left font-medium">
                    {getDescription === null || getDescription === "null"
                        ? "-"
                        : getDescription}
                </div>
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

            const checkStatus = () => {
                switch (getStatus) {
                    case "not_available":
                        return "Dipinjam";
                    case "lost":
                        return "Hilang";
                    case "damaged":
                        return "Rusak";
                    default:
                        return "Tersedia";
                }
            };
            return <div className="text-left font-medium">{checkStatus()}</div>;
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
                    <DialogEditItem row={row.original} />
                    <DialogDeleteItem id={row.original.id} />
                </div>
            );
        },
    },
];
