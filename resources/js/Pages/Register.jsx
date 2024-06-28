import React, { useState, useEffect } from "react";
import {
    Input,
    Button,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../components/ui/index";
import { Link } from "@inertiajs/inertia-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";
import Cookies from "js-cookie";
import { Info } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

const formSchema = z.object({
    username: z.string().min(1, {
        message: "Username is Empty",
    }),
    email: z.string().min(1, {
        message: "Email is Empty",
    }),
    password: z.string().min(1, {
        message: "Password is Empty",
    }),
    id_number: z.string().min(1, {
        message: "Student identification number is Empty",
    }),
    address: z.string().min(1, {
        message: "Address is Empty",
    }),
    phone_number: z.string().min(1, {
        message: "Phone Number is Empty",
    }),
    student_class: z.string().min(1, {
        message: "Class is Empty",
    }),
    student_generation: z.string().min(1, {
        message: "Class Level is Empty",
    }),
});

export default function Register() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            id_number: "",
            address: "",
            phone_number: "",
            student_class: "",
            student_generation: "",
        },
    });

    const [isLoading, setIsLoading] = useState(false);
    const [verifyLoading, setIsVerifyLoading] = useState(true);
    const inventoryToken = Cookies.get("inventory_token");

    const onSubmit = async (data) => {
        const {
            username,
            email,
            password,
            id_number,
            address,
            phone_number,
            student_class,
            student_generation,
        } = data;
        const body = {
            username: username.trim(),
            email: email,
            password: password,
            id_number: id_number,
            address: address,
            phone_number: phone_number,
            class: student_class,
            generation: student_generation,
        };

        // if (
        //     body.username === "" ||
        //     body.email === "" ||
        //     body.password === "" ||
        //     body.id_number === "" ||
        //     body.address === "" ||
        //     body.phone_number === ""
        // ) {
        //     console.log(data);
        //     return;
        // }
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
                    {/* <form
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
                                Student identification number
                            </span>
                            <Input
                                {...register("id_number", {
                                    required: "Nis is Empty",
                                })}
                                value={watch("id_number")}
                                id="nis"
                                type="text"
                                placeholder="Student identification number. . ."
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
                                Phone Number
                            </span>
                            <Input
                                {...register("phone_number", {
                                    required: "Phone Number is Empty",
                                })}
                                value={watch("phone_number")}
                                id="no"
                                type="text"
                                placeholder="Phone Number. . ."
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

                     
                        <div className="w-full">
                            <Button
                                className="w-full bg-[#A27FFE] mt-[50px]"
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
                    </form> */}
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex flex-col gap-8 rounded-md px-[30px] w-full"
                        >
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => {
                                    console.log();
                                    return (
                                        <FormItem className="space-y-0">
                                            <FormLabel className="text-[16px] text-neutral-800 leading-3 mb-[6px]">
                                                Username
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="shadcn"
                                                    {...field}
                                                    className={`${
                                                        form.formState.errors
                                                            .username &&
                                                        "outline-red-500 focus:outline-red-400"
                                                    }`}
                                                />
                                            </FormControl>
                                            {form.formState.errors.username && (
                                                <div className=" pt-[5px] text-red-500 leading-none flex items-center gap-1">
                                                    <Info size={14} />
                                                    <FormMessage className="text-[13px] mt-[3px] leading-none" />
                                                </div>
                                            )}
                                        </FormItem>
                                    );
                                }}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => {
                                    console.log();
                                    return (
                                        <FormItem className="space-y-0">
                                            <FormLabel className="text-[16px] text-neutral-800 leading-3 mb-[6px]">
                                                Email
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="shadcn"
                                                    {...field}
                                                    className={`${
                                                        form.formState.errors
                                                            .email &&
                                                        "outline-red-500 focus:outline-red-400"
                                                    }`}
                                                />
                                            </FormControl>
                                            {form.formState.errors.email && (
                                                <div className=" pt-[5px] text-red-500 leading-none flex items-center gap-1">
                                                    <Info size={14} />
                                                    <FormMessage className="text-[13px] mt-[3px] leading-none" />
                                                </div>
                                            )}
                                        </FormItem>
                                    );
                                }}
                            />{" "}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => {
                                    console.log();
                                    return (
                                        <FormItem className="space-y-0">
                                            <FormLabel className="text-[16px] text-neutral-800 leading-3 mb-[6px]">
                                                Password
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="shadcn"
                                                    {...field}
                                                    className={`${
                                                        form.formState.errors
                                                            .password &&
                                                        "outline-red-500 focus:outline-red-400"
                                                    }`}
                                                />
                                            </FormControl>
                                            {form.formState.errors.password && (
                                                <div className=" pt-[5px] text-red-500 leading-none flex items-center gap-1">
                                                    <Info size={14} />
                                                    <FormMessage className="text-[13px] mt-[3px] leading-none" />
                                                </div>
                                            )}
                                        </FormItem>
                                    );
                                }}
                            />{" "}
                            <FormField
                                control={form.control}
                                name="id_number"
                                render={({ field }) => {
                                    console.log();
                                    return (
                                        <FormItem className="space-y-0">
                                            <FormLabel className="text-[16px] text-neutral-800 leading-3 mb-[6px]">
                                                Student identification number
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="shadcn"
                                                    {...field}
                                                    className={`${
                                                        form.formState.errors
                                                            .id_number &&
                                                        "outline-red-500 focus:outline-red-400"
                                                    }`}
                                                />
                                            </FormControl>
                                            {form.formState.errors
                                                .id_number && (
                                                <div className=" pt-[5px] text-red-500 leading-none flex items-center gap-1">
                                                    <Info size={14} />
                                                    <FormMessage className="text-[13px] mt-[3px] leading-none" />
                                                </div>
                                            )}
                                        </FormItem>
                                    );
                                }}
                            />
                            <FormField
                                control={form.control}
                                name="phone_number"
                                render={({ field }) => {
                                    console.log();
                                    return (
                                        <FormItem className="space-y-0">
                                            <FormLabel className="text-[16px] text-neutral-800 leading-3 mb-[6px]">
                                                Phone Number
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="shadcn"
                                                    {...field}
                                                    className={`${
                                                        form.formState.errors
                                                            .phone_number &&
                                                        "outline-red-500 focus:outline-red-400"
                                                    }`}
                                                />
                                            </FormControl>
                                            {form.formState.errors
                                                .phone_number && (
                                                <div className=" pt-[5px] text-red-500 leading-none flex items-center gap-1">
                                                    <Info size={14} />
                                                    <FormMessage className="text-[13px] mt-[3px] leading-none" />
                                                </div>
                                            )}
                                        </FormItem>
                                    );
                                }}
                            />
                            <FormField
                                control={form.control}
                                name="student_class"
                                render={({ field }) => {
                                    console.log();
                                    return (
                                        <FormItem className="space-y-0">
                                            <FormLabel className="text-[16px] text-neutral-800 leading-3 mb-[6px]">
                                                Class
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="shadcn"
                                                    {...field}
                                                    className={`${
                                                        form.formState.errors
                                                            .student_class &&
                                                        "outline-red-500 focus:outline-red-400"
                                                    }`}
                                                />
                                            </FormControl>
                                            {form.formState.errors
                                                .student_class && (
                                                <div className=" pt-[5px] text-red-500 leading-none flex items-center gap-1">
                                                    <Info size={14} />
                                                    <FormMessage className="text-[13px] mt-[3px] leading-none" />
                                                </div>
                                            )}
                                        </FormItem>
                                    );
                                }}
                            />
                            <FormField
                                control={form.control}
                                name="student_generation"
                                render={({ field }) => {
                                    console.log();
                                    return (
                                        <FormItem className="space-y-0">
                                            <FormLabel className="text-[16px] text-neutral-800 leading-3 mb-[6px]">
                                                Class Level
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="shadcn"
                                                    {...field}
                                                    className={`${
                                                        form.formState.errors
                                                            .student_generation &&
                                                        "outline-red-500 focus:outline-red-400"
                                                    }`}
                                                />
                                            </FormControl>
                                            {form.formState.errors
                                                .student_generation && (
                                                <div className=" pt-[5px] text-red-500 leading-none flex items-center gap-1">
                                                    <Info size={14} />
                                                    <FormMessage className="text-[13px] mt-[3px] leading-none" />
                                                </div>
                                            )}
                                        </FormItem>
                                    );
                                }}
                            />
                            <Button
                                className="bg-[#A27FFE] mt-[50px] hover:bg-[#a888f8]"
                                type="submit"
                            >
                                Register
                            </Button>
                        </form>
                    </Form>
                </div>
            )}
        </>
    );
}
