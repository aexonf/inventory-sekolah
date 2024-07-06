import { Link } from "@inertiajs/react";
import React from "react";
import { Navigation } from "../components/section/index";

export default function Layout({ children }) {
    return (
        <main>
            <Navigation />
            <div>{children}</div>
        </main>
    );
}
