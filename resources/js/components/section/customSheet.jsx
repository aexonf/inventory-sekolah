import React from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../ui/index.js";
import { RxHamburgerMenu } from "react-icons/rx";
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

export function CustomSheet() {
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
        <Sheet>
            <SheetTrigger className="max-[1000px]:block hidden">
                <RxHamburgerMenu className="h-[25px] w-[25px] text-white" />
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-auto">
                {/* <h1>Halo</h1> */}
                <nav
                    className={`${
                        iconMode ? "w-[100px]" : "w-[300px]"
                    } sticky top-0 block min-[1000px]:hidden transition-all duration-300 shadow-[5px_0px_10px_-5px_#00000024] overflow-auto  h-screen pt-[20px]`}
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
                            <div
                                className={`${HandleIconColor("/test-admin")}`}
                            >
                                <TiHome className={`h-[19px] w-[19px]`} />
                            </div>
                            {!iconMode && (
                                <h1 className="mt-[4px] text-[15px]">
                                    Dashboard
                                </h1>
                            )}
                        </Link>
                        <Link
                            href="/test-admin/setting"
                            className={`${HandleActivePath(
                                "/test-admin/setting"
                            )}  flex items-center gap-5 `}
                        >
                            <div
                                className={`${HandleIconColor(
                                    "/test-admin/setting"
                                )}
                        }`}
                            >
                                <IoSettingsSharp
                                    className={` h-[19px] w-[19px]`}
                                />
                            </div>
                            {!iconMode && (
                                <h1 className="mt-[4px] text-[15px]">
                                    Setting
                                </h1>
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
                                <IoMdNotifications
                                    className={` h-[19px] w-[19px]`}
                                />
                            </div>
                            {!iconMode && (
                                <h1 className="mt-[4px] text-[15px]">
                                    Notification
                                </h1>
                            )}
                        </Link>
                        <div>
                            <div
                                onClick={() => HandleOpenSubMenu("student")}
                                className={`cursor-pointer  ${HandleSubMenuWrapper(
                                    "link",
                                    "/test-admin/student",
                                    "/test-admin/active-student"
                                )}`}
                            >
                                <div className="flex items-center gap-5">
                                    <div
                                        className={`${
                                            iconMode
                                                ? " bg-slate-200 rounded-md"
                                                : ""
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
                                                <PopoverContent className="right-[-160px] top-[-44px] flex flex-col py-[5px] w-max">
                                                    <Link
                                                        href="/test-admin/student"
                                                        className={`${HandleActiveSubMenu(
                                                            "/test-admin/student"
                                                        )}`}
                                                    >
                                                        Student
                                                    </Link>
                                                    <Link
                                                        href="/test-admin/active-student"
                                                        className={`${HandleActiveSubMenu(
                                                            "/test-admin/active-student"
                                                        )}`}
                                                    >
                                                        Active Student
                                                    </Link>
                                                </PopoverContent>
                                            </Popover>
                                        ) : (
                                            <FaUsers
                                                className={`h-[19px] w-[19px]`}
                                            />
                                        )}
                                    </div>
                                    {iconMode ? (
                                        ""
                                    ) : (
                                        <h1 className="mt-[4px] text-[15px]">
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
                                    } overflow-hidden transition-all duration-300 flex flex-col gap-3 ml-[60px]`}
                                >
                                    <Link
                                        href="/test-admin/student"
                                        className={`${HandleActiveSubMenu(
                                            "/test-admin/student"
                                        )}`}
                                    >
                                        Student
                                    </Link>
                                    <Link
                                        href="/test-admin/active-student"
                                        className={`${HandleActiveSubMenu(
                                            "/test-admin/active-student"
                                        )}`}
                                    >
                                        Active Student
                                    </Link>
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
                                className={`${HandleIconColor(
                                    "/test-admin/teacher"
                                )}
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
                                onClick={() =>
                                    HandleOpenSubMenu("category & item")
                                }
                                className={`cursor-pointer ${HandleSubMenuWrapper(
                                    "link",
                                    "/test-admin/item",
                                    "/test-admin/category"
                                )}`}
                            >
                                <div className="flex items-center gap-5">
                                    <div
                                        className={`${
                                            iconMode
                                                ? " bg-slate-200 rounded-md"
                                                : ""
                                        }`}
                                    >
                                        {iconMode ? (
                                            <Popover>
                                                <PopoverTrigger
                                                    className={`${HandleSubMenuWrapper(
                                                        "icon",
                                                        "/test-admin/item",
                                                        "/test-admin/category"
                                                    )}`}
                                                >
                                                    <BiSolidCategory
                                                        className={`h-[19px] w-[19px]`}
                                                    />
                                                </PopoverTrigger>
                                                <PopoverContent className="right-[-120px] top-[-44px] flex flex-col py-[5px] w-max">
                                                    <Link
                                                        href="/test-admin/item"
                                                        className={`${HandleActiveSubMenu(
                                                            "/test-admin/item"
                                                        )}`}
                                                    >
                                                        Item
                                                    </Link>
                                                    <Link
                                                        href="/test-admin/category"
                                                        className={`${HandleActiveSubMenu(
                                                            "/test-admin/category"
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
                                            openSubMenu.menuName ===
                                                "category & item"
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
                                        openSubMenu.menuName ===
                                            "category & item" &&
                                        openSubMenu.open
                                            ? "h-[65px] mt-[5px]"
                                            : "h-0"
                                    } overflow-hidden transition-all duration-300 flex flex-col gap-3 ml-[60px]`}
                                >
                                    <Link
                                        href="/test-admin/item"
                                        className={`${HandleActiveSubMenu(
                                            "/test-admin/item"
                                        )}`}
                                    >
                                        Item
                                    </Link>
                                    <Link
                                        href="/test-admin/category"
                                        className={`${HandleActiveSubMenu(
                                            "/test-admin/category"
                                        )}`}
                                    >
                                        Category
                                    </Link>
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
                                className={`${HandleIconColor(
                                    "/test-admin/qr-scan"
                                )}
                        }`}
                            >
                                <FaQrcode lassName={` h-[19px] w-[19px]`} />
                            </div>
                            {!iconMode && (
                                <h1 className="mt-[4px] text-[15px]">
                                    QR Scan
                                </h1>
                            )}
                        </Link>
                    </div>
                </nav>
            </SheetContent>
        </Sheet>
    );
}
