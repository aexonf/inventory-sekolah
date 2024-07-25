import React, { useState, useEffect } from "react";
import { Button, Card, Navigation } from "../components/ui/index";
import { Inertia } from "@inertiajs/inertia";
import axios from "axios";
import Cookies from "js-cookie";

export default function Layout({ children }) {
    const [isLoading, setIsLoading] = useState(false);
    const [verifyLoading, setIsVerifyLoading] = useState(true);
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
            setIsLoading(false);
            if (error.response.data.message) {
                Inertia.visit("/login");
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
        <>
            <main className="flex">{children}</main>
            <Navigation />
        </>
    );
}
