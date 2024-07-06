import React from "react";
import { Link } from "@inertiajs/inertia-react";
import { TiHome } from "react-icons/ti";
import { IoSettingsSharp } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { FaUserAlt, FaUsers } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { FaQrcode } from "react-icons/fa6";
import { useState } from "react";
import { LuChevronsLeft, LuChevronsRight } from "react-icons/lu";

export function Navigation() {
    const [iconMode, setIconMode] = useState(false);

    return (
        <nav
            className={`${
                iconMode ? "w-[100px]" : "w-[250px]"
            } transition-all duration-300 border-r-[1px] border-solid overflow-hidden border-neutral-300 h-screen pt-[20px]`}
        >
            <div className="flex justify-center">
                <h1 className="text-[18px]">Inventory</h1>
            </div>
            <div
                className={`px-[20px] flex items-center mt-[20px] ${
                    iconMode ? "justify-center" : "justify-between"
                }`}
            >
                {iconMode ? (
                    ""
                ) : (
                    <h1 className="text-slate-500 text-[15px]">Dashboard</h1>
                )}
                <button onClick={() => setIconMode(!iconMode)}>
                    {iconMode ? (
                        <LuChevronsRight className="h-[19px] w-[19px]" />
                    ) : (
                        <LuChevronsLeft className="h-[19px] w-[19px]" />
                    )}
                </button>
            </div>
            <div
                className={`mt-[25px] flex flex-col gap-5 ${
                    iconMode ? "items-center" : ""
                }`}
            >
                <div
                    className={`${
                        iconMode
                            ? ""
                            : "border-l-4 border-solid border-violet-400 pl-[20px]"
                    }  flex items-center gap-5 `}
                >
                    <div
                        className={`${
                            iconMode
                                ? "py-[10px] px-[10px] bg-violet-500 rounded-md"
                                : ""
                        }`}
                    >
                        <TiHome
                            className={`h-[19px] w-[19px] ${
                                iconMode ? "text-white" : "text-violet-500"
                            }`}
                        />
                    </div>
                    {iconMode ? (
                        ""
                    ) : (
                        <h1 className="mt-[4px] text-violet-500 font-semibold text-[15px]">
                            Dashboard
                        </h1>
                    )}
                </div>
                <div
                    className={`${
                        iconMode ? "" : "pl-[20px]"
                    }  flex items-center gap-5 `}
                >
                    <div
                        className={`${
                            iconMode
                                ? "py-[10px] px-[10px] bg-slate-200 rounded-md"
                                : ""
                        }`}
                    >
                        {" "}
                        <IoSettingsSharp
                            className={` ${
                                iconMode ? "text-slate-500" : "text-slate-500"
                            } h-[19px] w-[19px]`}
                        />
                    </div>
                    {iconMode ? (
                        ""
                    ) : (
                        <h1 className="text-slate-500 mt-[4px] text-[15px]">
                            Setting
                        </h1>
                    )}
                </div>
                <div
                    className={`${
                        iconMode ? "" : "pl-[20px]"
                    }  flex items-center gap-5 `}
                >
                    <div
                        className={`${
                            iconMode
                                ? "py-[10px] px-[10px] bg-slate-200 rounded-md"
                                : ""
                        }`}
                    >
                        {" "}
                        <IoMdNotifications
                            className={` ${
                                iconMode ? "text-slate-500" : "text-slate-500"
                            } h-[19px] w-[19px]`}
                        />
                    </div>
                    {iconMode ? (
                        ""
                    ) : (
                        <h1 className="text-slate-500 mt-[4px] text-[15px]">
                            Notification
                        </h1>
                    )}
                </div>
                <div
                    className={`${
                        iconMode ? "" : "pl-[20px]"
                    }  flex items-center gap-5 `}
                >
                    <div
                        className={`${
                            iconMode
                                ? "py-[10px] px-[10px] bg-slate-200 rounded-md"
                                : ""
                        }`}
                    >
                        {" "}
                        <FaUsers
                            className={` ${
                                iconMode ? "text-slate-500" : "text-slate-500"
                            } h-[19px] w-[19px]`}
                        />
                    </div>
                    {iconMode ? (
                        ""
                    ) : (
                        <h1 className="text-slate-500 mt-[4px] text-[15px]">
                            Siswa
                        </h1>
                    )}
                </div>
                <div
                    className={`${
                        iconMode ? "" : "pl-[20px]"
                    }  flex items-center gap-5 `}
                >
                    <div
                        className={`${
                            iconMode
                                ? "py-[10px] px-[10px] bg-slate-200 rounded-md"
                                : ""
                        }`}
                    >
                        {" "}
                        <FaUserAlt
                            className={` ${
                                iconMode ? "text-slate-500" : "text-slate-500"
                            } h-[19px] w-[19px]`}
                        />
                    </div>
                    {iconMode ? (
                        ""
                    ) : (
                        <h1 className="text-slate-500 mt-[4px] text-[15px]">
                            Guru
                        </h1>
                    )}
                </div>
                <div
                    className={`${
                        iconMode ? "" : "pl-[20px]"
                    }  flex items-center gap-5 `}
                >
                    <div
                        className={`${
                            iconMode
                                ? "py-[10px] px-[10px] bg-slate-200 rounded-md"
                                : ""
                        }`}
                    >
                        {" "}
                        <BiSolidCategory
                            className={` ${
                                iconMode ? "text-slate-500" : "text-slate-500"
                            } h-[19px] w-[19px]`}
                        />
                    </div>
                    {iconMode ? (
                        ""
                    ) : (
                        <h1 className="text-slate-500 mt-[4px] text-[15px]">
                            Item & Category
                        </h1>
                    )}
                </div>
                <div
                    className={`${
                        iconMode ? "" : "pl-[20px]"
                    }  flex items-center gap-5 `}
                >
                    <div
                        className={`${
                            iconMode
                                ? "py-[10px] px-[10px] bg-slate-200 rounded-md"
                                : ""
                        }`}
                    >
                        {" "}
                        <FaQrcode
                            className={` ${
                                iconMode ? "text-slate-500" : "text-slate-500"
                            } h-[19px] w-[19px]`}
                        />
                    </div>
                    {iconMode ? (
                        ""
                    ) : (
                        <h1 className="text-slate-500 mt-[4px] text-[15px]">
                            QR Scan
                        </h1>
                    )}
                </div>
            </div>
        </nav>
    );
}
