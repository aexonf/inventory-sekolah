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
            number_id: "222222",
            name: "Test User 1",
            phone: "0111121212",
            student_class: "PPLG 2",
            level: "X",
        },
        {
            number_id: "333333",
            name: "Test User 2",
            phone: "02222222",
            student_class: "PPLG 1",
            level: "XII",
        },
    ];

    return (
        <div className="mx-auto max-w-[900px] py-10">
            <DataTable columns={columns} data={dummy} />
        </div>
    );
}
