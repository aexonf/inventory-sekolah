import React, { useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import { useItemRefresher } from "@/lib/context/refresherItem";
import Cookies from "js-cookie";

const ItemImport = () => {
    const [data, setData] = useState([]);
    const [errors, setErrors] = useState({});
    const inventoryToken = Cookies.get("inventory_token");
    const { refresh } = useItemRefresher();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
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
    };
    console.log(data);
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="excel-file">
                <input
                    className="hidden"
                    id="excel-file"
                    type="file"
                    onChange={handleFileChange}
                    accept=".xlsx"
                />
                <span>Choose Excel File</span>
            </label>
            {errors.file && <div>{errors.file}</div>}
            <button type="submit">Import Users</button>
        </form>
    );
};

export default ItemImport;
