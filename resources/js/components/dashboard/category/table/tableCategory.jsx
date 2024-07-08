import React from "react";
import { columns } from "./columns";
import { DataTable } from "./dataTable";

export default function TableCategory() {
    const data = [
        {
            id: 1,
            name: "Electronic",
            created_at: "2024-06-23T07:44:39.000000Z",
            updated_at: "2024-06-23T07:44:39.000000Z",
        },
        {
            id: 2,
            name: "Tool",
            created_at: "2024-06-23T07:44:39.000000Z",
            updated_at: "2024-06-23T07:44:39.000000Z",
        },
        {
            id: 3,
            name: "Book",
            created_at: "2024-06-23T07:44:39.000000Z",
            updated_at: "2024-06-23T07:44:39.000000Z",
        },
    ];

    return (
        <div className="mx-auto max-w-[900px] py-10">
            <DataTable columns={columns} data={data} />
        </div>
    );
}
