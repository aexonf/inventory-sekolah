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
    Popover,
    PopoverContent,
    PopoverTrigger,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
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
import ItemImport from "../excel/ImportItem";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export function DialogImportExcel() {
    const [openModal, setOpenModal] = useState(false);

    const downloadTemplate = () => {
        // Data template dengan header dan gaya bold
        const rowHeader = [
            [
                { v: "number_id", s: { font: { bold: true } } },
                { v: "name", s: { font: { bold: true } } },
            ],
            ["", ""],
        ];

        // Membuat worksheet dari data
        const worksheet = XLSX.utils.aoa_to_sheet(rowHeader);

        // Mengatur format kolom A sebagai teks
        const range = XLSX.utils.decode_range(worksheet["!ref"]);
        for (let row = range.s.r + 1; row <= range.e.r; row++) {
            const cellAddress = XLSX.utils.encode_cell({ r: row, c: 0 });
            if (!worksheet[cellAddress]) {
                worksheet[cellAddress] = { t: "s" }; // Menambahkan cell kosong sebagai teks
            }
            worksheet[cellAddress].z = "@";
        }

        // Membuat workbook dan menambahkan worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Template");

        // Menulis workbook ke buffer
        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });

        // Membuat blob dari buffer dan mengunduhnya
        const blobData = new Blob([excelBuffer], {
            type: "application/octet-stream",
        });
        saveAs(blobData, "inventory_item_template.xlsx");
    };

    return (
        <>
            <Toaster richColors position="top-center" />
            <Popover open={openModal} onOpenChange={setOpenModal}>
                <PopoverTrigger className="flex items-center gap-1 bg-violet-500 text-white py-[5px] text-[14px] px-[15px] rounded-[20px] hover:bg-violet-400">
                    <FiPlus className="h-[16px] w-[16px] " />{" "}
                    <span className="mt-[3px]">Import</span>
                </PopoverTrigger>
                <PopoverContent className="p-0 py-[10px] px-[10px] max-w-max">
                    <Tabs defaultValue="import" className="">
                        <TabsList className="w-full">
                            <TabsTrigger value="download" className="w-full">
                                Unduh
                            </TabsTrigger>
                            <TabsTrigger value="import" className="w-full">
                                Import
                            </TabsTrigger>
                            <TabsTrigger value="export" className="w-full">
                                Export
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent className="w-[260px]" value="download">
                            <Button
                                onClick={downloadTemplate}
                                className="w-full text-center py-2"
                            >
                                Unduh Template
                            </Button>
                        </TabsContent>
                        <TabsContent className="w-[260px]" value="import">
                            <ImportItem />
                        </TabsContent>
                        <TabsContent className="w-[260px]" value="export">
                            Export Data
                        </TabsContent>
                    </Tabs>
                </PopoverContent>
            </Popover>
        </>
    );
}

function ImportItem() {
    const [data, setData] = useState([]);
    const [fileName, setFileName] = useState({ name: "" });
    const [errors, setErrors] = useState({});
    const inventoryToken = Cookies.get("inventory_token");
    const { refresh } = useItemRefresher();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFileName({ name: file.name });
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const binaryStr = e.target.result;
                const workbook = XLSX.read(binaryStr, { type: "binary" });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(sheet);
                setData(jsonData);
            };
            reader.readAsBinaryString(file);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (data.length !== 0) {
            try {
                const body = {
                    data: data,
                };
                const { data: response } = await axios.post(
                    "/api/upload-json",
                    body,
                    {
                        headers: {
                            Authorization: `Bearer ${inventoryToken}`,
                        },
                    }
                );

                refresh();
            } catch (error) {
                console.error("Error:", error);
            }
        }
    };

    return (
        <form className="w-full" onSubmit={handleSubmit}>
            <label className="block w-full" htmlFor="excel-file">
                <input
                    className="hidden"
                    id="excel-file"
                    type="file"
                    onChange={handleFileChange}
                    accept=".xlsx"
                />
                <div className="h-[100px] flex justify-center items-center w-full border border-dashed border-gray-300 mt-[10px] rounded-sm">
                    <p>
                        {fileName.name === ""
                            ? "Choose Excel File"
                            : fileName.name}
                    </p>
                </div>
            </label>

            {errors.file && <div>{errors.file}</div>}
            <div className="flex justify-end mt-[10px]">
                <Button
                    className="transition-all duration-200 active:scale-[0.96] p-0 h-auto py-[7px] px-[15px]"
                    type="submit"
                >
                    Import
                </Button>
            </div>
        </form>
    );
}
