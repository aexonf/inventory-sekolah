import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { FaUsers } from "react-icons/fa";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";
import Cookies from "js-cookie";
import UploadForm from "./test";

function Dashboard() {
    const inventoryToken = Cookies.get("inventory_token");
    const [totalStudent, setTotalStudent] = useState(0);
    const [totalActiveStudent, setTotalActiveStudent] = useState(0);
    const [totalTeacher, setTotalTeacher] = useState(0);

    const getAllTeacher = async () => {
        try {
            const { data: getTeacher } = await axios("/api/v1/teachers", {
                headers: {
                    Authorization: `Bearer ${inventoryToken}`,
                },
            });

            const total = getTeacher.data?.length;
            setTotalTeacher(total);
        } catch (error) {
            console.log(error);
            if (error.response.data.message === "Unauthenticated.") {
                Inertia.visit("/login");
                return;
            }
        }
    };

    const getAllStudent = async () => {
        try {
            const { data: getStudent } = await axios("/api/v1/students", {
                headers: {
                    Authorization: `Bearer ${inventoryToken}`,
                },
            });

            const total = getStudent.data?.length;
            setTotalStudent(total);
        } catch (error) {
            console.log(error);
            if (error.response.data.message === "Unauthenticated.") {
                Inertia.visit("/login");
                return;
            }
        }
    };

    const getAllActiveStudent = async () => {
        try {
            const { data: getActiveStudent } = await axios(
                "/api/v1/active-students",
                {
                    headers: {
                        Authorization: `Bearer ${inventoryToken}`,
                    },
                }
            );

            const total = getActiveStudent.data?.length;
            setTotalActiveStudent(total);
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
        getAllTeacher();
        getAllActiveStudent();
    }, []);

    return (
        <div className="relative w-full">
            <div className="absolute top-[-40px] w-full px-[20px]">
                <div className="bg-white shadow-[3px_3px_20px_-2px_#00000024]  py-[20px] rounded-md px-[20px]">
                    <h1 className="text-[20px]">Dashboard</h1>
                </div>
            </div>

            <div className="pt-[70px]  px-[20px] flex items-center justify-center flex-wrap gap-10">
                <div className="flex items-center shadow-[5px_5px_30px_-5px_#00000024] flex-grow py-[10px] px-[10px] rounded-md gap-4">
                    <div className="bg-violet-400 h-[80px] w-[80px] flex justify-center items-center rounded-md">
                        <FaUsers className="h-[30px] w-[30px] text-white" />
                    </div>
                    <div className="flex flex-col justify-center">
                        <p>Total Guru</p>
                        <h1>{totalTeacher}</h1>
                    </div>
                </div>
                <div className="flex items-center shadow-[5px_5px_30px_-5px_#00000024] flex-grow py-[10px] px-[10px] rounded-md gap-4">
                    <div className="bg-violet-400 h-[80px] w-[80px] flex justify-center items-center rounded-md">
                        <FaUsers className="h-[30px] w-[30px] text-white" />
                    </div>
                    <div className="flex flex-col justify-center">
                        <p>Total Siswa Aktif</p>
                        <h1>{totalActiveStudent}</h1>
                    </div>
                </div>
                <div className="flex items-center shadow-[5px_5px_30px_-5px_#00000024] flex-grow py-[10px] px-[10px] rounded-md gap-4">
                    <div className="bg-violet-400 h-[80px] w-[80px] flex justify-center items-center rounded-md">
                        <FaUsers className="h-[30px] w-[30px] text-white" />
                    </div>
                    <div className="flex flex-col justify-center">
                        <p>Total Siswa</p>
                        <h1>{totalStudent}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

Dashboard.layout = (page) => <Layout children={page} title="Welcome" />;

export default Dashboard;
