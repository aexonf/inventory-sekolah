import React, { useState, useCallback, useEffect } from "react";
import { Button, Card, Navigation } from "../components/ui/index";
import { CircleUserRound } from "lucide-react";
import QrReader from "react-qr-scanner";
import QrCodeIcon from "../../../public/img/qr-code.svg";
import CloseIcon from "../../../public/img/close-icon.svg";
import InformationIcon from "../../../public/img/information-icon.svg";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";

const Home = () => {
    const [result, setResult] = useState("");
    const [isScannerOpen, setIsScannerOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const handleScan = useCallback((data) => {
        if (data) {
            setAlertOpen(true);
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

    const toggleScanner = () => {
        setIsScannerOpen((prevState) => !prevState);
        setResult("");
    };

    const getData = async () => {
        setIsLoading(true);
        try {
            const getUser = await axios("/api/user");
            console.log(user);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            if (error.response.data.message === "Unauthenticated.") {
                Inertia.visit("/login");
                setTimeout(() => {}, 3000);
                return;
            }
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            {!isLoading && (
                <>
                    <main className="h-auto w-full max-w-[420px] mx-auto pb-[110px] relative">
                        <div className="px-[25px] flex items-center bg-primary-low gap-2 py-[5px]">
                            <CircleUserRound className="h-[42px] w-[42px] stroke-1" />
                            <h1 className="text-[14px] flex flex-col justify-center leading-[17px]">
                                Welcome <br />
                                <span className="font-semibold">John Doe</span>
                            </h1>
                        </div>

                        <div
                            className={`${
                                isScannerOpen
                                    ? "w-[346px] h-[466px] justify-between px-[20px]"
                                    : "w-[320px] h-[330px] px-[30px]"
                            } mt-[50px] mx-auto transition-all duration-150 flex flex-col items-center  rounded-[10px] py-[20px] bg-[#F7F4FF]`}
                        >
                            {isScannerOpen && result === "" ? (
                                <>
                                    <div className="w-full">
                                        <QrReader
                                            delay={100}
                                            style={previewStyle}
                                            onError={handleError}
                                            onScan={handleScan}
                                        />
                                        <Button
                                            className="mt-[23px]"
                                            onClick={toggleScanner}
                                        >
                                            Cancel Scan
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                // <div className="h-full w-full flex flex-col justify-between">
                                //     <p>{`${result.text}`}</p>

                                //     <Button
                                //         className="mt-[23px]"
                                //         onClick={toggleScanner}
                                //     >
                                //         Clear Data
                                //     </Button>
                                // </div>
                                <>
                                    {alertOpen && result !== "" ? (
                                        <div className="w-full bg-[#F2EFFB] border-[1.5px] border-solid border-[#D1C6ED] absolute top-[20px] z-20 pt-[11px] px-[15px] pb-[11px] rounded-md">
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-2">
                                                    <img
                                                        src={InformationIcon}
                                                        alt=""
                                                    />
                                                    <h1 className=" leading-3 p-0 m-0 h-auto flex pt-[3px] font-medium">
                                                        Berhasil!
                                                    </h1>
                                                </div>
                                                <Button
                                                    className="h-auto px-0 py-0 w-auto bg-transparent hover:bg-transparent"
                                                    onClick={() =>
                                                        setAlertOpen(false)
                                                    }
                                                >
                                                    <img
                                                        src={CloseIcon}
                                                        alt=""
                                                    />
                                                </Button>
                                            </div>
                                            <p className="ml-[25px] mt-[5px] text-[14px]">
                                                QR Code anda berhasil dipindai
                                            </p>
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                    <h2 className="font-bold text-[20px]">
                                        Scan QR Code
                                    </h2>
                                    <img
                                        className="h-[120px] w-[120px]"
                                        src={QrCodeIcon}
                                        alt=""
                                    />
                                    <p className="text-[15px] mt-[9px] text-center text-[#414141]">
                                        We need your permission to access the
                                        camera for QR code scanning. Please
                                        allow it.
                                    </p>

                                    <Button
                                        className="mt-[17px] font-semibold"
                                        disabled={alertOpen}
                                        onClick={toggleScanner}
                                    >
                                        Scan
                                    </Button>
                                </>
                            )}
                        </div>
                    </main>
                    <Navigation />
                </>
            )}
        </>
    );
};

export default Home;
