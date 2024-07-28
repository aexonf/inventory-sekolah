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
import { FiChevronRight, FiBox } from "react-icons/fi";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/index";
import { PiUserCircleDashedFill } from "react-icons/pi";

export function Sidebar() {
    const pathname = usePage();
    const [iconMode, setIconMode] = useState(false);
    const [openSubMenu, setOpenSubMenu] = useState({
        open: false,
        menuName: "",
    });

    const HandleActiveSubMenu = (url) => {
        if (url === pathname.url) {
            return "text-violet-500 mt-[4px] text-[15px]";
        } else {
            return "text-slate-500 mt-[4px] text-[15px]";
        }
    };

    const HandleSubMenuWrapper = (type, firstUrl, secondUrl) => {
        switch (type) {
            case "link":
                if (
                    (firstUrl === pathname.url || secondUrl === pathname.url) &&
                    !iconMode
                ) {
                    return "text-violet-500 justify-between px-[20px] flex items-center gap-5 border-solid border-l-4 border-violet-400";
                } else {
                    return "text-slate-500 justify-between px-[20px] flex items-center gap-5 border-solid border-l-4 border-white";
                }

            case "icon":
                if (
                    (firstUrl === pathname.url || secondUrl === pathname.url) &&
                    iconMode
                ) {
                    return "h-full p-[10px] bg-violet-500 text-white rounded-md";
                } else {
                    return "h-full p-[10px] bg-slate-200 text-slate-500 rounded-md";
                }
            default:
                break;
        }
    };

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
            } sticky top-0 hidden min-[1000px]:block transition-all duration-300 shadow-[5px_0px_10px_-5px_#00000024] overflow-auto h-screen pt-[20px]`}
        >
            <div className="flex justify-center text-violet-700 font-medium gap-1 items-center">
                <FiBox
                    className={`${
                        iconMode ? "h-[25px] w-[25px]" : "h-[19px] w-[19px]"
                    }`}
                />
                {iconMode ? null : (
                    <h1 className="text-[18px] mt-[5px]">Inventory</h1>
                )}
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
                    href="/dashboard"
                    className={`${HandleActivePath(
                        "/dashboard"
                    )} flex items-center gap-5 `}
                >
                    <div className={`${HandleIconColor("/dashboard")}`}>
                        <TiHome className={`h-[19px] w-[19px]`} />
                    </div>
                    {!iconMode && (
                        <h1 className="mt-[4px] text-[15px]">Dashboard</h1>
                    )}
                </Link>
                {/* <Link
                    href="/dashboard/setting"
                    className={`${HandleActivePath(
                        "/dashboard/setting"
                    )}  flex items-center gap-5 `}
                >
                    <div
                        className={`${HandleIconColor("/dashboard/setting")}
                        }`}
                    >
                        <IoSettingsSharp className={` h-[19px] w-[19px]`} />
                    </div>
                    {!iconMode && (
                        <h1 className="mt-[4px] text-[15px]">Setting</h1>
                    )}
                </Link> */}
                <Link
                    href="/dashboard/notification"
                    className={`${HandleActivePath(
                        "/dashboard/notification"
                    )}  flex items-center gap-5 `}
                >
                    <div
                        className={`${HandleIconColor(
                            "/dashboard/notification"
                        )}
                        }`}
                    >
                        <IoMdNotifications className={` h-[19px] w-[19px]`} />
                    </div>
                    {!iconMode && (
                        <h1 className="mt-[4px] text-[15px]">Notification</h1>
                    )}
                </Link>

                <Link
                    href="/dashboard/temporary"
                    className={`${HandleActivePath(
                        "/dashboard/temporary"
                    )}  flex items-center gap-5 `}
                >
                    <div
                        className={`${HandleIconColor("/dashboard/temporary")}
                        }`}
                    >
                        <PiUserCircleDashedFill
                            className={` h-[19px] w-[19px]`}
                        />
                    </div>
                    {!iconMode && (
                        <h1 className="mt-[4px] text-[15px]">Temporary</h1>
                    )}
                </Link>
                <div>
                    <div
                        onClick={() => HandleOpenSubMenu("student")}
                        className={`cursor-pointer  ${HandleSubMenuWrapper(
                            "link",
                            "/dashboard/student",
                            "/dashboard/active-student"
                        )}`}
                    >
                        <div className="flex items-center gap-5">
                            <div
                                className={`${
                                    iconMode ? " bg-slate-200 rounded-md" : ""
                                }`}
                            >
                                {iconMode ? (
                                    <Popover>
                                        <PopoverTrigger
                                            className={`${HandleSubMenuWrapper(
                                                "icon",
                                                "/dashboard/student",
                                                "/dashboard/active-student"
                                            )}`}
                                        >
                                            <FaUsers
                                                className={`h-[19px] w-[19px]`}
                                            />
                                        </PopoverTrigger>
                                        <PopoverContent className="right-[-160px] top-[-44px] flex flex-col py-[5px] w-max">
                                            <Link
                                                href="/dashboard/student"
                                                className={`${HandleActiveSubMenu(
                                                    "/dashboard/student"
                                                )}`}
                                            >
                                                Student
                                            </Link>
                                            <Link
                                                href="/dashboard/active-student"
                                                className={`${HandleActiveSubMenu(
                                                    "/dashboard/active-student"
                                                )}`}
                                            >
                                                Active Student
                                            </Link>
                                        </PopoverContent>
                                    </Popover>
                                ) : (
                                    <FaUsers className={`h-[19px] w-[19px]`} />
                                )}
                            </div>
                            {iconMode ? (
                                ""
                            ) : (
                                <h1 className="mt-[4px] text-[15px]">Siswa</h1>
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
                            } overflow-hidden transition-all duration-300 flex flex-col gap-3 ml-[60px]`}
                        >
                            <Link
                                href="/dashboard/student"
                                className={`${HandleActiveSubMenu(
                                    "/dashboard/student"
                                )}`}
                            >
                                Student
                            </Link>
                            <Link
                                href="/dashboard/active-student"
                                className={`${HandleActiveSubMenu(
                                    "/dashboard/active-student"
                                )}`}
                            >
                                Active Student
                            </Link>
                        </div>
                    )}
                </div>
                {/* <div>
                    <div
                        onClick={() => HandleOpenSubMenu("student")}
                        className={`cursor-pointer ${HandleSubMenuWrapper(
                            "link",
                            "/test-admin/student",
                            "/test-admin/active-student"
                        )}`}
                    >
                        <div className="flex items-center gap-5">
                            <div
                                className={`${
                                    iconMode ? "bg-slate-200 rounded-md" : ""
                                }`}
                            >
                                {iconMode ? (
                                    <Popover>
                                        <PopoverTrigger
                                            className={`${HandleSubMenuWrapper(
                                                "icon",
                                                "/test-admin/student",
                                                "/test-admin/active-student"
                                            )}`}
                                        >
                                            <FaUsers
                                                className={`h-[19px] w-[19px]`}
                                            />
                                        </PopoverTrigger>
                                        <PopoverContent className="right-[-120px] top-[-44px] flex flex-col py-[5px] w-auto">
                                            <Link
                                                href="/test-admin/student"
                                                className={`${HandleActiveSubMenu(
                                                    "/test-admin/student"
                                                )}`}
                                            >
                                                Data
                                            </Link>
                                            <Link
                                                href="/test-admin/active-student"
                                                className={`${HandleActiveSubMenu(
                                                    "/test-admin/active-student"
                                                )}`}
                                            >
                                                Aktif
                                            </Link>
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
                                <h1 className="mt-[4px] text-[15px]">Siswa</h1>
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
                            <Link
                                href="/test-admin/item"
                                className={`${HandleActiveSubMenu(
                                    "/test-admin/item"
                                )}`}
                            >
                                Student
                            </Link>
                            <Link
                                href="/test-admin/category"
                                className={`${HandleActiveSubMenu(
                                    "/test-admin/category"
                                )}`}
                            >
                                Active Student
                            </Link>
                        </div>
                    )}
                </div> */}
                <Link
                    href="/dashboard/teacher"
                    className={`${HandleActivePath(
                        "/dashboard/teacher"
                    )}  flex items-center gap-5 `}
                >
                    <div
                        className={`${HandleIconColor("/dashboard/teacher")}
                        }`}
                    >
                        <FaUserAlt className={` h-[19px] w-[19px]`} />
                    </div>
                    {!iconMode && (
                        <h1 className="mt-[4px] text-[15px]">Guru</h1>
                    )}
                </Link>

                <div>
                    <div
                        onClick={() => HandleOpenSubMenu("category & item")}
                        className={`cursor-pointer ${HandleSubMenuWrapper(
                            "link",
                            "/dashboard/item",
                            "/dashboard/category"
                        )}`}
                    >
                        <div className="flex items-center gap-5">
                            <div
                                className={`${
                                    iconMode ? " bg-slate-200 rounded-md" : ""
                                }`}
                            >
                                {iconMode ? (
                                    <Popover>
                                        <PopoverTrigger
                                            className={`${HandleSubMenuWrapper(
                                                "icon",
                                                "/dashboard/item",
                                                "/dashboard/category"
                                            )}`}
                                        >
                                            <BiSolidCategory
                                                className={`h-[19px] w-[19px]`}
                                            />
                                        </PopoverTrigger>
                                        <PopoverContent className="right-[-120px] top-[-44px] flex flex-col py-[5px] w-max">
                                            <Link
                                                href="/dashboard/item"
                                                className={`${HandleActiveSubMenu(
                                                    "/dashboard/item"
                                                )}`}
                                            >
                                                Item
                                            </Link>
                                            <Link
                                                href="/dashboard/category"
                                                className={`${HandleActiveSubMenu(
                                                    "/dashboard/category"
                                                )}`}
                                            >
                                                Category
                                            </Link>
                                        </PopoverContent>
                                    </Popover>
                                ) : (
                                    <BiSolidCategory
                                        className={`h-[19px] w-[19px]`}
                                    />
                                )}
                            </div>
                            {iconMode ? (
                                ""
                            ) : (
                                <h1 className="mt-[4px] text-[15px]">
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
                            <Link
                                href="/dashboard/item"
                                className={`${HandleActiveSubMenu(
                                    "/dashboard/item"
                                )}`}
                            >
                                Item
                            </Link>
                            <Link
                                href="/dashboard/category"
                                className={`${HandleActiveSubMenu(
                                    "/dashboard/category"
                                )}`}
                            >
                                Category
                            </Link>
                        </div>
                    )}
                </div>
                <Link
                    href="/dashboard/qr-scan"
                    className={`${HandleActivePath(
                        "/dashboard/qr-scan"
                    )}  flex items-center gap-5 `}
                >
                    <div
                        className={`${HandleIconColor("/dashboard/qr-scan")}
                        }`}
                    >
                        <FaQrcode lassName={` h-[19px] w-[19px]`} />
                    </div>
                    {!iconMode && (
                        <h1 className="mt-[4px] text-[15px]">QR Scan</h1>
                    )}
                </Link>
            </div>
        </nav>
    );
}
