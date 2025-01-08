import { ModeToggle } from "../mode-toggle"
import { ArrowLeft, Search, Video } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import ProfileMenu from "../Profile/ProfileMenu"
import { useAuth } from "@/context/AuthContext"
import ContinueSession from "../Profile/ContinueSession"
import SearchBar from "../SearchBar"
import { useState } from "react"

const Header = () => {
    const { isLoggedIn } = useAuth();
    let location = useLocation();
    const [activeSearch, setActiveSearch] = useState(false);

    return (
        <section className="flex fixed top-0 right-0 left-0 z-[100] justify-center items-center px-4 mx-auto h-16 bg-background">
            <header className="flex relative justify-between items-center space-x-2 w-full max-w-screen-2xl">
                {
                    !activeSearch &&
                    <div className="flex gap-3 items-center text-2xl font-semibold">
                        <NavLink to={"/"} className={"flex gap-3 items-center"}>
                            <Video className="transition-transform duration-300 hover:scale-110 hover:rotate-6" />
                            VideoTube
                        </NavLink>
                    </div>
                }
                <nav className="flex justify-end items-center space-x-4 w-full">
                    {
                        <div className={`flex items-center space-x-5 ${activeSearch ? "max-[640px]:w-full" : ""}`}>
                            <span className="cursor-pointer min-[640px]:hidden" onClick={() => setActiveSearch(!activeSearch)} >
                                {
                                    activeSearch ?
                                        <ArrowLeft />
                                        :
                                        <Search />
                                }
                            </span>
                            <SearchBar activeSearch={setActiveSearch} className={`right-0 left-0 top-16 w-full  ${activeSearch ? "flex" : "max-[640px]:hidden"}`} />
                        </div>
                    }
                    {
                        !activeSearch &&
                        <div className="flex gap-2 items-center">
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
                        </div>
                    }
                </nav>
            </header >
        </section>
    )
}

export default Header