import React from "react";
import { Input, Button } from "../components/ui/index";
import { Link } from "@inertiajs/inertia-react";
import { useForm } from "react-hook-form";
import { Inertia } from "@inertiajs/inertia";

export default function Register({ props }) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

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
        Inertia.post("/api/v1/auth/register", body),
            {
                onError: (errors) => {
                    console.log(errors);
                },
            };
    };

    return (
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
                            required: "Username is Required",
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
                        <span className="text-[13px] mt-[4px] text-red-500">
                            {errors.username.message}
                        </span>
                    )}
                </label>

                <label htmlFor="password" className="flex flex-col">
                    <span className="text-neutral-800 leading-3 mb-[6px]">
                        Password
                    </span>
                    <Input
                        {...register("password", {
                            required: "Password is Required",
                        })}
                        value={watch("password")}
                        id="password"
                        className={`${
                            errors.password &&
                            "outline-red-500 focus:outline-red-400"
                        }`}
                        type="text"
                        placeholder="Password. . ."
                    />
                    {errors.password && (
                        <span className="text-[13px] mt-[4px] text-red-500">
                            {errors.password.message}
                        </span>
                    )}
                </label>

                <label htmlFor="email" className="flex flex-col">
                    <span className="text-neutral-800 leading-3 mb-[6px]">
                        Email
                    </span>
                    <Input
                        {...register("email", {
                            required: "Email is Required",
                        })}
                        value={watch("email")}
                        id="email"
                        type="text"
                        placeholder="Email. . ."
                        className={`${
                            errors.email &&
                            "outline-red-500 focus:outline-red-400"
                        }`}
                    />
                    {errors.email && (
                        <span className="text-[13px] mt-[4px] text-red-500">
                            {errors.email.message}
                        </span>
                    )}
                </label>

                <label htmlFor="nis" className="flex flex-col">
                    <span className="text-neutral-800 leading-3 mb-[6px]">
                        Nis
                    </span>
                    <Input
                        {...register("id_number")}
                        value={watch("id_number")}
                        id="nis"
                        type="text"
                        placeholder="Nis. . ."
                    />
                </label>

                <label htmlFor="no" className="flex flex-col">
                    <span className="text-neutral-800 leading-3 mb-[6px]">
                        No HP
                    </span>
                    <Input
                        {...register("phone_number")}
                        value={watch("phone_number")}
                        id="no"
                        type="text"
                        placeholder="No. . ."
                    />
                </label>

                <label htmlFor="address" className="flex flex-col">
                    <span className="text-neutral-800 leading-3 mb-[6px]">
                        Address
                    </span>
                    <Input
                        {...register("address")}
                        value={watch("address")}
                        id="address"
                        type="text"
                        placeholder="Address. . ."
                    />
                </label>

                <div>
                    <Button className="bg-[#A27FFE] mt-[50px]">
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
    );
}
