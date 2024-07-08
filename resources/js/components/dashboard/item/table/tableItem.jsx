import React from "react";
import { columns } from "./columns";
import { DataTable } from "./dataTable";

export default function TableItem() {
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
        <div className="mx-auto max-w-[900px] py-10">
            <DataTable columns={columns} data={data} />
        </div>
    );
}
