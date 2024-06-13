import React from "react";
import { Navigation } from "../components/ui/navigation";

export default function History() {
    return (
        <>
            <main className="h-screen w-full max-w-[420px] mx-auto pb-[110px]">
                <div className="px-[17px] flex items-center bg-primary-low gap-1 py-[20px]">
                    <h1 className="flex flex-col justify-center font-bold leading-[17px]">
                        History
                    </h1>
                </div>
            </main>
            <Navigation />
        </>
    );
}
