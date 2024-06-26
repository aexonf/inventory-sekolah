import React from "react";
import { Home, User, History } from "lucide-react";
import { Link, usePage } from "@inertiajs/inertia-react";

const navigationItem = [
    {
        name: "Home",
        url: "/",
        icon: <Home size={21} />,
    },
    {
        name: "History",
        url: "/history",
        icon: <History size={21} />,
    },
    {
        name: "Profile",
        url: "/profile",
        icon: <User size={21} />,
    },
];

export function Navigation() {
    const pathname = usePage();

    return (
        <nav className="fixed bottom-0 w-[100%] pt-[5px] bg-white">
            <div className="w-full flex gap-[50px] justify-center bg-primary-low items-center max-w-[420px] px-[41px] mx-auto">
                {navigationItem.map((item, index) => (
                    <Link
                        key={index}
                        href={item.url}
                        className="w-[64px] pt-[10px] pb-[5px]"
                    >
                        <div
                            className={`${
                                pathname.url === item.url ? "bg-active/10" : ""
                            } w-full flex justify-center py-[5px] rounded-[50px]`}
                        >
                            {item.icon}
                        </div>
                        <p className="text-[14px] text-center leading-none mt-[8px]">
                            {item.name}
                        </p>
                    </Link>
                ))}
            </div>
        </nav>
    );
}
