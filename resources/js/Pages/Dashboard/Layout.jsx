import React from "react";
import { Sidebar, DashboardHeader } from "../../components/section/index";

export default function Layout({ children }) {
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
