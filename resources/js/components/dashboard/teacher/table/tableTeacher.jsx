import React, { useState, useEffect } from "react";
import { columns } from "./columns";
import { DataTable } from "./dataTable";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";
import Cookies from "js-cookie";

export default function TableTeacher() {
    const inventoryToken = Cookies.get("inventory_token");
    const [studentList, setStudentList] = useState([]);

    const getAllStudent = async () => {
        try {
            const { data: getStudent } = await axios("/api/v1/teachers", {
                headers: {
                    Authorization: `Bearer ${inventoryToken}`,
                },
            });
            setStudentList(getStudent?.data);
        } catch (error) {
            console.log(error);
            if (error.response.data.message === "Unauthenticated.") {
                Inertia.visit("/login");
                return;
            }
        }
    };

    useEffect(() => {
        getAllStudent();
    }, []);

    return (
        <div className="mx-auto max-w-[900px] py-10">
            <DataTable columns={columns} data={studentList} />
        </div>
    );
}
