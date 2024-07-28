import React, { useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";

const UserImport = () => {
    const [data, setData] = useState([]);
    const [errors, setErrors] = useState({});

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
            const response = await fetch("/api/upload-json", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({ data }),
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message);
            } else {
                setErrors(result.errors || {});
                alert(
                    result.error || "There was an error importing the users."
                );
            }
        } catch (error) {
            console.error("Error:", error);
            alert("There was an error importing the users.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} accept=".xlsx" />
            {errors.file && <div>{errors.file}</div>}
            <button type="submit">Import Users</button>
        </form>
    );
};

export default UserImport;
