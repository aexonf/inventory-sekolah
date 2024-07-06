import React from "react";
import Layout from "../Layout";
import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "../../components/ui/index";
import { Navigation } from "../../components/section/index";

function Test() {
    return (
        <div className="h-screen flex justify-center">
            <div className="w-[400px] py-[20px]">hhhh</div>
        </div>
    );
}

Test.layout = (page) => <Layout children={page} title="Welcome" />;

export default Test;
