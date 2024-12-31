import { ModeToggle } from "../mode-toggle"
import { Video } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import ProfileMenu from "../Profile/ProfileMenu"
import { useAuth } from "@/context/AuthContext"
import ContinueSession from "../Profile/ContinueSession"

const Header = () => {
    const { isLoggedIn } = useAuth();
    let location = useLocation();

    return (
        <section className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center h-16 px-4 mx-auto bg-background">
            <header className="flex items-center justify-between w-full max-w-screen-2xl">
                <div className="flex items-center gap-3 text-2xl font-semibold">
                    <NavLink to={"/"} className={"flex items-center gap-3"}>
                        <Video className="transition-transform duration-300 hover:scale-110 hover:rotate-6" />
                        VideoTube
                    </NavLink>
                </div>
                <nav className="flex items-center justify-between gap-5">
                    <ul>
                        {
                            (!isLoggedIn && !(location.pathname === "/login")) &&
                            <ContinueSession />
                        }
                        {
                            (isLoggedIn && !(location.pathname === "/login")) &&
                            <ProfileMenu />
                        }
                    </ul>
                    <ModeToggle />
                </nav>
            </header >
        </section>
    )
}

export default Header