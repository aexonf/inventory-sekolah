import React, { useState, useEffect } from "react";
import {
    Input,
    Button,
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Inertia } from "@inertiajs/inertia";
import Cookies from "js-cookie";
import { Toaster, toast } from "sonner";
import { Info } from "lucide-react";
import { z } from "zod";

const formSchema = z.object({
    username: z.string().min(1, {
        message: "Username is Empty",
    }),

    password: z.string().min(1, {
        message: "Password is Empty",
    }),
});

export default function Login() {
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
            password: "",
        },
    });
    const [isLoading, setIsLoading] = useState(false);
    const [verifyLoading, setIsVerifyLoading] = useState(true);
    const inventoryToken = Cookies.get("inventory_token");

    const onSubmit = async (data) => {
        const { username, password } = data;
        const body = {
            username: username,
            password: password,
        };

        // if (body.username === "" || body.password === "") {
        //     return;
        // }
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
            if (
                error.response.data.errors !== undefined ||
                error.response.data.status === "error"
            ) {
                toast.error("Your Username Or Password is Wrong", {
                    duration: 3000,
                });
            }
            console.log();
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
                    <div className="pt-[60px] pb-[50px] gap-[60px] flex justify-center flex-col items-center w-full max-w-[420px] mx-auto">
                        <div>
                            <h1 className="text-center leading-8 text-[27px]">
                                Welcome Back
                            </h1>
                            <p className="text-center">
                                Enter your Credentiol for Login{" "}
                            </p>
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

                                <div className="w-full">
                                    <Button
                                        className="w-full bg-[#A27FFE] mt-[50px] hover:bg-[#b295fb]"
                                        disable={isLoading}
                                        type="submit"
                                    >
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
                        </Form>
                        {/* <form
                            className="flex flex-col gap-8 rounded-md px-[30px] w-full"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <label className="flex flex-col">
                                <span className=" text-neutral-800 leading-3 mb-[6px]">
                                    Username
                                </span>
                                <Input
                                    {...register("username", {
                                        required: "Username is Empty",
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
                                    <div className="text-[13px] mt-[4px] text-red-500 leading-none flex items-center gap-1">
                                        <Info size={14} />
                                        <span className="mt-[3px] leading-none">
                                            {errors.username.message}
                                        </span>
                                    </div>
                                )}
                            </label>

                            <label className="flex flex-col">
                                <span className=" text-neutral-800 leading-3 mb-[6px]">
                                    Password
                                </span>
                                <Input
                                    {...register("password", {
                                        required: "Password is Empty",
                                    })}
                                    value={watch("password")}
                                    type="password"
                                    placeholder="Password. . ."
                                    className={`${
                                        errors.password &&
                                        "outline-red-500 focus:outline-red-400"
                                    }`}
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
                        </form> */}
                    </div>
                </>
            )}
        </>
    );
}
