import React, { useState, useEffect } from "react";
import { columns } from "./columns";
import { DataTable } from "./dataTable";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";
import Cookies from "js-cookie";
import { useItemRefresher } from "@/lib/context/refresherItem";

export default function TableTemporary() {
    const inventoryToken = Cookies.get("inventory_token");
    const [itemsList, setItemsList] = useState([]);
    const { refreshKey } = useItemRefresher();

    // const getAllItems = async () => {
    //     try {
    //         const { data: getItems } = await axios("/api/v1/items", {
    //             headers: {
    //                 Authorization: `Bearer ${inventoryToken}`,
    //             },
    //         });
    //         setItemsList(getItems?.data);
    //     } catch (error) {
    //         console.log(error);
    //         if (error.response.data.message === "Unauthenticated.") {
    //             Inertia.visit("/login");
    //             return;
    //         }
    //     }
    // };

    // useEffect(() => {
    //     getAllItems();
    // }, [refreshKey]);

    const dummy = [
        {
            name: "Test User 1",
            number_id: "1111111",
            phone: "0111121212",
            student_class: "PPLG 2",
            level: "X",
            item_name: "Laptop Acer",
            item_id: "123",
            item_number_id: "122222",
        },
        {
            name: "Test User 2",
            number_id: "2222222",
            phone: "02222222",
            student_class: "PPLG 1",
            level: "XII",
            item_name: "Laptop Acer",
            item_id: "123",
            item_number_id: "122222",
        },
    ];

    return (
        <div className="mx-auto max-w-[900px] py-10">
            <DataTable columns={columns} data={dummy} />
        </div>
    );
}
