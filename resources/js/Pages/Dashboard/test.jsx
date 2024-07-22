import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

const UploadForm = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("file", file);

        Inertia.post("/upload-excel", formData, {
            onSuccess: () => {
                alert("File uploaded successfully!");
            },
            onError: (errors) => {
                console.log(errors);
                alert("File upload failed.");
            },
        });
    };

    return (
        <div>
            <h2>Upload Excel File</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default UploadForm;
