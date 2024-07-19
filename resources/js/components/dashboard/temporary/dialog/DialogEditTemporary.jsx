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
import { useItemRefresher } from "@/lib/context/refresherItem";

const formSchema = z.object({
    number_id: z.string().min(1, {
        message: "Number Id is Empty",
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
    item: z.string().min(1, {
        message: "Item is Empty",
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

export function DialogEditTemporary({ row }) {
    const [openModal, setOpenModal] = useState(false);
    const [listItems, setListItems] = useState([]);
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
            item: JSON.stringify({
                name: row?.item_name,
                id: row?.item_id,
                id_number: row?.item_number_id,
            }),
            number_id: row.number_id,
            name: row.name,
            phone: row.phone,
            student_class: row.student_class,
            level: row.level,
        },
    });
    const inventoryToken = Cookies.get("inventory_token");
    const { refresh } = useItemRefresher();

    const onSubmit = async (data) => {
        const {
            item,
            number_id,
            name,
            phone,
            student_class,
            level,
            item_number,
        } = data;

        const parseObject = JSON.parse(item);
        const body = {
            item_id: `${parseObject.id}`,
            item_name: parseObject.name,
            number_id: number_id,
            name: name,
            phone: phone,
            student_class: student_class,
            level: level,
            item_number_id: parseObject.id_number,
        };

        try {
            const { data: updateItem } = await axios.put(
                `/api/v1/temporary/${row.id}`,
                body,
                {
                    headers: {
                        Authorization: `Bearer ${inventoryToken}`,
                    },
                }
            );
            setOpenModal(false);
            toast.success("Success Update Temporary", {
                duration: 3000,
            });
            refresh();
        } catch (error) {
            toast.error("Failed Update Temporary", {
                duration: 3000,
            });
            console.log(error);
            if (error.response?.data?.message === "Unauthenticated.") {
                Inertia.visit("/login");
                setIsVerifyLoading(false);
                return;
            }
        }
    };

    // const getAllCategory = async () => {
    //     try {
    //         const { data: getCategory } = await axios(`/api/v1/categories`, {
    //             headers: {
    //                 Authorization: `Bearer ${inventoryToken}`,
    //             },
    //         });
    //         setListcategory(getCategory?.data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const getAllItems = async () => {
        try {
            const { data: getItems } = await axios(`/api/v1/items`, {
                headers: {
                    Authorization: `Bearer ${inventoryToken}`,
                },
            });
            console.log(getItems);
            const mapping = getItems?.data?.map((item) => {
                return {
                    name: item.name,
                    id: item.id,
                    id_number: item.id_number,
                };
            });
            setListItems(mapping);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (openModal) {
            // getAllCategory();
            getAllItems();
        }
    }, [openModal]);

    useEffect(() => {
        if (!openModal) {
            form.reset();
            //  setImageFile(null);
        }
    }, [openModal]);

    // console.log(listItems);
    return (
        <>
            <Toaster richColors position="top-center" />
            <Dialog open={openModal} onOpenChange={setOpenModal}>
                <DialogTrigger className="bg-violet-500 py-[10px] px-[10px] rounded-sm">
                    <FaEdit className="text-white h-[14px] w-[14px]" />
                </DialogTrigger>
                <DialogContent className="py-[25px] px-[23px] h-auto max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle>
                            <h1 className="text-center mb-[20px] text-[20px] font-semibold text-neutral-700">
                                Edit Temporary
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
                                name="item"
                                render={({ field }) => {
                                    console.log("ini loh wwkkwkw:", field);
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
                                                                .errors.item &&
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
                                                    {listItems.map(
                                                        (item, index) => (
                                                            <SelectItem
                                                                key={index}
                                                                value={JSON.stringify(
                                                                    {
                                                                        name: item.name,
                                                                        id_number:
                                                                            item.id_number,
                                                                        id: item.id,
                                                                    }
                                                                )}
                                                            >
                                                                {item.name}
                                                            </SelectItem>
                                                        )
                                                    )}
                                                </SelectContent>
                                            </Select>

                                            {form.formState.errors.item && (
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
                                            Phone
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Phone. . ."
                                                {...field}
                                                className={`${
                                                    form.formState.errors
                                                        .phone &&
                                                    "outline-red-500 focus:outline-red-400"
                                                }`}
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
                                    <span className="text-md">Update</span>
                                </Button>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );
}
