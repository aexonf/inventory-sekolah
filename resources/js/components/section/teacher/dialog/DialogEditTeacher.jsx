import { FaEdit } from "react-icons/fa";
import React, { useState, useEffect } from "react";
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

const formSchema = z.object({
    number_id: z.string().min(1, {
        message: "Number Id is Empty",
    }),
    name: z.string().min(1, {
        message: "Name is Empty",
    }),
    image: z.any().optional(),
});

export function DialogEditTeacher({ id, user_id, number_id, name, image }) {
    const [openModal, setOpenModal] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            number_id: number_id,
            name: name,
            image: image,
        },
    });
    const inventoryToken = Cookies.get("inventory_token");

    const onSubmit = async (data) => {
        const { number_id, name } = data;
        const formData = new FormData();
        formData.append("id_number", number_id);
        formData.append("name", name);
        if (imageFile) {
            formData.append("image", imageFile);
        }

        const body = {
            id_number: number_id,
            name: name,
        };

        try {
            const { data: getUser } = await axios.post(
                `/api/v1/teachers/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${inventoryToken}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log(getUser);
            // if (getUser.username !== "") {
            //     Inertia.visit("/");
            //     setIsVerifyLoading(false);
            // }
        } catch (error) {
            console.log(error);
            if (error.response?.data?.message === "Unauthenticated.") {
                Inertia.visit("/login");
                setIsVerifyLoading(false);
                return;
            }
        }
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    return (
        <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogTrigger className="bg-violet-500 py-[10px] px-[10px] rounded-sm">
                <FaEdit className="text-white h-[14px] w-[14px]" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <h1 className="text-center mb-[20px] text-[20px] font-semibold text-neutral-700">
                        Edit Teacher
                    </h1>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex flex-col gap-8 rounded-md px-[30px] w-full"
                        >
                            <FormField
                                control={form.control}
                                name="number_id"
                                render={({ field }) => (
                                    <FormItem className="space-y-0">
                                        <FormLabel className="text-[16px] text-neutral-800 leading-3 mb-[6px]">
                                            Number ID
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Number Id. . ."
                                                {...field}
                                                className={`${
                                                    form.formState.errors
                                                        .number_id &&
                                                    "outline-red-500 focus:outline-red-400"
                                                }`}
                                            />
                                        </FormControl>
                                        {form.formState.errors.number_id && (
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
                                                    form.formState.errors
                                                        .name &&
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

                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem className="space-y-0">
                                        <FormLabel className="text-[16px] text-neutral-800 leading-3 mb-[6px]">
                                            Image
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                            />
                                        </FormControl>
                                        {form.formState.errors.image && (
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
                                    <span className="text-lg">Update</span>
                                </Button>
                            </div>
                        </form>
                    </Form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
