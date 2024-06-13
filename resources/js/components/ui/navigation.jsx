import React from "react";
import { Home, Users, History } from "lucide-react";
import { Link, usePage } from "@inertiajs/inertia-react";

const navigationItem = [
    {
        name: "Home",
        url: "/",
        icon: <Home size={21} />,
    },
    {
        name: "Users",
        url: "/users",
        icon: <Users size={21} />,
    },
    {
        name: "History",
        url: "/history",
        icon: <History size={21} />,
    },
];

export function Navigation() {
    const pathname = usePage();

    return (
        <nav className="fixed bottom-0 w-[100%]">
            <div className="w-full flex justify-between bg-primary-low items-center max-w-[420px] px-[41px] mx-auto">
                {navigationItem.map((item, index) => (
                    <Link
                        key={index}
                        href={item.url}
                        className="w-[64px] py-[14px]"
                    >
                        <div
                            className={`${
                                pathname.url === item.url ? "bg-active/10" : ""
                            } w-full flex justify-center py-[5px] rounded-[50px]`}
                        >
                            {item.icon}
                        </div>
                        <p className="text-[14px] text-center mt-[4px]">
                            {item.name}
                        </p>
                    </Link>
                ))}
            </div>
        </nav>
    );
}
