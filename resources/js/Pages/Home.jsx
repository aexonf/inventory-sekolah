import React, { useState, useCallback } from "react";
import { Button, Card } from "../components/ui";
import { User, ScanLine } from "lucide-react";
import { Link } from "@inertiajs/inertia-react";
import QrReader from "react-qr-scanner";
import QrCodeIcon from "../../../public/img/qr-code.svg";

const Home = () => {
    const [result, setResult] = useState("");
    const [isScannerOpen, setIsScannerOpen] = useState(false);

    const handleScan = useCallback((data) => {
        if (data) {
            setResult(data);
        }
    }, []);

    const handleError = useCallback((err) => {
        console.error(err);
    }, []);

    const previewStyle = {
        height: "340px",
        width: "266px",
        objectFit: "fill",
        borderRadius: "10px",
    };

    console.log(result);

    const toggleScanner = () => {
        setIsScannerOpen((prevState) => !prevState);
        setResult("");
    };

    return (
        <div className="h-screen flex justify-center items-center">
            <div
                className={`${
                    isScannerOpen
                        ? "w-[346px] h-[466px] justify-between"
                        : "w-[240px] h-[331px]"
                } flex flex-col items-center  rounded-[10px] py-[20px] px-[39px] bg-[#F7F4FF]`}
            >
                {isScannerOpen && result === "" ? (
                    <QrReader
                        delay={100}
                        style={previewStyle}
                        onError={handleError}
                        onScan={handleScan}
                    />
                ) : result !== "" ? (
                    <div>{result.text}</div>
                ) : (
                    <>
                        <img src={QrCodeIcon} alt="" />

                        <h2 className="font-bold text-[18px] mt-[20px]">
                            Scan QR Code
                        </h2>
                        <p className="text-[12px] mt-[9px] text-center font-bold text-[#414141]">
                            Scan QR Code to get student information
                        </p>
                    </>
                )}

                <button
                    className="mt-[23px] w-full bg-[#7B4DF6] bg-opacity-[45%] text-white font-semibold rounded-[10px] py-[10px] text-[14px]"
                    onClick={toggleScanner}
                >
                    {isScannerOpen && result === ""
                        ? "Cancel Camera"
                        : result !== ""
                        ? "Clear"
                        : "Open Camera"}
                </button>
                {isScannerOpen && <div></div>}
            </div>
            {/* <>{result}</> */}
            {/* <div className="w-[400px] py-[20px]">
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
            </div> */}
        </div>
    );
};

export default Home;
