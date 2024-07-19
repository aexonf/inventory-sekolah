import React, { useState, useEffect } from "react";
import { columns } from "./columns";
import { DataTable } from "./dataTable";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";
import Cookies from "js-cookie";
import { useItemRefresher } from "@/lib/context/refresherItem";

export default function TableTemporary() {
    const inventoryToken = Cookies.get("inventory_token");
    const [temporaryList, setTemporaryList] = useState([]);
    const { refreshKey } = useItemRefresher();

    const getAllTemporary = async () => {
        try {
            const { data: getItems } = await axios("/api/v1/temporary", {
                headers: {
                    Authorization: `Bearer ${inventoryToken}`,
                },
            });
            setTemporaryList(getItems?.data);
        } catch (error) {
            console.log(error);
            if (error.response.data.message === "Unauthenticated.") {
                Inertia.visit("/login");
                return;
            }
        }
    };

    useEffect(() => {
        getAllTemporary();
    }, [refreshKey]);

    return (
        <div className="mx-auto max-w-[900px] py-10">
            <DataTable columns={columns} data={temporaryList} />
        </div>
    );
}
