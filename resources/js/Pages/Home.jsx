import React from "react";
import { Button, Card } from "../components/ui";
import { User, ScanLine } from "lucide-react";
import { Link } from "@inertiajs/inertia-react";

const Home = () => {
    return (
        <div className="h-screen flex justify-center">
            <div className="w-[400px] py-[20px]">
                <div className="flex items-center gap-3">
                    <div className="flex justify-center items-center h-[45px] w-[45px] border-[1px] border-solid border-neutral-800 rounded-full">
                        <User />
                    </div>
                    <h1>
                        Welcome <br /> <span>John Doe</span>
                    </h1>
                </div>

                <Card className="border-neutral-800 mt-[80px] py-[20px] px-[20px]">
                    <Link href="/detail">
                        <div className="flex justify-between">
                            <div>
                                <h1 className="font-semibold">John Doe</h1>
                                <p className="text-sm">XII RPL 100</p>
                            </div>
                            <div>
                                <p>ID: 101112131415</p>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <ScanLine size={70} />
                        </div>
                    </Link>
                </Card>
            </div>
        </div>
    );
};

export default Home;
