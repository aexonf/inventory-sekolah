import React from "react";
import { Input } from "../components/ui/index";

export default function Login() {
    return (
        <div className="h-screen flex justify-center items-center">
            <form
                className="flex flex-col gap-5 border-[1.5px] rounded-md border-solid border-neutral-800 px-[30px] py-[20px]"
                action=""
            >
                <h1 className="text-center text-neutral-900 text-2xl">Login</h1>

                <label className="flex flex-col">
                    <span className="mb-[2px]">Create Username</span>
                    <Input />
                    <input
                        className="outline outline-[1px] outline-neutral-900 focus:outline-[2px] px-[7px] rounded-sm py-[3px]"
                        type="text"
                        placeholder="enter your name"
                    />
                </label>

                <label className="flex flex-col">
                    <span className="mb-[2px]">Password</span>
                    <input
                        className="outline outline-[1px] outline-neutral-900 focus:outline-[2px] px-[7px] rounded-sm py-[3px]"
                        type="text"
                        placeholder="enter your password"
                    />
                </label>

                <button className="mt-[10px] mb-[10px] text-white bg-neutral-700 py-[5px] rounded-md hover:bg-neutral-500 active:scale-[0.98] transition-all duration-100">
                    Login
                </button>
            </form>
        </div>
    );
}
