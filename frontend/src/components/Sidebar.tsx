import { LogoIcon } from "../icons/LogoIcon";
import TwitterIcon from "../icons/TwitterIcon";
import YoutubeIcon from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

export function Sidebar() {
    return <div className="w-56 border-r-2 h-screen fixed">
        <div className="font-bold text-2xl flex items-center gap-2 pt-4 ps-2 ">
            <LogoIcon />
           Brain Out
        </div>
        <div className="ms-6 me-4 mt-4 flex flex-col ">
        <SidebarItem text="Tweets" icon={<TwitterIcon />} />
        <SidebarItem text="Videos" icon={<YoutubeIcon />} />
        </div>
    </div>
}