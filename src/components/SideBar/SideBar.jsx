import { CircleHelp, FolderClosed, History, House, PanelsTopLeft, Settings, UserRoundCheck } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { NavLink } from "react-router-dom";

let menuOptions = [
    {
        ele: <House />,
        name: "Home",
        link: "/"
    },
    {
        ele: <History />,
        name: "History",
        link: "/history"
    },
    {
        ele: <FolderClosed />,
        name: "Collections",
        link: "/collections"
    },
    {
        ele: <UserRoundCheck />,
        name: "Subscribers",
        link: "/subscribers"
    }
]
const SideBar = () => {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const sideBarRef = useRef(null);

    const newMenuOptions = [
        {
            ele: <CircleHelp />,
            name: "Support",
            link: "/support"
        },
        {
            ele: <Settings />,
            name: "Settings",
            link: "/settings"
        }
    ]

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                sideBarRef.current &&
                !sideBarRef.current.contains(event.target) // Check if click is outside
            ) {
                setIsSideBarOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside); // Add click listener
        return () => {
            document.removeEventListener("mousedown", handleClickOutside); // Cleanup listener
        };
    }, []);

    return (
        <aside ref={sideBarRef} className={`flex flex-col items-start h-full bg-background/80 backdrop-blur group space-y-8 p-4 border-r transition-all duration-500 ${isSideBarOpen ? "w-60" : "w-14"} hover:w-60 gap-3 overflow-hidden`}>
            <PanelsTopLeft onClick={() => setIsSideBarOpen(!isSideBarOpen)} className={`cursor-pointer transition-all duration-500 opacity-50 group-hover:opacity-100 ${isSideBarOpen && "opacity-100"}`} />
            <div className="flex flex-col justify-between h-full gap-5">
                <div className="flex flex-col gap-5">
                    {
                        menuOptions.map((item, idx) =>
                            <MenuOptionsPanel key={idx} item={item} />
                        )
                    }
                </div>
                <div className="flex flex-col gap-5 mb-5">
                    {
                        newMenuOptions.map((item, idx) =>
                            <MenuOptionsPanel key={idx} item={item} />
                        )
                    }
                </div>
            </div>
        </aside>
    )
}

import PropTypes from "prop-types"
const MenuOptionsPanel = ({ item }) => {
    return (
        <NavLink to={item.link} className={({ isActive }) => `${isActive && "opacity-100"} opacity-50 hover:opacity-100 transition-all duration-200 flex items-center gap-5`}>
            {item.ele}
            <span className="font-semibold ">
                {item.name}
            </span>
        </NavLink>
    )
}

MenuOptionsPanel.propTypes = {
    item: PropTypes.shape({
        ele: PropTypes.any,
        name: PropTypes.string,
        link: PropTypes.string
    })
}

export { SideBar, menuOptions, MenuOptionsPanel }