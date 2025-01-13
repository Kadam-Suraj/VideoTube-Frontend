import { NavLink } from "react-router-dom"
import { menuOptions } from "../SideBar/SideBar"

const Footer = () => {

    return (
        <footer className="absolute bottom-0 left-0 right-0 flex items-center h-16 gap-2 p-3 border-t bg-background/80 shrink-0 justify-evenly sm:hidden backdrop-blur">
            {
                menuOptions.map((item, idx) =>
                    <div key={idx}>
                        <NavLink to={item.link} className={({ isActive }) => `${isActive && "!opacity-100"} opacity-50 transition-all duration-500 flex flex-col items-center`}>
                            {item.ele}
                            <span className="text-sm font-semibold">
                                {item.name}
                            </span>
                        </NavLink>
                    </div>)
            }
        </footer>
    )
}

export default Footer