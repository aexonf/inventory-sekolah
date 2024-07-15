import React from "react";
import { IoQrCode } from "react-icons/io5";
import jsPDF from "jspdf";
import QRCode from "qrcode";

export function ButtonDownloadPdf({ row }) {
    const getLongestLine = () => {
        let longestLine = "";
        Object.values(row).forEach((value) => {
            const stringValue = String(value);
            if (stringValue.length > longestLine.length) {
                longestLine = stringValue;
            }
        });
        return longestLine;
    };

    const generatePDF = async () => {
        const doc = new jsPDF();

        const longestLine = getLongestLine();
        const textWidth =
            (doc.getStringUnitWidth(longestLine) * doc.internal.getFontSize()) /
            doc.internal.scaleFactor;

        const cardWidth = Math.max(textWidth + 60, 180);
        const cardHeight = 100;
        const margin = 10;
        const qrCodeSize = 60;

        doc.rect(margin, margin, cardWidth, cardHeight);

        const qrCodeDataURL = await QRCode.toDataURL(String(row.id));
        doc.addImage(
            qrCodeDataURL,
            "PNG",
            margin + 5,
            margin + 5,
            qrCodeSize,
            qrCodeSize
        );

        const textX = margin + qrCodeSize + 15;
        let customTextX = margin + qrCodeSize + 15;
        const textY = margin + 10;

        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        const trimmedDescription =
            row?.description?.length > 30
                ? `${row.description.substring(0, 30)}...`
                : row.description;

        doc.text(`ID: ${row.id}`, textX, textY);
        doc.text(`ID Number: ${row.id_number}`, textX, textY + 10);
        doc.text(`Name: ${row.name}`, textX, textY + 20);
        doc.text(`Description: ${trimmedDescription}`, textX, textY + 30);
        doc.text(`Stock: ${row.stock}`, textX, textY + 40);
        doc.text(`Status: ${row.status}`, textX, textY + 50);
        doc.text(`Categories ID: ${row.categories_id}`, textX, textY + 60);
        doc.text(`Created At: ${row.created_at}`, textX, textY + 70);
        doc.text(`Updated At: ${row.updated_at}`, textX, textY + 80);

        doc.save(`${row.name}`);
    };

    return (
        <button onClick={generatePDF}>
            <IoQrCode />
        </button>
    );
}
