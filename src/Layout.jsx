import { Outlet } from "react-router-dom"
import Header from "./components/Header/Header"
import { SideBar } from "./components/SideBar/SideBar"
import Footer from "./components/Footer/Footer"


const Layout = () => {

    return (
        <>
            <section className="mx-auto overflow-x-hidden overflow-y-scroll max-h-svh max-w-screen-2xl">
                <Header />
                <div className="absolute left-0 right-0 border-b top-16" />
                <div className="flex">
                    <div className="hidden sm:block">
                        <SideBar />
                    </div>
                    <div className="w-full sm:h-[calc(100vh-4rem)] h-[calc(100vh-8rem)] p-2 overflow-y-scroll">
                        <Outlet />
                    </div>
                </div>
                <Footer />
            </section>
        </>
    )
}

export default Layout