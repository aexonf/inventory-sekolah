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
import { DialogDeleteCategory, DialogEditCategory } from "../dialog";
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
            return (
                <div className="flex items-center gap-2">
                    <DialogEditCategory
                        id={row.original.id}
                        name={row.original.name}
                    />
                    <DialogDeleteCategory id={row.original.id} />
                </div>
            );
        },
    },
];
