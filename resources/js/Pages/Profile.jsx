import React, { useState, useEffect } from "react";
import { Navigation } from "../components/ui/navigation";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";
import Cookies from "js-cookie";
import { Header } from "../components/section/index";
import { Mail, Phone, BookOpen, GraduationCap, MapPin } from "lucide-react";

export default function History() {
    const [isVerifyUser, setIsVerifyUser] = useState(true);
    const inventoryToken = Cookies.get("inventory_token");

    const verifyUser = async () => {
        setIsVerifyUser(true);
        try {
            const getUser = await axios("/api/user", {
                headers: {
                    Authorization: `Bearer ${inventoryToken}`,
                },
            });

            setIsVerifyUser(false);
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
                    {" "}
                    <main className="h-screen w-full max-w-[420px] mx-auto pb-[110px]">
                        {/* <div className="px-[25px] flex items-center bg-primary-low gap-1 py-[20px] justify-between">
                            <h1 className="flex flex-col justify-center font-semibold leading-[17px] text-[20px]">
                                History
                            </h1>
                            <button
                                onClick={() => {
                                    Cookies.remove("inventory_token");
                                    Inertia.visit("/");
                                }}
                            >
                                Logout
                            </button>
                        </div> */}
                        <Header title={"Profile"} profilePage={true} />
                        <div className="mt-[40px] pb-[100px]">
                            <div className="flex flex-col items-center">
                                <div className="bg-[#4600FF] bg-opacity-[10%] flex justify-center items-center h-[70px] w-[70px] rounded-full p-0">
                                    <h1 className="text-[30px] pt-[4px] text-center leading-none">
                                        JD
                                    </h1>
                                </div>
                                <h1 className="text-[20px] font-[500] mt-[8px]">
                                    John Doe
                                </h1>
                            </div>

                            <div className="mt-[40px] flex flex-col gap-[21px] px-[30px]">
                                <div>
                                    <h1 className="text-[14px] text-[#6F6F6F]">
                                        Email
                                    </h1>
                                    <div className="bg-[#F4F0FF] rounded-sm flex items-center justify-between py-[7px] px-[17px]">
                                        <p>johndoe@gmail.com</p>

                                        <Mail size={19} />
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-[14px] text-[#6F6F6F]">
                                        Phone Number
                                    </h1>
                                    <div className="bg-[#F4F0FF] rounded-sm flex items-center justify-between py-[7px] px-[17px]">
                                        <p>012345678899</p>

                                        <Phone size={19} />
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-[14px] text-[#6F6F6F]">
                                        Class
                                    </h1>
                                    <div className="bg-[#F4F0FF] rounded-sm flex items-center justify-between py-[7px] px-[17px]">
                                        <p>PPLG XI</p>

                                        <BookOpen size={19} />
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-[14px] text-[#6F6F6F]">
                                        School Year
                                    </h1>
                                    <div className="bg-[#F4F0FF] rounded-sm flex items-center justify-between py-[7px] px-[17px]">
                                        <p>2024</p>

                                        <GraduationCap size={19} />
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-[14px] text-[#6F6F6F]">
                                        Address
                                    </h1>
                                    <div className="bg-[#F4F0FF] rounded-sm flex items-start justify-between py-[7px] px-[17px]">
                                        <p>
                                            Jetis RT 03/RW 100, Sukoharjo, Jawa
                                            Tengah, Indonesia
                                        </p>

                                        <MapPin size={21} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                    <Navigation />
                </>
            )}
        </>
    );
}
