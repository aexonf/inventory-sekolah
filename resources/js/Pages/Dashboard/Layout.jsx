import React, { useState, useEffect } from "react";
import { Sidebar, DashboardHeader } from "../../components/section/index";
import { Inertia } from "@inertiajs/inertia";
import axios from "axios";
import Cookies from "js-cookie";

export default function Layout({ children }) {
    const [isLoading, setIsLoading] = useState(false);
    const [verifyLoading, setIsVerifyLoading] = useState(false);
    const [checkRole, setCheckRole] = useState(false);
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
            }
            setCheckRole(true);
        } catch (error) {
            setCheckRole(true);
            if (error.response.data.message) {
                if (checkRole) {
                    Inertia.visit("/login");
                }
                setIsVerifyLoading(true);
                return;
            }
        }
    };

    useEffect(() => {
        if (checkRole === false) {
            checkingRole();
        }
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
