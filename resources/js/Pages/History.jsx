import React from "react";
import { Navigation } from "../components/ui/navigation";

const dummyData = [
    {
        title: "Buku Bahasa Indonesia",
        date: "20/06/2024",
        total: 2,
    },
    {
        title: "Buku Sejarah Indonesia",
        date: "10/06/2024",
        total: 100,
    },
    {
        title: "Buku Negara Indonesia",
        date: "01/06/2024",
        total: 10,
    },
    {
        title: "Buku Bangsa Indonesia",
        date: "20/06/2024",
        total: 1000,
    },
    {
        title: "Buku Bangsa Indonesia",
        date: "20/06/2024",
        total: 1000,
    },
    {
        title: "Buku Bangsa Indonesia",
        date: "20/06/2024",
        total: 1000,
    },
    {
        title: "Buku Bangsa Indonesia",
        date: "20/06/2024",
        total: 1000,
    },
    {
        title: "Buku Bangsa Indonesia",
        date: "20/06/2024",
        total: 1000,
    },
    {
        title: "Buku Bangsa Indonesia",
        date: "20/06/2024",
        total: 1000,
    },
    {
        title: "Buku Bangsa Indonesia",
        date: "20/06/2024",
        total: 1000,
    },
    {
        title: "Buku Bangsa Indonesia",
        date: "20/06/2024",
        total: 1000,
    },
];

export default function History() {
    return (
        <>
            <main className="h-screen w-full max-w-[420px] mx-auto pb-[110px]">
                <div className="px-[25px] flex items-center bg-primary-low gap-1 py-[20px]">
                    <h1 className="flex flex-col justify-center font-semibold leading-[17px] text-[20px]">
                        History
                    </h1>
                </div>
                <div className="mt-[30px] flex flex-col gap-4 px-[20px] pb-[100px]">
                    {dummyData.map((item, index) => (
                        <div
                            className="bg-[#E1D6FF] w-full bg-opacity-[25%] rounded-md px-[25px] py-[15px]"
                            key={index}
                        >
                            <div className="flex justify-between items-center">
                                <h1 className="font-medium text-[17px]">
                                    {item.title}
                                </h1>
                                <p className="text-[13px]">{item.date}</p>
                            </div>
                            <p className="text-[13px] mt-[4px]">
                                Jumlah Pinjaman: {item.total}
                            </p>
                        </div>
                    ))}
                </div>
            </main>
            <Navigation />
        </>
    );
}
