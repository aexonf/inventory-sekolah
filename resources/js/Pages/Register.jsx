import React from "react";
import { Input, Button } from "../components/ui/index";
import { Link } from "@inertiajs/inertia-react";
import { useForm } from "react-hook-form";

export default function Register() {
    const { register, handleSubmit, watch } = useForm();

    const onSubmit = (data) => alert(JSON.stringify(data));

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
                        {...register("username")}
                        value={watch("username")}
                        id="username"
                        type="text"
                        placeholder="Username. . ."
                    />
                </label>

                <label htmlFor="password" className="flex flex-col">
                    <span className="text-neutral-800 leading-3 mb-[6px]">
                        Password
                    </span>
                    <Input
                        {...register("password")}
                        value={watch("password")}
                        id="password"
                        type="text"
                        placeholder="Password. . ."
                    />
                </label>

                <label htmlFor="email" className="flex flex-col">
                    <span className="text-neutral-800 leading-3 mb-[6px]">
                        Email
                    </span>
                    <Input
                        {...register("email")}
                        value={watch("email")}
                        id="email"
                        type="text"
                        placeholder="Email. . ."
                    />
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
