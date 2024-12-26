import { ReactElement } from "react";


export function SidebarItem({text, icon}: {
    text: string;
    icon: ReactElement
}) {

    return <div className="flex items-center gap-3 p-2 ps-4 py-3 cursor-pointer hover:bg-slate-200 duration-200 transition rounded">
        {icon} {text}
     </div>

}