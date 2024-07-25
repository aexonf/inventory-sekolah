import React, { useState, useEffect } from "react";
import { Sidebar, DashboardHeader } from "../../components/section/index";
import { Inertia } from "@inertiajs/inertia";
import axios from "axios";
import Cookies from "js-cookie";

export default function Layout({ children }) {
    const [isLoading, setIsLoading] = useState(false);
    const [verifyLoading, setIsVerifyLoading] = useState(true);
    const inventoryToken = Cookies.get("inventory_token");

    const checkingRole = async () => {
        setIsLoading(true);
        try {
            const { data: getUser } = await axios.get("/api/user", {
                headers: {
                    Authorization: `Bearer ${inventoryToken}`,
                },
            });

            const role = getUser.role;
            if (role === "student") {
                setIsLoading(false);
                Inertia.visit("/");
            } else if (role === "teacher" || role === "admin") {
                setIsLoading(false);
                Inertia.visit("/test-admin");
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };

    useEffect(() => {
        checkingRole();
    }, []);

    return (
        <main className="flex">
            <Sidebar />
            <div className="w-full">
                <DashboardHeader />
                {children}
            </div>
        </main>
    );
}
