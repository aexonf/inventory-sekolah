import React from "react";
import { Input, Button } from "../components/ui/index";
import { Link } from "@inertiajs/inertia-react";

export default function Login() {
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
                action=""
            >
                <label className="flex flex-col">
                    <span className=" text-neutral-800 leading-3 mb-[6px]">
                        Username
                    </span>
                    <Input type="text" placeholder="Username. . ." />
                </label>

                <label className="flex flex-col">
                    <span className=" text-neutral-800 leading-3 mb-[6px]">
                        Password
                    </span>
                    <Input type="text" placeholder="Password. . ." />
                </label>

                <div>
                    <Button className="bg-[#A27FFE] mt-[50px]">
                        <span className="text-lg">Register</span>
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
