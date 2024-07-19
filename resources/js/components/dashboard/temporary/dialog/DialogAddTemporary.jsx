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

const formSchema = z.object({
    number_id: z.string().min(1, {
        message: "Number Id is Empty",
    }),
    item_id: z.string().min(1, {
        message: "Item is Empty",
    }),
    name: z.string().min(1, {
        message: "Name is Empty",
    }),
    phone: z.string().min(1, {
        message: "Phone is Empty",
    }),
    student_class: z.string().min(1, {
        message: "Class is Empty",
    }),
    level: z.string().min(1, {
        message: "Level is Empty",
    }),
});

const dummyItem = [
    {
        name: "Laptop Acer",
        id: "123",
    },
    {
        name: "Laptop Macbook",
        id: "123666",
    },
];

export function DialogAddTemporary() {
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
            item_id: "",
            number_id: "",
            name: "",
            phone: "",
            student_class: "",
            level: "",
        },
    });
    const inventoryToken = Cookies.get("inventory_token");
    const { refresh } = useItemRefresher();

    const onSubmit = async (data) => {
        const { item_id, number_id, name, phone, student_class, level } = data;
        const parseObject = JSON.parse(item_id);
        const body = {
            id_item: parseObject.id,
            item_name: parseObject.name,
            id_number: number_id,
            name: name,
            phone: phone,
            student_class: student_class,
            level: level,
        };
        console.log(body);

        // try {
        //     const { data: getUser } = await axios.post(
        //         "/api/v1/items",
        //         formData,
        //         {
        //             headers: {
        //                 Authorization: `Bearer ${inventoryToken}`,
        //                 "Content-Type": "multipart/form-data",
        //             },
        //         }
        //     );
        //     setOpenModal(false);
        //     form.reset();
        //     toast.success("Success Add Categories", {
        //         duration: 3000,
        //     });
        //     refresh();
        // } catch (error) {
        //     toast.error("Failed Add Categories", {
        //         duration: 3000,
        //     });
        //     console.log(error);
        //     if (error.response?.data?.message === "Unauthenticated.") {
        //         Inertia.visit("/login");
        //         setIsVerifyLoading(false);
        //         return;
        //     }
        // }
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const getAllCategory = async () => {
        try {
            const { data: getCategory } = await axios("/api/v1/categories", {
                headers: {
                    Authorization: `Bearer ${inventoryToken}`,
                },
            });
            setListcategory(getCategory?.data);
        } catch (error) {
            console.log(error);
        }
    };

    // useEffect(() => {
    //     getAllCategory();
    // }, []);

    useEffect(() => {
        if (!openModal) {
            form.reset();
            setImageFile(null);
        }
    }, [openModal]);

    return (
        <>
            <Toaster richColors position="top-center" />
            <Dialog open={openModal} onOpenChange={setOpenModal}>
                <DialogTrigger className="flex items-center gap-1 bg-violet-500 text-white py-[5px] text-[14px] px-[15px] rounded-[20px] hover:bg-violet-400">
                    <FiPlus className="h-[16px] w-[16px] " />{" "}
                    <span className="mt-[3px]">Tambah</span>
                </DialogTrigger>
                <DialogContent className="py-[25px] px-[23px] h-auto max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle>
                            <h1 className="text-center mb-[20px] text-[20px] font-semibold text-neutral-700">
                                Add Temporary
                            </h1>
                        </DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex flex-col gap-8 rounded-md w-full"
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
                                name="item_id"
                                render={({ field }) => {
                                    console.log(JSON.stringify(field.value));
                                    return (
                                        <FormItem className="space-y-0">
                                            <FormLabel className="text-[16px] text-neutral-800 leading-3 mb-[6px]">
                                                Item
                                            </FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value.name}
                                            >
                                                <FormControl>
                                                    <SelectTrigger
                                                        className={`${
                                                            form.formState
                                                                .errors
                                                                .item_id &&
                                                            "outline-red-500 focus:outline-red-400"
                                                        }`}
                                                    >
                                                        <SelectValue
                                                            placeholder="Select Item"
                                                            className=""
                                                        />
                                                    </SelectTrigger>
                                                </FormControl>

                                                <SelectContent className="max-h-[140px] overflow-auto">
                                                    {/* {listCategory.map(
                                                        (item, index) => (
                                                            <SelectItem
                                                                key={index}
                                                                value={`${item?.id}`}
                                                            >
                                                                {item.name}
                                                            </SelectItem>
                                                        )
                                                    )} */}
                                                    {dummyItem.map(
                                                        (item, index) => (
                                                            <SelectItem
                                                                key={index}
                                                                value={JSON.stringify(
                                                                    item
                                                                )}
                                                            >
                                                                {item.name}
                                                            </SelectItem>
                                                        )
                                                    )}
                                                    {/* <SelectItem value="PPLG 1">
                                                        PPLG 1
                                                    </SelectItem>
                                                    <SelectItem value="PPLG 2">
                                                        PPLG 2
                                                    </SelectItem>
                                                    <SelectItem value="PPLG 3">
                                                        PPLG 3
                                                    </SelectItem> */}
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
                                    );
                                }}
                            />
                            <FormField
                                control={form.control}
                                name="level"
                                render={({ field }) => {
                                    console.log(field);
                                    return (
                                        <FormItem className="space-y-0">
                                            <FormLabel className="text-[16px] text-neutral-800 leading-3 mb-[6px]">
                                                Level
                                            </FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger
                                                        className={`${
                                                            form.formState
                                                                .errors.level &&
                                                            "outline-red-500 focus:outline-red-400"
                                                        }`}
                                                    >
                                                        <SelectValue
                                                            placeholder="Select Level"
                                                            className=""
                                                        />
                                                    </SelectTrigger>
                                                </FormControl>

                                                <SelectContent className="max-h-[140px] overflow-auto">
                                                    {/* {listCategory.map(
                                                        (item, index) => (
                                                            <SelectItem
                                                                key={index}
                                                                value={`${item?.id}`}
                                                            >
                                                                {item.name}
                                                            </SelectItem>
                                                        )
                                                    )} */}
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

                                            {form.formState.errors.level && (
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
                                    return (
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

                                                <SelectContent className="max-h-[140px] overflow-auto">
                                                    {/* {listCategory.map(
                                                        (item, index) => (
                                                            <SelectItem
                                                                key={index}
                                                                value={`${item?.id}`}
                                                            >
                                                                {item.name}
                                                            </SelectItem>
                                                        )
                                                    )} */}
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
                                    );
                                }}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
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
                                                        .phone &&
                                                    "outline-red-500 focus:outline-red-400"
                                                }`}
                                                type="text"
                                            />
                                        </FormControl>
                                        {form.formState.errors.phone && (
                                            <div className=" pt-[5px] text-red-500 leading-none flex items-center gap-1">
                                                <Info size={14} />
                                                <FormMessage className="text-[13px] mt-[3px] leading-none" />
                                            </div>
                                        )}
                                    </FormItem>
                                )}
                            />

                            {/* <FormField
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
                            /> */}

                            <div className="mt-[20px] flex gap-4 justify-end w-full">
                                <Button
                                    className="max-w-max bg-[#A27FFE] hover:bg-[#b295fb]"
                                    // disable={isLoading}
                                    type="button"
                                    onClick={() => setOpenModal(false)}
                                >
                                    <span className="text-md">Cancel</span>
                                </Button>
                                <Button
                                    className="max-w-max bg-[#A27FFE] hover:bg-[#b295fb]"
                                    // disable={isLoading}
                                    type="submit"
                                >
                                    <span className="text-md">Add</span>
                                </Button>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );
}
