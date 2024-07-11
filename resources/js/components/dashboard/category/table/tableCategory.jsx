import React, { useState, useEffect } from "react";
import { columns } from "./columns";
import { DataTable } from "./dataTable";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";
import Cookies from "js-cookie";
import { useItemRefresher } from "@/lib/context/refresherItem";

export default function TableCategory() {
    const inventoryToken = Cookies.get("inventory_token");
    const [categoryList, setCategoryList] = useState([]);
    const { refreshKey } = useItemRefresher();

    const getAllCategory = async () => {
        try {
            const { data: getCategory } = await axios("/api/v1/categories", {
                headers: {
                    Authorization: `Bearer ${inventoryToken}`,
                },
            });
            setCategoryList(getCategory?.data);
        } catch (error) {
            console.log(error);
            if (error.response.data.message === "Unauthenticated.") {
                Inertia.visit("/login");
                return;
            }
        }
    };

    useEffect(() => {
        getAllCategory();
    }, [refreshKey]);

    return (
        <div className="mx-auto max-w-[900px] py-10">
            <DataTable columns={columns} data={categoryList} />
        </div>
    );
}
