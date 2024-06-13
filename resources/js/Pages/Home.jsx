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
        height: "360px",
        width: "100%",
        objectFit: "cover",
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
                        ? "w-[346px] h-[466px] justify-between px-[20px]"
                        : "w-[240px] h-[331px] px-[39px]"
                } transition-all duration-150 flex flex-col items-center  rounded-[10px] py-[20px] bg-[#F7F4FF]`}
            >
                {isScannerOpen && result === "" ? (
                    <div className="w-full">
                        <QrReader
                            delay={100}
                            style={previewStyle}
                            onError={handleError}
                            onScan={handleScan}
                        />
                        <Button className="mt-[23px]" onClick={toggleScanner}>
                            Cancel Scan
                        </Button>
                    </div>
                ) : result !== "" ? (
                    <div className="h-full w-full flex flex-col justify-between">
                        <p>{`${result.text}`}</p>

                        <Button className="mt-[23px]" onClick={toggleScanner}>
                            Clear Data
                        </Button>
                    </div>
                ) : (
                    <>
                        <img src={QrCodeIcon} alt="" />

                        <h2 className="font-bold text-[18px] mt-[20px]">
                            Scan QR Code
                        </h2>
                        <p className="text-[12px] mt-[9px] text-center font-bold text-[#414141]">
                            Scan QR Code to get student information
                        </p>

                        <Button className="mt-[17px]" onClick={toggleScanner}>
                            Scan QR
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;
