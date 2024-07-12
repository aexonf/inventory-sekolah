import React, { useState } from "react";
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
import { MoreHorizontal } from "lucide-react";
import { DialogDeleteItem, DialogEditItem } from "../dialog/index";

export default function ActionComponent({ row }) {
    const [openMenu, setOpenMenu] = useState(false);

    return (
        <DropdownMenu open={openMenu} onOpenChange={setOpenMenu}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent onClick={() => setOpenMenu(true)} align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>

                <DropdownMenuItem>View Item</DropdownMenuItem>

                <DropdownMenuItem>
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
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <DialogDeleteItem id={row.original.id} />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
