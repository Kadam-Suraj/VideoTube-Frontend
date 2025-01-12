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
        <footer className="absolute bottom-0 left-0 right-0 flex items-center h-16 p-3 border-t bg-background/80 shrink-0 justify-evenly sm:hidden backdrop-blur">
            {
                footerMenu.map((item, idx) =>
                    <div key={idx}>
                        <NavLink to={item.link} className={`${({ isActive }) => isActive ? " text-blue-500 underline underline-offset-4 " : ""} flex flex-col items-center text-accent-foreground`}>
                            <span className="">
                                {item.ele}
                            </span>
                            <span className="text-accent-foreground">
                                {item.name}
                            </span>
                        </NavLink>
                    </div>)
            }
        </footer>
    )
}

export default Footer