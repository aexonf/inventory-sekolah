import React from "react";
import { columns } from "./columns";
import { DataTable } from "./dataTable";

export default function TableItem() {
    const data = [
        {
            id: 1,
            id_number: "12345678910",
            name: "Laptop Acer",
            description: "hahaah",
            stock: 1,
            status: "available",
            created_at: "2024-06-23T07:44:39.000000Z",
            updated_at: "2024-06-23T07:44:39.000000Z",
            image: "https://robohash.org/rizki",
        },
        {
            id: 2,
            id_number: "12345678910",
            name: "Laptop Macbook",
            description: "hahaah",
            stock: 1,
            status: "available",
            created_at: "2024-06-23T07:44:39.000000Z",
            updated_at: "2024-06-23T07:44:39.000000Z",
            image: "https://robohash.org/rizki",
        },
    ];

    return (
        <div className="mx-auto max-w-[900px] py-10">
            <DataTable columns={columns} data={data} />
        </div>
    );
}
