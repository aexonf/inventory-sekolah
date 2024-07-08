import React from "react";
import { columns } from "./columns";
import DataTable from "./data-table";

// async function getData(){

//   return [
//     {
//       id: "728ed52f",
//       amount: 100,
//       status: "pending",
//       email: "m@example.com",
//     },
//      ]
// }

export default function DemoPage() {
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
        // ...
    ];

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    );
}
