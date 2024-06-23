import React, { useState } from "react";
import { Input, Button } from "../components/ui/index";
import { Link } from "@inertiajs/inertia-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";
import Cookies from "js-cookie";

export default function Login() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        const { username, password } = data;
        const body = {
            username: username,
            password: password,
        };

        if (body.username === "" || body.password === "") {
            return;
        }
        setIsLoading(true);
        try {
            const { data: postData } = await axios.post(
                "/api/v1/auth/login",
                body
            );
            console.log(postData);
            setIsLoading(false);
            Cookies.set("inventory_token", postData.token, { expires: 7 });
            Inertia.visit("/");
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };

    return (
        <div className="pt-[60px] pb-[50px] gap-[60px] flex justify-center flex-col items-center w-full max-w-[420px] mx-auto">
            <div>
                <h1 className="text-center leading-8 text-[27px]">
                    Welcome Back
                </h1>
                <p className="text-center">Enter your Credentiol for Login </p>
            </div>
            <form
                className="flex flex-col gap-8 rounded-md px-[30px] w-full"
                onSubmit={handleSubmit(onSubmit)}
            >
                <label className="flex flex-col">
                    <span className=" text-neutral-800 leading-3 mb-[6px]">
                        Username
                    </span>
                    <Input
                        {...register("username", {
                            required: "Username is Required",
                        })}
                        value={watch("username")}
                        type="text"
                        placeholder="Username. . ."
                        className={`${
                            errors.username &&
                            "outline-red-500 focus:outline-red-400"
                        }`}
                    />
                    {errors.username && (
                        <span className="text-[13px] mt-[4px] text-red-500">
                            {errors.username.message}
                        </span>
                    )}
                </label>

                <label className="flex flex-col">
                    <span className=" text-neutral-800 leading-3 mb-[6px]">
                        Password
                    </span>
                    <Input
                        {...register("password", {
                            required: "Password is Required",
                        })}
                        value={watch("password")}
                        type="text"
                        placeholder="Password. . ."
                        className={`${
                            errors.password &&
                            "outline-red-500 focus:outline-red-400"
                        }`}
                    />
                    {errors.password && (
                        <span className="text-[13px] mt-[4px] text-red-500">
                            {errors.password.message}
                        </span>
                    )}
                </label>

                <div>
                    <Button className="bg-[#A27FFE] mt-[50px]">
                        <span className="text-lg">Login</span>
                    </Button>
                    <p className="text-center text-[13px] mt-[6px]">
                        Don’t have an account ?{" "}
                        <Link
                            href="/register"
                            className="text-[#A27FFE] font-semibold hover:underline"
                        >
                            Register
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}
