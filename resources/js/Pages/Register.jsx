import React from "react";

export default function Register() {
    return (
        <div class="h-screen flex justify-center items-center">
            <form
                class="flex flex-col gap-5 border-[1.5px] rounded-md border-solid border-neutral-800 px-[30px] py-[20px]"
                action=""
            >
                <h1 class="text-center text-neutral-900 text-2xl">Register</h1>

                <label class="flex flex-col">
                    <span class="mb-[2px]">Username</span>
                    <input
                        class="outline outline-[1px] outline-neutral-900 focus:outline-[2px] px-[7px] rounded-sm py-[3px]"
                        type="text"
                        placeholder="enter your name"
                    />
                </label>

                <label class="flex flex-col">
                    <span class="mb-[2px]">Create Password</span>
                    <input
                        class="outline outline-[1px] outline-neutral-900 focus:outline-[2px] px-[7px] rounded-sm py-[3px]"
                        type="text"
                        placeholder="enter your password"
                    />
                </label>

                <label class="flex flex-col">
                    <span class="mb-[2px]">Confirm Password</span>
                    <input
                        class="outline outline-[1px] outline-neutral-900 focus:outline-[2px] px-[7px] rounded-sm py-[3px]"
                        type="text"
                        placeholder="enter your password"
                    />
                </label>

                <button class="mt-[10px] mb-[10px] text-white bg-neutral-700 py-[5px] rounded-md hover:bg-neutral-500 active:scale-[0.98] transition-all duration-100">
                    Register
                </button>
            </form>
        </div>
    );
}
