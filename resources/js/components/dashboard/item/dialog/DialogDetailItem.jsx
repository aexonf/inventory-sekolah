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
import { FiPlus } from "react-icons/fi";
import { useItemRefresher } from "@/lib/context/refresherItem";
import { IoEyeSharp } from "react-icons/io5";

const formSchema = z.object({
    number_id: z.string().min(1, {
        message: "Number Id is Empty",
    }),
    name: z.string().min(1, {
        message: "Name is Empty",
    }),
    description: z.string().min(1, {
        message: "Description is Empty",
    }),
    stock: z.string().min(1, {
        message: "Stock is Empty",
    }),
    category: z.string().min(1, {
        message: "Category is Empty",
    }),
    image: z.any().optional(),
});

export function DialogDetailItem({ row }) {
    const [openModal, setOpenModal] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [listCategory, setListcategory] = useState([]);
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            number_id: "",
            name: "",
            description: "",
            stock: "",
            category: "",
            image: "",
        },
    });
    const inventoryToken = Cookies.get("inventory_token");
    const { refresh } = useItemRefresher();
    const [category, setCategory] = useState(``);

    const getDetailCategory = async () => {
        try {
            const { data: getCategory } = await axios(
                `/api/v1/categories/${row.categories_id}`,
                {
                    headers: {
                        Authorization: `Bearer ${inventoryToken}`,
                    },
                }
            );
            setCategory(getCategory?.data.name);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (openModal) {
            getDetailCategory();
        }
    }, [openModal === true]);

    return (
        <>
            <Toaster richColors position="top-center" />
            <Dialog open={openModal} onOpenChange={setOpenModal}>
                <DialogTrigger className="bg-violet-500 py-[10px] px-[10px] rounded-sm">
                    <IoEyeSharp className="text-white h-[14px] w-[14px]" />
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            <h1 className="text-center mb-[20px] text-[20px] font-semibold text-neutral-700">
                                Detail Item
                            </h1>
                        </DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-8 rounded-md px-[30px] w-full">
                        <div>
                            <h1>Number ID:</h1>
                            <p>{row.id_number}</p>
                        </div>
                        <div>
                            <h1>Name:</h1>
                            <p>{row.name}</p>
                        </div>
                        <div>
                            <h1>Description:</h1>
                            <p>{row.description}</p>
                        </div>
                        <div>
                            <h1>Stock:</h1>
                            <p>{row.stock}</p>
                        </div>
                        <div>
                            <h1>Category:</h1>
                            <p>{category}</p>
                        </div>
                        <div>
                            <h1>Image:</h1>

                            {row.image === "" || row.image === null ? (
                                <p>-</p>
                            ) : (
                                <img
                                    src={`/storage/upload/items/${row.image}`}
                                />
                            )}
                        </div>
                    </div>
                    {/* <Form {...form}>
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
                                name="description"
                                render={({ field }) => (
                                    <FormItem className="space-y-0">
                                        <FormLabel className="text-[16px] text-neutral-800 leading-3 mb-[6px]">
                                            Description
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Description. . ."
                                                {...field}
                                                className={`${
                                                    form.formState.errors
                                                        .description &&
                                                    "outline-red-500 focus:outline-red-400"
                                                }`}
                                            />
                                        </FormControl>
                                        {form.formState.errors.description && (
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
                                name="stock"
                                render={({ field }) => (
                                    <FormItem className="space-y-0">
                                        <FormLabel className="text-[16px] text-neutral-800 leading-3 mb-[6px]">
                                            Stock
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Stock. . ."
                                                {...field}
                                                className={`${
                                                    form.formState.errors
                                                        .stock &&
                                                    "outline-red-500 focus:outline-red-400"
                                                }`}
                                                type="text"
                                            />
                                        </FormControl>
                                        {form.formState.errors.stock && (
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
                                name="category"
                                render={({ field }) => {
                                    console.log(field);
                                    return (
                                        <FormItem className="space-y-0">
                                            <FormLabel className="text-[16px] text-neutral-800 leading-3 mb-[6px]">
                                                Category
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
                                                                .category &&
                                                            "outline-red-500 focus:outline-red-400"
                                                        }`}
                                                    >
                                                        <SelectValue
                                                            placeholder="Select Category"
                                                            className=""
                                                        />
                                                    </SelectTrigger>
                                                </FormControl>

                                                <SelectContent>
                                                    {listCategory.map(
                                                        (item, index) => (
                                                            <SelectItem
                                                                key={index}
                                                                value={`${item?.id}`}
                                                            >
                                                                {item.name}
                                                            </SelectItem>
                                                        )
                                                    )}
                                                </SelectContent>
                                            </Select>

                                            {form.formState.errors.category && (
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
                                    <span className="text-lg">Add</span>
                                </Button>
                            </div>
                        </form>
                    </Form> */}
                </DialogContent>
            </Dialog>
        </>
    );
}
