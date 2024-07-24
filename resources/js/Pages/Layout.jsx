import React from "react";
import { Button, Card, Navigation } from "../components/ui/index";

export default function Layout({ children }) {
    return (
        <>
            <main className="flex">{children}</main>
            <Navigation />
        </>
    );
}
