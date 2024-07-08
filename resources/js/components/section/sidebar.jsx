import React from "react";
import { Link, usePage } from "@inertiajs/inertia-react";
import { TiHome } from "react-icons/ti";
import { IoSettingsSharp } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { FaUserAlt, FaUsers } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { FaQrcode } from "react-icons/fa6";
import { useState } from "react";
import { LuChevronsLeft, LuChevronsRight } from "react-icons/lu";
import { FiChevronRight } from "react-icons/fi";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/index";

export function Sidebar() {
    const pathname = usePage();
    const [iconMode, setIconMode] = useState(false);
    const [openSubMenu, setOpenSubMenu] = useState({
        open: false,
        menuName: "",
    });

    const HandleOpenSubMenu = (currentMenu) => {
        if (openSubMenu.open && openSubMenu.menuName === currentMenu) {
            setOpenSubMenu({ open: false, menuName: "" });
        } else {
            setOpenSubMenu({ open: true, menuName: currentMenu });
        }
    };

    const HandleActivePath = (url) => {
        if (iconMode && pathname.url !== url) {
            return "text-slate-500";
        } else if (!iconMode && pathname.url !== url) {
            return "border-l-4 border-solid border-white text-slate-500 pl-[20px]";
        } else if (!iconMode && pathname.url === url) {
            return "border-l-4 border-solid border-violet-400 pl-[20px] text-violet-500 pl-[20px]";
        } else if (iconMode && pathname.url === url) {
            return "text-white";
        } else {
            return "";
        }
    };

    const HandleIconColor = (url) => {
        if (url === pathname.url && iconMode) {
            return "bg-violet-500 py-[10px] px-[10px]  rounded-md";
        } else if (iconMode) {
            return "bg-slate-200 py-[10px] px-[10px]  rounded-md";
        } else {
            return "";
        }
    };

    return (
        <nav
            className={`${
                iconMode ? "w-[100px]" : "w-[300px]"
            } sticky top-0 hidden min-[1000px]:block transition-all duration-300 shadow-[5px_0px_10px_-5px_#00000024] overflow-hidden  h-screen pt-[20px]`}
        >
            <div className="flex justify-center">
                <h1 className="text-[18px]">Inventory</h1>
            </div>
            <div
                className={`px-[20px] flex items-center mt-[20px] ${
                    iconMode ? "justify-center" : "justify-between"
                }`}
            >
                <h1
                    className={`${
                        iconMode && "hidden"
                    } text-slate-500 text-[15px]`}
                >
                    Dashboard
                </h1>

                <button onClick={() => setIconMode(!iconMode)}>
                    <LuChevronsLeft
                        className={`h-[19px] w-[19px] transition-all duration-300 ${
                            iconMode && "rotate-[180deg]"
                        }`}
                    />
                </button>
            </div>
            <div
                className={`mt-[25px] flex flex-col gap-5 ${
                    iconMode && "items-center"
                }`}
            >
                <Link
                    href="/test-admin"
                    className={`${HandleActivePath(
                        "/test-admin"
                    )} flex items-center gap-5 `}
                >
                    <div className={`${HandleIconColor("/test-admin")}`}>
                        <TiHome className={`h-[19px] w-[19px]`} />
                    </div>
                    {!iconMode && (
                        <h1 className="mt-[4px] text-[15px]">Dashboard</h1>
                    )}
                </Link>
                <Link
                    href="/test-admin/setting"
                    className={`${HandleActivePath(
                        "/test-admin/setting"
                    )}  flex items-center gap-5 `}
                >
                    <div
                        className={`${HandleIconColor("/test-admin/setting")}
                        }`}
                    >
                        <IoSettingsSharp className={` h-[19px] w-[19px]`} />
                    </div>
                    {!iconMode && (
                        <h1 className="mt-[4px] text-[15px]">Setting</h1>
                    )}
                </Link>
                <Link
                    href="/test-admin/notification"
                    className={`${HandleActivePath(
                        "/test-admin/notification"
                    )}  flex items-center gap-5 `}
                >
                    <div
                        className={`${HandleIconColor(
                            "/test-admin/notification"
                        )}
                        }`}
                    >
                        <IoMdNotifications className={` h-[19px] w-[19px]`} />
                    </div>
                    {!iconMode && (
                        <h1 className="text-slate-500 mt-[4px] text-[15px]">
                            Notification
                        </h1>
                    )}
                </Link>
                <div>
                    <div
                        onClick={() => HandleOpenSubMenu("student")}
                        className={`${
                            iconMode
                                ? "justify-center"
                                : "justify-between px-[20px]"
                        }  flex items-center gap-5 `}
                    >
                        <div className="flex items-center gap-5">
                            <div
                                className={`${
                                    iconMode
                                        ? "py-[10px] px-[10px] bg-slate-200 rounded-md"
                                        : ""
                                }`}
                            >
                                {iconMode ? (
                                    <Popover>
                                        <PopoverTrigger className="h-[19px]">
                                            <FaUsers
                                                className={` ${
                                                    iconMode
                                                        ? "text-slate-500"
                                                        : "text-slate-500"
                                                } h-[19px] w-[19px]`}
                                            />
                                        </PopoverTrigger>
                                        <PopoverContent className="right-[-120px] top-[-30px] w-auto">
                                            <h1>Data</h1>
                                            <h1>Active</h1>
                                        </PopoverContent>
                                    </Popover>
                                ) : (
                                    <FaUsers
                                        className={` ${
                                            iconMode
                                                ? "text-slate-500"
                                                : "text-slate-500"
                                        } h-[19px] w-[19px]`}
                                    />
                                )}
                            </div>
                            {iconMode ? (
                                ""
                            ) : (
                                <h1 className="text-slate-500 mt-[4px] text-[15px]">
                                    Siswa
                                </h1>
                            )}
                        </div>
                        {iconMode ? (
                            ""
                        ) : (
                            <FiChevronRight
                                className={`${
                                    openSubMenu.open &&
                                    openSubMenu.menuName === "student"
                                        ? "rotate-[90deg]"
                                        : ""
                                } transition-all duration-300`}
                            />
                        )}
                    </div>
                    {iconMode ? (
                        ""
                    ) : (
                        <div
                            className={`${
                                openSubMenu.menuName === "student" &&
                                openSubMenu.open
                                    ? "h-[65px] mt-[5px]"
                                    : "h-0"
                            } overflow-hidden transition-all duration-500 flex flex-col gap-3 ml-[60px]`}
                        >
                            <h1 className="text-slate-500 mt-[4px] text-[15px]">
                                Aktif
                            </h1>
                            <h1 className="text-slate-500 mt-[4px] text-[15px]">
                                Category
                            </h1>
                        </div>
                    )}
                </div>
                <Link
                    href="/test-admin/teacher"
                    className={`${HandleActivePath(
                        "/test-admin/teacher"
                    )}  flex items-center gap-5 `}
                >
                    <div
                        className={`${HandleIconColor("/test-admin/teacher")}
                        }`}
                    >
                      
                            <FaUserAlt className={` h-[19px] w-[19px]`} />
                        
                    </div>
                    {!iconMode && (
                        <h1 className="text-slate-500 mt-[4px] text-[15px]">
                            Guru
                        </h1>
                    )}
                </Link>

                <div>
                    <div
                        onClick={() => HandleOpenSubMenu("category & item")}
                        className={`${
                            iconMode
                                ? "justify-center"
                                : "justify-between px-[20px]"
                        }  flex items-center  gap-5 `}
                    >
                        <div className="flex items-center gap-5">
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
                                        iconMode
                                            ? "text-slate-500"
                                            : "text-slate-500"
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
                        {iconMode ? (
                            ""
                        ) : (
                            <FiChevronRight
                                className={`${
                                    openSubMenu.open &&
                                    openSubMenu.menuName === "category & item"
                                        ? "rotate-[90deg]"
                                        : ""
                                } transition-all duration-300`}
                            />
                        )}
                    </div>

                    {iconMode ? (
                        ""
                    ) : (
                        <div
                            className={`${
                                openSubMenu.menuName === "category & item" &&
                                openSubMenu.open
                                    ? "h-[65px] mt-[5px]"
                                    : "h-0"
                            } overflow-hidden transition-all duration-300 flex flex-col gap-3 ml-[60px]`}
                        >
                            <h1 className="text-slate-500 mt-[4px] text-[15px]">
                                Aktif
                            </h1>
                            <h1 className="text-slate-500 mt-[4px] text-[15px]">
                                Category
                            </h1>
                        </div>
                    )}
                </div>
                <Link
                    href="/test-admin/qr-scan"
                    className={`${HandleActivePath(
                        "/test-admin/qr-scan"
                    )}  flex items-center gap-5 `}
                >
                    <div
                        className={`${HandleIconColor("/test-admin/qr-scan")}
                        }`}
                    >
                        <FaQrcode lassName={` h-[19px] w-[19px]`} />
                    </div>
                    {!iconMode && (
                        <h1 className="text-slate-500 mt-[4px] text-[15px]">
                            QR Scan
                        </h1>
                    )}
                </Link>
            </div>
        </nav>
    );
}
