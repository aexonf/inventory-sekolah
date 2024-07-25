import React, { useState, useCallback, useEffect, useRef } from "react";
import { Button, Card, Navigation } from "../components/ui/index";
import { CircleUserRound } from "lucide-react";
import QrReader from "react-qr-scanner";
import QrCodeIcon from "../../../public/img/qr-code.svg";
import CloseIcon from "../../../public/img/close-icon.svg";
import InformationIcon from "../../../public/img/information-icon.svg";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";
import Cookies from "js-cookie";
import { Header } from "../components/section/index";
import QrScanner from "qr-scanner";
import { Link, usePage } from "@inertiajs/inertia-react";
import Layout from "./Layout";

const Home = () => {
    const { props } = usePage();
    const [result, setResult] = useState("");
    const [isScannerOpen, setIsScannerOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [facingMode, setFacingMode] = useState("environment");
    const videoRef = useRef(null);
    const qrScannerRef = useRef(null);
    const inventoryToken = Cookies.get("inventory_token");
    const [userId, setUserId] = useState(0);
    const [message, setMessage] = useState("");
    const userIdRef = useRef(userId);

    useEffect(() => {
        userIdRef.current = userId;
    }, [userId]);

    const getData = async () => {
        setIsLoading(true);
        try {
            const { data: getUserId } = await axios("/api/user", {
                headers: {
                    Authorization: `Bearer ${inventoryToken}`,
                },
            });

            setUserId(getUserId.id);
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

    const handleScan = useCallback(async (data) => {
        if (data) {
            setAlertOpen(true);
            qrScannerRef.current?.stop();
            setIsScannerOpen(false);
            setResult(data);
            try {
                const body = {
                    item_id: Number(data.data),
                    user_id: userIdRef.current,
                };
                const { data: postData } = await axios.post(
                    "/api/v1/notification/borrow",
                    body,
                    {
                        headers: {
                            Authorization: `Bearer ${inventoryToken}`,
                        },
                    }
                );
                setMessage("Berhasil pinjam barang");
                // console.log(postData);
            } catch (error) {
                if (
                    error.response.data.message ===
                    "Item is not available for borrowing"
                ) {
                    setMessage("Barang sedang dipinjam orang lain");
                } else if (
                    error.response.data.message ===
                    "You have already borrowed this item"
                ) {
                    setMessage("Kamu sudah meminjam barang ini");
                } else {
                    setMessage("Gagal meminjam Barang");
                }
                console.log(error);
            }
            console.log(data);
        }
    }, []);

    useEffect(() => {
        getData();
    }, []);

    const handleError = useCallback((err) => {
        console.error(err);
    }, []);

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
        setResult("");
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

    return (
        <>
            {!isLoading && (
                <>
                    <div className="h-auto w-full max-w-[420px] mx-auto pb-[110px] relative">
                        <Header title="Scan QR" />

                        <div
                            className={`${
                                isScannerOpen
                                    ? "w-[346px] h-[466px] justify-between px-[20px]"
                                    : "w-[320px] h-[330px] px-[30px]"
                            } mt-[50px] mx-auto transition-all duration-150 flex flex-col items-center  rounded-[10px] py-[20px] bg-[#F7F4FF]`}
                        >
                            {isScannerOpen ? (
                                <>
                                    <div className="w-full">
                                        <video
                                            ref={videoRef}
                                            style={{
                                                height: "360px",
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
                                <>
                                    {alertOpen && result !== "" ? (
                                        <div className="w-[90%] bg-[#F2EFFB] border-[1.5px] border-solid border-[#D1C6ED] absolute top-[20px] z-20 pt-[11px] px-[15px] pb-[11px] rounded-md">
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-2">
                                                    <img
                                                        src={InformationIcon}
                                                        alt=""
                                                    />
                                                    <h1 className=" leading-3 p-0 m-0 h-auto flex pt-[3px] font-medium">
                                                        Success!
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
                                                {message}
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
                                        className="w-full bg-[#bda5ff] hover:bg-[#a788fd] mt-[17px] font-semibold"
                                        disabled={alertOpen}
                                        onClick={toggleScanner}
                                    >
                                        Scan
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

Home.layout = (page) => <Layout children={page} />;

export default Home;
