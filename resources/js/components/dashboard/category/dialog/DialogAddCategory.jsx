import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
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
} from "../../../ui";
import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Inertia } from "@inertiajs/inertia";
import Cookies from "js-cookie";
import { Toaster, toast } from "sonner";
import { Info } from "lucide-react";
import { z } from "zod";
import { FiPlus } from "react-icons/fi";

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Name is Empty",
    }),
});

export function DialogAddCategory() {
    const [openModal, setOpenModal] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });
    const inventoryToken = Cookies.get("inventory_token");

    const onSubmit = async (data) => {
        const body = {
            name: data.name,
        };

        try {
            const { data: postCategory } = await axios.post(
                "/api/v1/categories",
                body,
                {
                    headers: {
                        Authorization: `Bearer ${inventoryToken}`,
                    },
                }
            );
        } catch (error) {
            console.log(error);
            if (error.response?.data?.message === "Unauthenticated.") {
                Inertia.visit("/login");
                setIsVerifyLoading(false);
                return;
            }
        }
    };

    return (
        <Dialog>
            <DialogTrigger className="flex items-center gap-1 bg-violet-500 text-white py-[5px] text-[14px] px-[15px] rounded-[20px] hover:bg-violet-400">
                <FiPlus className="h-[16px] w-[16px] " />{" "}
                <span className="mt-[3px]">Tambah</span>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <h1 className="text-center mb-[20px] text-[20px] font-semibold text-neutral-700">
                            Add Category
                        </h1>
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col gap-8 rounded-md px-[30px] w-full"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="space-y-0">
                                    <FormLabel className="text-[16px] text-neutral-800 leading-3 mb-[6px]">
                                        Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Name. . ."
                                            {...field}
                                            className={`${
                                                form.formState.errors.name &&
                                                "outline-red-500 focus:outline-red-400"
                                            }`}
                                        />
                                    </FormControl>
                                    {form.formState.errors.name && (
                                        <div className=" pt-[5px] text-red-500 leading-none flex items-center gap-1">
                                            <Info size={14} />
                                            <FormMessage className="text-[13px] mt-[3px] leading-none" />
                                        </div>
                                    )}
                                </FormItem>
                            )}
                        />

                        <div className="flex gap-7  w-full">
                            <Button
                                className="w-full bg-[#A27FFE] mt-[50px] hover:bg-[#b295fb]"
                                // disable={isLoading}
                                type="button"
                                onClick={() => setOpenModal(false)}
                            >
                                <span className="text-lg">Cancel</span>
                            </Button>
                            <Button
                                className="w-full bg-[#A27FFE] mt-[50px] hover:bg-[#b295fb]"
                                // disable={isLoading}
                                type="submit"
                            >
                                <span className="text-lg">Add</span>
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
