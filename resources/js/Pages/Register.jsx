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
import { Toaster, toast } from "sonner";

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

        setIsLoading(true);
        try {
            const postData = await axios.post("/api/v1/auth/register", body);
            console.log(postData);
            setIsLoading(false);
            Inertia.visit("/login");
        } catch (error) {
            setIsLoading(false);

            if (error.response.status === 422) {
                toast.error("User is Already Exist", {
                    duration: 3000,
                });
            }
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
                <>
                    <Toaster richColors position="top-center" />
                    <div className="pt-[40px] pb-[50px] gap-[60px] flex justify-center flex-col items-center w-full max-w-[420px] mx-auto">
                        <div>
                            <h1 className="text-center leading-8 text-[27px]">
                                Create Account
                            </h1>
                            <p className="text-center">Create a New Account</p>
                        </div>

                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="flex flex-col gap-8 rounded-md px-[30px] w-full"
                            >
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem className="space-y-0">
                                            <FormLabel className="text-[16px] text-neutral-800 leading-3 mb-[6px]">
                                                Username
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Name. . ."
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
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="space-y-0">
                                            <FormLabel className="text-[16px] text-neutral-800 leading-3 mb-[6px]">
                                                Email
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Email. . ."
                                                    {...field}
                                                    className={`${
                                                        form.formState.errors
                                                            .email &&
                                                        "outline-red-500 focus:outline-red-400"
                                                    }`}
                                                    type="email"
                                                />
                                            </FormControl>
                                            {form.formState.errors.email && (
                                                <div className=" pt-[5px] text-red-500 leading-none flex items-center gap-1">
                                                    <Info size={14} />
                                                    <FormMessage className="text-[13px] mt-[3px] leading-none" />
                                                </div>
                                            )}
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem className="space-y-0">
                                            <FormLabel className="text-[16px] text-neutral-800 leading-3 mb-[6px]">
                                                Password
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Password. . ."
                                                    {...field}
                                                    className={`${
                                                        form.formState.errors
                                                            .password &&
                                                        "outline-red-500 focus:outline-red-400"
                                                    }`}
                                                    type="password"
                                                />
                                            </FormControl>
                                            {form.formState.errors.password && (
                                                <div className=" pt-[5px] text-red-500 leading-none flex items-center gap-1">
                                                    <Info size={14} />
                                                    <FormMessage className="text-[13px] mt-[3px] leading-none" />
                                                </div>
                                            )}
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="id_number"
                                    render={({ field }) => (
                                        <FormItem className="space-y-0">
                                            <FormLabel className="text-[16px] text-neutral-800 leading-3 mb-[6px]">
                                                Student Identification Number
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Student Identification Number. . ."
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
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone_number"
                                    render={({ field }) => (
                                        <FormItem className="space-y-0">
                                            <FormLabel className="text-[16px] text-neutral-800 leading-3 mb-[6px]">
                                                Phone Number
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Phone Number. . ."
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
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem className="space-y-0">
                                            <FormLabel className="text-[16px] text-neutral-800 leading-3 mb-[6px]">
                                                Address
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Address. . ."
                                                    {...field}
                                                    className={`${
                                                        form.formState.errors
                                                            .address &&
                                                        "outline-red-500 focus:outline-red-400"
                                                    }`}
                                                />
                                            </FormControl>
                                            {form.formState.errors.address && (
                                                <div className=" pt-[5px] text-red-500 leading-none flex items-center gap-1">
                                                    <Info size={14} />
                                                    <FormMessage className="text-[13px] mt-[3px] leading-none" />
                                                </div>
                                            )}
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="student_class"
                                    render={({ field }) => (
                                        <FormItem className="space-y-0">
                                            <FormLabel className="text-[16px] text-neutral-800 leading-3 mb-[6px]">
                                                Class
                                            </FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger
                                                        className={`${
                                                            form.formState
                                                                .errors
                                                                .student_class &&
                                                            "outline-red-500 focus:outline-red-400"
                                                        }`}
                                                    >
                                                        <SelectValue
                                                            placeholder="Select Class"
                                                            className=""
                                                        />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="PPLG 1">
                                                        PPLG 1
                                                    </SelectItem>
                                                    <SelectItem value="PPLG 2">
                                                        PPLG 2
                                                    </SelectItem>
                                                    <SelectItem value="PPLG 3">
                                                        PPLG 3
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>

                                            {form.formState.errors
                                                .student_class && (
                                                <div className=" pt-[5px] text-red-500 leading-none flex items-center gap-1">
                                                    <Info size={14} />
                                                    <FormMessage className="text-[13px] mt-[3px] leading-none" />
                                                </div>
                                            )}
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="student_generation"
                                    render={({ field }) => (
                                        <FormItem className="space-y-0">
                                            <FormLabel className="text-[16px] text-neutral-800 leading-3 mb-[6px]">
                                                Class Level
                                            </FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger
                                                        className={`${
                                                            form.formState
                                                                .errors
                                                                .student_generation &&
                                                            "outline-red-500 focus:outline-red-400"
                                                        }`}
                                                    >
                                                        <SelectValue placeholder="Select Class Level" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="X">
                                                        X
                                                    </SelectItem>
                                                    <SelectItem value="XI">
                                                        XI
                                                    </SelectItem>
                                                    <SelectItem value="XII">
                                                        XII
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>

                                            {form.formState.errors
                                                .student_generation && (
                                                <div className=" pt-[5px] text-red-500 leading-none flex items-center gap-1">
                                                    <Info size={14} />
                                                    <FormMessage className="text-[13px] mt-[3px] leading-none" />
                                                </div>
                                            )}
                                        </FormItem>
                                    )}
                                />
                                <div className="w-full">
                                    <Button
                                        className="w-full bg-[#A27FFE] mt-[50px] hover:bg-[#b295fb]"
                                        disable={isLoading}
                                        type="submit"
                                    >
                                        <span className="text-lg">
                                            Register
                                        </span>
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
                        </Form>
                    </div>
                </>
            )}
        </>
    );
}
