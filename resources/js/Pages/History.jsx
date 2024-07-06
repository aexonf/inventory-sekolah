import React, { useState, useEffect } from "react";
import {
    Navigation,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../components/ui";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";
import Cookies from "js-cookie";
import { Header, HistoryCard } from "../components/section/index";
import { History as HistoryIcon } from "lucide-react";

const dummyData = [
    {
        id: 4,
        name: "Bahasa Indonesia",
        description_item:
            "Buku ini adalah buku yang berisi tata cara  untuk belajar bahasa Indonesia dengan baik dan benar dan sopan dan bagus",
        category: "Book",
        loan_date: "2024-06-27 07:23:13",
        return_date: null,
        status: "borrowed",
    },
    {
        id: 4,
        name: "Bahasa Inggris",
        description_item:
            "Buku ini adalah buku yang berisi tata cara  untuk belajar bahasa Inggris dengan baik dan benar dan sopan dan bagus",
        category: "Book",
        loan_date: "2024-06-27 07:23:13",
        return_date: null,
        status: "returned",
    },
    {
        id: 4,
        name: "Bahasa Inggris",
        description_item:
            "Buku ini adalah buku yang berisi tata cara  untuk belajar bahasa Inggris dengan baik dan benar dan sopan dan bagus",
        category: "Book",
        loan_date: "2024-06-27 07:23:13",
        return_date: null,
        status: "returned",
    },
    {
        id: 4,
        name: "Bahasa Inggris",
        description_item:
            "Buku ini adalah buku yang berisi tata cara  untuk belajar bahasa Inggris dengan baik dan benar dan sopan dan bagus",
        category: "Book",
        loan_date: "2024-06-27 07:23:13",
        return_date: null,
        status: "returned",
    },
    {
        id: 4,
        name: "Bahasa Asing",
        description_item:
            "Buku ini adalah buku yang berisi tata cara  untuk belajar bahasa Inggris dengan baik dan benar dan sopan dan bagus",
        category: "Book",
        loan_date: "2024-06-27 07:23:13",
        return_date: null,
        status: "returned",
    },
    {
        id: 4,
        name: "Bahasa Asing",
        description_item:
            "Buku ini adalah buku yang berisi tata cara  untuk belajar bahasa Inggris dengan baik dan benar dan sopan dan bagus",
        category: "Book",
        loan_date: "2024-06-27 07:23:13",
        return_date: null,
        status: "borrowed",
    },
];

export default function History() {
    const [isVerifyUser, setIsVerifyUser] = useState(true);
    const inventoryToken = Cookies.get("inventory_token");
    const [history, setHistory] = useState([]);

    const verifyUser = async () => {
        setIsVerifyUser(true);
        try {
            const { data: getUser } = await axios("/api/v1/history", {
                headers: {
                    Authorization: `Bearer ${inventoryToken}`,
                },
            });

            setIsVerifyUser(false);

            setHistory(getUser.data.items);
        } catch (error) {
            console.log(error);
            if (error.response.data.message === "Unauthenticated.") {
                Inertia.visit("/login");
                setIsVerifyUser(false);
                return;
            }
        }
    };

    useEffect(() => {
        verifyUser();
    }, []);

    return (
        <>
            {!isVerifyUser && (
                <>
                    <main className="h-auto w-full max-w-[420px] mx-auto pb-[0px]">
                        <Header title={"History"} />
                        <Tabs
                            defaultValue="borrowed"
                            className="w-[100%] flex flex-col items-center mt-[20px]"
                        >
                            <TabsList>
                                <TabsTrigger value="borrowed">
                                    Borrowed
                                </TabsTrigger>
                                <TabsTrigger value="returned">
                                    Returned
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent className="w-full" value="borrowed">
                                <div className="w-full flex flex-col gap-4 px-[20px] pb-[0] max-h-[60vh] overflow-auto">
                                    {history.length === 0 ? (
                                        <EmptyHistory />
                                    ) : (
                                        <>
                                            {history.map((item, index) => (
                                                <>
                                                    {item.status ===
                                                    "borrowed" ? (
                                                        <HistoryCard
                                                            key={index}
                                                            id={item.id}
                                                            name={item.name}
                                                            description_item={
                                                                item.description_item
                                                            }
                                                            category={
                                                                item.category
                                                            }
                                                            loan_date={
                                                                item.loan_date
                                                            }
                                                            return_date={
                                                                item.return_date
                                                            }
                                                            status={item.status}
                                                        />
                                                    ) : null}
                                                </>
                                            ))}
                                        </>
                                    )}
                                </div>
                            </TabsContent>
                            <TabsContent className="w-full" value="returned">
                                <div className="w-full flex flex-col gap-4 px-[20px] pb-[0] max-h-[66vh] overflow-auto">
                                    {history.length === 0 ? (
                                        <EmptyHistory />
                                    ) : (
                                        <>
                                            {history.map((item, index) => (
                                                <>
                                                    {item.status ===
                                                    "returned" ? (
                                                        <HistoryCard
                                                            key={index}
                                                            id={item.id}
                                                            name={item.name}
                                                            description_item={
                                                                item.description_item
                                                            }
                                                            category={
                                                                item.category
                                                            }
                                                            loan_date={
                                                                item.loan_date
                                                            }
                                                            return_date={
                                                                item.return_date
                                                            }
                                                            status={item.status}
                                                        />
                                                    ) : null}
                                                </>
                                            ))}
                                        </>
                                    )}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </main>
                    <Navigation />
                </>
            )}
        </>
    );
}

function EmptyHistory() {
    return (
        <div className="h-[70vh] flex justify-center items-center w-full">
            <div className="flex flex-col items-center gap-2">
                <HistoryIcon className="h-[50px] w-[50px]" />
                <h1>Your history is empty</h1>
            </div>
        </div>
    );
}
