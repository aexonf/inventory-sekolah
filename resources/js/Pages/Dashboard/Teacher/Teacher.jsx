import React, { useState } from "react";
import Layout from "../Layout";
import { FiPlus } from "react-icons/fi";
import TableTeacher from "@/components/dashboard/teacher/table/tableTeacher";
import { TeacherRefresherProvider } from "@/lib/context/refresherTeacher";

function Teacher() {
    return (
        <TeacherRefresherProvider>
            <div className="relative w-full">
                <div className="absolute top-[-40px] w-full px-[20px]">
                    <div className="bg-white shadow-[3px_3px_20px_-2px_#00000024]  py-[20px] rounded-md px-[20px]">
                        <h1 className="text-[20px]">Teacher</h1>
                    </div>
                </div>
                <div className="pt-[70px] pb-[20px] px-[20px]">
                    <div className="pt-[0px] px-[50px] shadow-[5px_5px_30px_-5px_#00000024]">
                        <TableTeacher />
                    </div>
                </div>
            </div>
        </TeacherRefresherProvider>
    );
}

Teacher.layout = (page) => <Layout children={page} title="Welcome" />;

export default Teacher;
