import React, { useState, useCallback, useEffect, useRef } from "react";
import Layout from "./Layout";
import QrScanner from "qr-scanner";
import Cookies from "js-cookie";
import { Button, Card, Navigation } from "../../components/ui/index";
import QrCodeIcon from "../../../../public/img/qr-code.svg";
import CloseIcon from "../../../../public/img/close-icon.svg";
import InformationIcon from "../../../../public/img/information-icon.svg";
import { Inertia } from "@inertiajs/inertia";

function QrScan() {
    const [result, setResult] = useState("");
    const [isScannerOpen, setIsScannerOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [facingMode, setFacingMode] = useState("environment");
    const videoRef = useRef(null);
    const qrScannerRef = useRef(null);
    const inventoryToken = Cookies.get("inventory_token");

    const handleScan = useCallback(async (data) => {
        if (data) {
            //setAlertOpen(true);
            // qrScannerRef.current?.stop();
            //setIsScannerOpen(false);
            setResult(data);

            console.log(data);
        }
    }, []);

    const handleError = useCallback((err) => {
        console.error(err);
    }, []);

    console.log(result);

    const initializeScanner = () => {
        if (qrScannerRef.current) {
            qrScannerRef.current.stop();
        }

        if (videoRef.current) {
            qrScannerRef.current = new QrScanner(
                videoRef.current,
                (result) => handleScan(result),
                {
                    preferredCamera: "environment",
                    highlightScanRegion: false,
                    highlightCodeOutline: true,
                }
            );
            qrScannerRef.current.start().catch(handleError);
        }
    };

    const toggleScanner = () => {
        if (isScannerOpen) {
            qrScannerRef.current?.stop();
        } else {
            initializeScanner();
        }
        setIsScannerOpen(!isScannerOpen);
    };

    useEffect(() => {
        getPreferredCamera();
    }, []);

    useEffect(() => {
        if (isScannerOpen) {
            initializeScanner();
        }
    }, [isScannerOpen]);

    const getPreferredCamera = async () => {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices.filter(
                (device) => device.kind === "videoinput"
            );
            const hasBackCamera = videoDevices.some((device) =>
                device.label.toLowerCase().includes("back")
            );

            if (window.innerWidth > 768) {
                setFacingMode("environment");
            } else {
                setFacingMode("environment");
            }
        } catch (error) {
            console.error("Error getting preferred camera:", error);
        }
    };

    // const getData = async () => {
    //     setIsLoading(true);
    //     try {
    //         const getUser = await axios("/api/user", {
    //             headers: {
    //                 Authorization: `Bearer ${inventoryToken}`,
    //             },
    //         });

    //         setIsLoading(false);
    //     } catch (error) {
    //         console.log(error);
    //         if (error.response.data.message === "Unauthenticated.") {
    //             Inertia.visit("/login");
    //             setTimeout(() => {}, 3000);
    //             return;
    //         }
    //     }
    // };

    // useEffect(() => {
    //     getData();
    // }, []);

    return (
        <div className="relative w-full pb-[30px]">
            <div className="absolute top-[-40px] w-full px-[20px]">
                <div className="bg-white shadow-[3px_3px_20px_-2px_#00000024]  py-[20px] rounded-md px-[20px]">
                    <h1 className="text-[20px]">QrScan</h1>
                </div>
            </div>

            <div className="pt-[20px] px-[20px]">
                <div
                    className={`${
                        isScannerOpen
                            ? "justify-between px-[20px]"
                            : "px-[30px]"
                    } max-w-[700px] w-full h-[500px] mt-[50px] mx-auto transition-all duration-150 flex flex-col items-center justify-center rounded-[10px] py-[20px] bg-[#F7F4FF]`}
                >
                    {isScannerOpen ? (
                        <>
                            <div className="w-full">
                                <video
                                    ref={videoRef}
                                    style={{
                                        height: "400px",
                                        width: "100%",
                                        objectFit: "cover",
                                        borderRadius: "10px",
                                    }}
                                />
                                <Button
                                    className="mt-[23px] w-full bg-[#bda5ff] hover:bg-[#a788fd]"
                                    onClick={toggleScanner}
                                >
                                    Cancel Scan
                                </Button>
                            </div>
                        </>
                    ) : (
                        <div className="max-w-[340px] flex flex-col items-center">
                            {/* {alertOpen && result !== "" ? (
                                <div className="w-[90%] bg-[#F2EFFB] border-[1.5px] border-solid border-[#D1C6ED] absolute top-[20px] z-20 pt-[11px] px-[15px] pb-[11px] rounded-md">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <img src={InformationIcon} alt="" />
                                            <h1 className=" leading-3 p-0 m-0 h-auto flex pt-[3px] font-medium">
                                                Success!
                                            </h1>
                                        </div>
                                        <Button
                                            className="h-auto px-0 py-0 w-auto bg-transparent hover:bg-transparent"
                                            onClick={() => setAlertOpen(false)}
                                        >
                                            <img src={CloseIcon} alt="" />
                                        </Button>
                                    </div>
                                    <p className="ml-[25px] mt-[5px] text-[14px]">
                                        Your QR Code has been scanned
                                    </p>
                                </div>
                            ) : (
                                ""
                            )} */}
                            <img
                                className="h-[220px] w-[220px]"
                                src={QrCodeIcon}
                                alt=""
                            />
                            <p className="text-[15px] mt-[9px] text-center text-[#414141]">
                                We need your permission to access the camera for
                                QR code scanning. Please allow it.
                            </p>

                            <Button
                                className="w-full bg-[#bda5ff] hover:bg-[#a788fd] mt-[17px] font-semibold"
                                disabled={alertOpen}
                                onClick={toggleScanner}
                            >
                                Scan
                            </Button>
                        </div>
                    )}
                </div>

                <div className="flex justify-center mt-[30px]">
                    <div>
                        <h1 className="font-semibold">
                            Detected QR Code:{" "}
                            <span>{result ? result.data : "-"}</span>
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

QrScan.layout = (page) => <Layout children={page} title="Welcome" />;

export default QrScan;
