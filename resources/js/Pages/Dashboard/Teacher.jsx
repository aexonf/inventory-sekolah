import React from "react";
import Layout from "./Layout";

function Teacher() {
    return (
        <div className="mb-[1000px] relative w-full">
            <div className="absolute top-[-40px] w-full px-[20px]">
                <div className="bg-white shadow-[3px_3px_20px_-2px_#00000024]  py-[20px] rounded-md px-[20px]">
                    <h1 className="text-[20px]">Teacher</h1>
                </div>
            </div>
        </div>
    );
}

Teacher.layout = (page) => <Layout children={page} title="Welcome" />;

export default Teacher;
