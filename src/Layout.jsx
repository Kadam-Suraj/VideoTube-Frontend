import { Outlet } from "react-router-dom"
import Header from "./components/Header/Header"
import { SideBar } from "./components/SideBar/SideBar"
import Footer from "./components/Footer/Footer"


const Layout = () => {

    return (
        <>
            <section className="relative h-screen mx-auto overflow-x-hidden overflow-y-scroll max-w-screen-2xl">
                <Header />
                <div className="absolute left-0 right-0 border-b top-16" />
                <div className="flex relative sm:max-h-[calc(100vh-4rem)] max-h-[calc(100vh-8rem)] overflow-y-scroll">
                    <div className="relative left-0 hidden sm:block">
                        <SideBar />
                    </div>
                    <div className="w-full px-2 py-5 overflow-y-scroll">
                        <Outlet />
                    </div>
                </div>
                <Footer />
            </section>
        </>
    )
}

export default Layout