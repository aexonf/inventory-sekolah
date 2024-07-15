import React, { useRef } from "react";
import Layout from "./Layout";
import { FiPlus } from "react-icons/fi";
import TableItem from "@/components/dashboard/item/table/tableItem";
import { ItemRefresherProvider } from "@/lib/context/refresherItem";

const itemData = {
    id: 6,
    id_number: "112121212121",
    name: "hello cuy",
    description:
        "wkwkwkkwkwk k kk k kkkkkkkkk kkkkjjjj jjjjjjjjjjjjjjjjjjjj jjj",
    stock: 100,
    status: "available",
    categories_id: 13,
    created_at: "2024-07-11T02:28:30.000000Z",
    updated_at: "2024-07-15T03:22:50.000000Z",
    image: null,
};

function Setting() {
    const getLongestLine = () => {
        let longestLine = "";
        Object.values(itemData).forEach((value) => {
            const stringValue = String(value);
            if (stringValue.length > longestLine.length) {
                longestLine = stringValue;
            }
        });
        return longestLine;
    };

    const generatePDF = async () => {
        const doc = new jsPDF();

        // Calculate content width based on longest line of text
        const longestLine = getLongestLine();
        const textWidth =
            (doc.getStringUnitWidth(longestLine) * doc.internal.getFontSize()) /
            doc.internal.scaleFactor;

        // Card layout parameters
        const cardWidth = Math.max(textWidth + 60, 180); // Minimum width for content plus QR code
        const cardHeight = 100;
        const margin = 10;
        const qrCodeSize = 60;
        const imageWidth = 60;
        const imageHeight = 60;

        // Border for card
        doc.rect(margin, margin, cardWidth, cardHeight); // x, y, width, height

        // Generate QR code and add it to PDF
        const qrCodeDataURL = await QRCode.toDataURL(String(itemData.id));
        doc.addImage(
            qrCodeDataURL,
            "PNG",
            margin + 5,
            margin + 5,
            qrCodeSize,
            qrCodeSize
        );

        // Add image
        if (itemData.image) {
            doc.addImage(
                itemData.image,
                "PNG",
                margin + qrCodeSize + 15,
                margin + 5,
                imageWidth,
                imageHeight
            );
        }

        // Text for item details
        const textX = margin + qrCodeSize + 15;
        let customTextX = margin + qrCodeSize + 15;
        const textY = margin + 10;

        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        const trimmedDescription =
            itemData.description.length > 30
                ? `${itemData.description.substring(0, 30)}...`
                : itemData.description;

        doc.text(`ID: ${itemData.id}`, textX, textY);
        doc.text(`ID Number: ${itemData.id_number}`, textX, textY + 10);
        doc.text(`Name: ${itemData.name}`, textX, textY + 20);
        doc.text(`Description: ${trimmedDescription}`, textX, textY + 30);
        doc.text(`Stock: ${itemData.stock}`, textX, textY + 40);
        doc.text(`Status: ${itemData.status}`, textX, textY + 50);
        doc.text(`Categories ID: ${itemData.categories_id}`, textX, textY + 60);
        doc.text(`Created At: ${itemData.created_at}`, textX, textY + 70);
        doc.text(`Updated At: ${itemData.updated_at}`, textX, textY + 80);

        // Download PDF
        doc.save("item_card.pdf");
    };

    return (
        <ItemRefresherProvider>
            <div className="relative w-full">
                <div className="absolute top-[-40px] w-full px-[20px]">
                    <div className="bg-white shadow-[3px_3px_20px_-2px_#00000024]  py-[20px] rounded-md px-[20px]">
                        <h1 className="text-[20px]">Item</h1>
                        {/* <img
                            src="/storage/upload/teacher/HxMnlkub-favicon-32x32.png"
                            alt=""
                        /> */}
                    </div>
                </div>
                <div className="pt-[70px] px-[20px]">
                    <div className="pt-[0px] px-[50px] shadow-[5px_5px_30px_-5px_#00000024]">
                        <TableItem />
                    </div>
                </div>
            </div>
        </ItemRefresherProvider>
    );
}

Setting.layout = (page) => <Layout children={page} title="Welcome" />;

export default Setting;
