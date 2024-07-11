import React, { useState, useEffect } from "react";
import { columns } from "./columns";
import { DataTable } from "./dataTable";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";
import Cookies from "js-cookie";

export default function TableItem() {
    const inventoryToken = Cookies.get("inventory_token");
    const [itemsList, setItemsList] = useState([]);

    const getAllItems = async () => {
        try {
            const { data: getItems } = await axios("/api/v1/items", {
                headers: {
                    Authorization: `Bearer ${inventoryToken}`,
                },
            });
            setItemsList(getItems?.data);
        } catch (error) {
            console.log(error);
            if (error.response.data.message === "Unauthenticated.") {
                Inertia.visit("/login");
                return;
            }
        }
    };

    useEffect(() => {
        getAllItems();
    }, []);

    return (
        <div className="mx-auto max-w-[900px] py-10">
            <DataTable columns={columns} data={itemsList} />
        </div>
    );
}
