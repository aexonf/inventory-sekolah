import React from "react";
import Layout from "./Layout";
import { FiPlus } from "react-icons/fi";
import TableItem from "@/components/dashboard/item/table/tableItem";
import { ItemRefresherProvider } from "@/lib/context/refresherItem";

function Setting() {
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
