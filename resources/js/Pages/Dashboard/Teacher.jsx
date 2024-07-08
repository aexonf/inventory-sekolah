import React from "react";
import Layout from "./Layout";
import { FiPlus } from "react-icons/fi";
import TableTeacher from "../..//components/section/teacher/table/tableTeacher";

function Setting() {
    return (
        <div className="relative w-full">
            <div className="absolute top-[-40px] w-full px-[20px]">
                <div className="bg-white shadow-[3px_3px_20px_-2px_#00000024]  py-[20px] rounded-md px-[20px]">
                    <h1 className="text-[20px]">Teacher</h1>
                </div>
            </div>
            <div className="pt-[70px] px-[20px]">
                <div className="pt-[40px] px-[50px] shadow-[5px_5px_30px_-5px_#00000024]">
                    <button className="flex items-center gap-1 bg-violet-500 text-white py-[4px] text-[14px] px-[15px] rounded-[20px] hover:bg-violet-400">
                        <FiPlus className="h-[16px] w-[16px] " />{" "}
                        <span className="mt-[3px]">Tambah</span>
                    </button>
                    <TableTeacher />
                </div>
            </div>
        </div>
    );
}

Setting.layout = (page) => <Layout children={page} title="Welcome" />;

export default Setting;
