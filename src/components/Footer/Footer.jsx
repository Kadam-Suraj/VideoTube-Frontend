import { FolderClosed, History, House, UserRoundCheck } from "lucide-react"
import { NavLink } from "react-router-dom"

const Footer = () => {

    const footerMenu = [
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
            name: "Collection",
            link: "/collection"
        },
        {
            ele: <UserRoundCheck />,
            name: "Subscribers",
            link: "/subscribers"
        }
    ]
    return (
        <footer className="flex items-center h-16 p-3 border-t shrink-0 justify-evenly sm:hidden">
            {
                footerMenu.map((item, idx) =>
                    <div key={idx}>
                        <NavLink to={item.link} className={`${({ isActive }) => isActive ? "font-bold" : "underline"} flex flex-col items-center`}>
                            {item.ele}
                            <span>
                                {item.name}
                            </span>
                        </NavLink>
                    </div>)
            }
        </footer>
    )
}

export default Footer