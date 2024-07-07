import React from "react";
import Layout from "./Layout";
import { FaUserAlt, FaUsers } from "react-icons/fa";

function Dashboard() {
    return (
        <div className="relative w-full">
            <div className="absolute top-[-40px] w-full px-[20px]">
                <div className="bg-white shadow-[3px_3px_20px_-2px_#00000024]  py-[20px] rounded-md px-[20px]">
                    <h1 className="text-[20px]">Dashboard</h1>
                </div>
            </div>

            <div className="pt-[70px]  px-[20px] flex items-center justify-center flex-wrap gap-10">
                <div className="flex items-center shadow-[5px_5px_30px_-5px_#00000024] flex-grow py-[10px] px-[10px] rounded-md gap-4" >
                    <div className="bg-violet-400 h-[80px] w-[80px] flex justify-center items-center rounded-md" >
                        <FaUsers className="h-[30px] w-[30px] text-white" />
                    </div>
                    <div className="flex flex-col justify-center" >
                        <p>Total Guru</p>
                        <h1>22</h1>
                    </div>
                </div>
                <div className="flex items-center shadow-[5px_5px_30px_-5px_#00000024] flex-grow py-[10px] px-[10px] rounded-md gap-4" >
                    <div className="bg-violet-400 h-[80px] w-[80px] flex justify-center items-center rounded-md" >
                        <FaUsers className="h-[30px] w-[30px] text-white" />
                    </div>
                    <div className="flex flex-col justify-center" >
                        <p>Total Siswa Aktif</p>
                        <h1>22</h1>
                    </div>
                </div>
                  <div className="flex items-center shadow-[5px_5px_30px_-5px_#00000024] flex-grow py-[10px] px-[10px] rounded-md gap-4" >
                    <div className="bg-violet-400 h-[80px] w-[80px] flex justify-center items-center rounded-md" >
                        <FaUsers className="h-[30px] w-[30px] text-white" />
                    </div>
                    <div className="flex flex-col justify-center" >
                        <p>Total Siswa</p>
                        <h1>22</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

Dashboard.layout = (page) => <Layout children={page} title="Welcome" />;

export default Dashboard;
