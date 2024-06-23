import React, { useState, useEffect } from "react";
import { Input, Button } from "../components/ui/index";
import { Link } from "@inertiajs/inertia-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";
import Cookies from "js-cookie";
import { Info } from "lucide-react";

export default function Register() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [verifyLoading, setIsVerifyLoading] = useState(true);
    const inventoryToken = Cookies.get("inventory_token");

    const onSubmit = async (data) => {
        const { username, email, password, id_number, address, phone_number } =
            data;
        const body = {
            username: username.trim(),
            email: email,
            password: password,
            id_number: id_number,
            address: address,
            phone_number: phone_number,
        };

        if (
            body.username === "" ||
            body.email === "" ||
            body.password === "" ||
            body.id_number === "" ||
            body.address === "" ||
            body.phone_number === ""
        ) {
            return;
        }
        setIsLoading(true);
        try {
            const postData = await axios.post("/api/v1/auth/register", body);
            console.log(postData);
            setIsLoading(false);
            Inertia.visit("/login");
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };

    const verifyUser = async () => {
        setIsVerifyLoading(true);

        try {
            const { data: getUser } = await axios("/api/user", {
                headers: {
                    Authorization: `Bearer ${inventoryToken}`,
                },
            });

            console.log(getUser);
            if (getUser.username !== "") {
                Inertia.visit("/");
                setIsVerifyLoading(false);
            }
        } catch (error) {
            console.log(error);
            if (error.response.data.message === "Unauthenticated.") {
                Inertia.visit("/login");
                setIsVerifyLoading(false);
                return;
            }
        }
    };

    useEffect(() => {
        if (inventoryToken === undefined || inventoryToken === "") {
            setIsVerifyLoading(false);
            return;
        } else {
            verifyUser();
        }
    }, []);

    return (
        <>
            {!verifyLoading && (
                <div className="pt-[40px] pb-[50px] gap-[60px] flex justify-center flex-col items-center w-full max-w-[420px] mx-auto">
                    <div>
                        <h1 className="text-center leading-8 text-[27px]">
                            Create Account
                        </h1>
                        <p className="text-center">Create a New Account</p>
                    </div>
                    <form
                        className="flex flex-col gap-8 rounded-md px-[30px] w-full"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <label htmlFor="username" className="flex flex-col">
                            <span className=" text-neutral-800 leading-3 mb-[6px]">
                                Username
                            </span>
                            <Input
                                {...register("username", {
                                    required: "Username is Empty",
                                })}
                                value={watch("username")}
                                id="username"
                                className={`${
                                    errors.username &&
                                    "outline-red-500 focus:outline-red-400"
                                }`}
                                type="text"
                                placeholder="Username. . ."
                            />
                            {errors.username && (
                                <div className="text-[13px] mt-[4px] text-red-500 leading-none flex items-center gap-1">
                                    <Info size={14} />
                                    <span className="mt-[3px] leading-none">
                                        {errors.username.message}
                                    </span>
                                </div>
                            )}
                        </label>

                        <label htmlFor="password" className="flex flex-col">
                            <span className="text-neutral-800 leading-3 mb-[6px]">
                                Password
                            </span>
                            <Input
                                {...register("password", {
                                    required: "Password is Empty",
                                })}
                                value={watch("password")}
                                id="password"
                                className={`${
                                    errors.password &&
                                    "outline-red-500 focus:outline-red-400"
                                }`}
                                type="password"
                                placeholder="Password. . ."
                            />
                            {errors.password && (
                                <div className="text-[13px] mt-[4px] text-red-500 leading-none flex items-center gap-1">
                                    <Info size={14} />
                                    <span className="mt-[3px] leading-none">
                                        {errors.password.message}
                                    </span>
                                </div>
                            )}
                        </label>

                        <label htmlFor="email" className="flex flex-col">
                            <span className="text-neutral-800 leading-3 mb-[6px]">
                                Email
                            </span>
                            <Input
                                {...register("email", {
                                    required: "Email is Empty",
                                })}
                                value={watch("email")}
                                id="email"
                                type="email"
                                placeholder="Email. . ."
                                className={`${
                                    errors.email &&
                                    "outline-red-500 focus:outline-red-400"
                                }`}
                            />
                            {errors.email && (
                                <div className="text-[13px] mt-[4px] text-red-500 leading-none flex items-center gap-1">
                                    <Info size={14} />
                                    <span className="mt-[3px] leading-none">
                                        {errors.email.message}
                                    </span>
                                </div>
                            )}
                        </label>

                        <label htmlFor="nis" className="flex flex-col">
                            <span className="text-neutral-800 leading-3 mb-[6px]">
                                Nis
                            </span>
                            <Input
                                {...register("id_number", {
                                    required: "Nis is Empty",
                                })}
                                value={watch("id_number")}
                                id="nis"
                                type="text"
                                placeholder="Nis. . ."
                                className={`${
                                    errors.id_number &&
                                    "outline-red-500 focus:outline-red-400"
                                }`}
                            />
                            {errors.id_number && (
                                <div className="text-[13px] mt-[4px] text-red-500 leading-none flex items-center gap-1">
                                    <Info size={14} />
                                    <span className="mt-[3px] leading-none">
                                        {errors.id_number.message}
                                    </span>
                                </div>
                            )}
                        </label>

                        <label htmlFor="no" className="flex flex-col">
                            <span className="text-neutral-800 leading-3 mb-[6px]">
                                No HP
                            </span>
                            <Input
                                {...register("phone_number", {
                                    required: "Phone Number is Empty",
                                })}
                                value={watch("phone_number")}
                                id="no"
                                type="text"
                                placeholder="No. . ."
                                className={`${
                                    errors.phone_number &&
                                    "outline-red-500 focus:outline-red-400"
                                }`}
                            />
                            {errors.phone_number && (
                                <div className="text-[13px] mt-[4px] text-red-500 leading-none flex items-center gap-1">
                                    <Info size={14} />
                                    <span className="mt-[3px] leading-none">
                                        {errors.phone_number.message}
                                    </span>
                                </div>
                            )}
                        </label>

                        <label htmlFor="address" className="flex flex-col">
                            <span className="text-neutral-800 leading-3 mb-[6px]">
                                Address
                            </span>
                            <Input
                                {...register("address", {
                                    required: "Address is Empty",
                                })}
                                value={watch("address")}
                                id="address"
                                type="text"
                                placeholder="Address. . ."
                                className={`${
                                    errors.address &&
                                    "outline-red-500 focus:outline-red-400"
                                }`}
                            />
                            {errors.address && (
                                <div className="text-[13px] mt-[4px] text-red-500 leading-none flex items-center gap-1">
                                    <Info size={14} />
                                    <span className="mt-[3px] leading-none">
                                        {errors.address.message}
                                    </span>
                                </div>
                            )}
                        </label>

                        <div>
                            <Button
                                className="bg-[#A27FFE] mt-[50px]"
                                disable={isLoading}
                            >
                                <span className="text-lg">Register</span>
                            </Button>
                            <p className="text-center text-[13px] mt-[6px]">
                                Already have an account ?{" "}
                                <Link
                                    href="/login"
                                    className="text-[#A27FFE] font-semibold hover:underline"
                                >
                                    Login
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}
