import { PanelsTopLeft } from "lucide-react"
import { useState } from "react"

const SideBar = () => {
    const [isSideBarOpen, setIsSideBarOpen] = useState(true)
    return (
        <aside className={`flex flex-col items-center h-full p-4 border-r ${isSideBarOpen ? "w-fit" : "max-w-14"} max-w-80`}>
            <PanelsTopLeft onClick={() => setIsSideBarOpen(!isSideBarOpen)} className="cursor-pointer" />
            <div>

            </div>
        </aside>
    )
}

export { SideBar }