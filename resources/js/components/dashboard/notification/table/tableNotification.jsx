import React, { useState, useEffect } from "react";
import { columns } from "./columns";
import { DataTable } from "./dataTable";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";
import Cookies from "js-cookie";
import { useNotificationRefresher } from "@/lib/context/refresherNotification";

export default function TableNotification() {
    const inventoryToken = Cookies.get("inventory_token");
    const [activeStudentList, setActiveStudentList] = useState([]);
    const { refreshKey } = useNotificationRefresher();

    const getAllNotification = async () => {
        try {
            const { data: getStudent } = await axios("/api/v1/notification", {
                headers: {
                    Authorization: `Bearer ${inventoryToken}`,
                },
            });
            setActiveStudentList(getStudent?.data);
        } catch (error) {
            console.log(error);
            if (error.response.data.message === "Unauthenticated.") {
                Inertia.visit("/login");
                return;
            }
        }
    };

    useEffect(() => {
        getAllNotification();
    }, [refreshKey]);

    const data = [
        {
            id: 1,
            user_id: 7,
            id_number: "12345678910",
            name: "Rizki",
            created_at: "2024-06-23T07:44:39.000000Z",
            updated_at: "2024-06-23T07:44:39.000000Z",
            image: "https://robohash.org/rizki",
        },
        {
            id: 2,
            user_id: 8,
            id_number: "12345678",
            name: "Reza",
            created_at: "2024-06-23T07:44:39.000000Z",
            updated_at: "2024-06-23T07:44:39.000000Z",
            image: "https://robohash.org/reza",
        },
        {
            id: 2,
            user_id: 8,
            id_number: "12345678",
            name: "Reza",
            created_at: "2024-06-23T07:44:39.000000Z",
            updated_at: "2024-06-23T07:44:39.000000Z",
            image: "https://robohash.org/reza",
        },
        {
            id: 2,
            user_id: 8,
            id_number: "12345678",
            name: "Reza",
            created_at: "2024-06-23T07:44:39.000000Z",
            updated_at: "2024-06-23T07:44:39.000000Z",
            image: "https://robohash.org/reza",
        },
        {
            id: 2,
            user_id: 8,
            id_number: "12345678",
            name: "Reza",
            created_at: "2024-06-23T07:44:39.000000Z",
            updated_at: "2024-06-23T07:44:39.000000Z",
            image: "https://robohash.org/reza",
        },
        {
            id: 2,
            user_id: 8,
            id_number: "12345678",
            name: "Reza",
            created_at: "2024-06-23T07:44:39.000000Z",
            updated_at: "2024-06-23T07:44:39.000000Z",
            image: "https://robohash.org/reza",
        },
        {
            id: 2,
            user_id: 8,
            id_number: "12345678",
            name: "Reza",
            created_at: "2024-06-23T07:44:39.000000Z",
            updated_at: "2024-06-23T07:44:39.000000Z",
            image: "https://robohash.org/reza",
        },
        {
            id: 2,
            user_id: 8,
            id_number: "12345678",
            name: "Reza",
            created_at: "2024-06-23T07:44:39.000000Z",
            updated_at: "2024-06-23T07:44:39.000000Z",
            image: "https://robohash.org/reza",
        },
        {
            id: 2,
            user_id: 8,
            id_number: "12345678",
            name: "Reza",
            created_at: "2024-06-23T07:44:39.000000Z",
            updated_at: "2024-06-23T07:44:39.000000Z",
            image: "https://robohash.org/reza",
        },
        {
            id: 2,
            user_id: 8,
            id_number: "12345678",
            name: "Reza",
            created_at: "2024-06-23T07:44:39.000000Z",
            updated_at: "2024-06-23T07:44:39.000000Z",
            image: "https://robohash.org/reza",
        },
        {
            id: 2,
            user_id: 8,
            id_number: "12345678",
            name: "Reza",
            created_at: "2024-06-23T07:44:39.000000Z",
            updated_at: "2024-06-23T07:44:39.000000Z",
            image: "https://robohash.org/reza",
        },
        {
            id: 2,
            user_id: 8,
            id_number: "12345678",
            name: "Reza",
            created_at: "2024-06-23T07:44:39.000000Z",
            updated_at: "2024-06-23T07:44:39.000000Z",
            image: "https://robohash.org/reza",
        },
        {
            id: 2,
            user_id: 8,
            id_number: "12345678",
            name: "Reza",
            created_at: "2024-06-23T07:44:39.000000Z",
            updated_at: "2024-06-23T07:44:39.000000Z",
            image: "https://robohash.org/reza",
        },
        {
            id: 2,
            user_id: 8,
            id_number: "12345678",
            name: "Reza",
            created_at: "2024-06-23T07:44:39.000000Z",
            updated_at: "2024-06-23T07:44:39.000000Z",
            image: "https://robohash.org/reza",
        },
    ];

    return (
        <div className="mx-auto max-w-[800px] py-10">
            <DataTable columns={columns} data={activeStudentList} />
        </div>
    );
}
