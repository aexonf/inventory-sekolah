import { Link } from "@inertiajs/react";
import React from "react";
import { Navigation, DashboardHeader } from "../components/section/index";

export default function Layout({ children }) {
    return (
        <main className="flex">
            <Navigation />
            <div className="w-full">
                <DashboardHeader />
                {children}
            </div>
        </main>
    );
}
