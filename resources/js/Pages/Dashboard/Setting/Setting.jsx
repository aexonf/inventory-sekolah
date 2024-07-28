import React from "react";
import Layout from "../Layout";

function Setting() {
    return (
        <div className="relative w-full">
            <div className="absolute top-[-40px] w-full px-[20px]">
                <div className="bg-white shadow-[3px_3px_20px_-2px_#00000024]  py-[20px] rounded-md px-[20px]">
                    <h1 className="text-[20px]">Setting</h1>
                </div>
            </div>
            <div className="pt-[70px] px-[20px]">
                <div className="py-[20px] px-[20px] shadow-[5px_5px_30px_-5px_#00000024]">
                    <h1 className="text-violet-600 font-semibold">
                        Informasi Sekolah
                    </h1>

                    <div className="flex flex-col mt-[50px] gap-5">
                        <label className="flex justify-between" htmlFor="years">
                            <span className="w-[40%] text-[13px]">
                                Tahun Pelajaran
                                <span className="text-red-500">*</span>
                            </span>

                            <input
                                className="rounded-sm border-gray-300 py-[5px] border-[1px] border-solid flex-grow"
                                type="text"
                            />
                        </label>

                        <label className="flex justify-between" htmlFor="years">
                            <span className="w-[40%] text-[13px]">
                                Tahun Pelajaran
                                <span className="text-red-500">*</span>
                            </span>

                            <input
                                className="rounded-sm border-gray-300 py-[5px] border-[1px] border-solid flex-grow"
                                type="text"
                            />
                        </label>

                        <div className="w-full flex justify-end text-white mt-[30px]">
                            <button className="bg-violet-600 text-[13px] py-[7px] px-[13px] rounded-md font-semibold">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Setting.layout = (page) => <Layout children={page} title="Welcome" />;

export default Setting;
