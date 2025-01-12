import { Outlet } from "react-router-dom"
import Header from "./components/Header/Header"
import { SideBar } from "./components/SideBar/SideBar"
import Footer from "./components/Footer/Footer"


const Layout = () => {

    return (
        <>
            <section className="flex flex-col mx-auto overflow-y-scroll h-svh max-w-screen-2xl">
                <div className="flex flex-col w-full">
                    <Header />
                    <div className="absolute left-0 right-0 border-b z-[100] top-16" />
                </div>
                <div className="flex flex-grow overflow-y-scroll">
                    <div className="hidden sm:block">
                        <SideBar />
                    </div>
                    <div className="w-full p-2 overflow-y-scroll overflow-x-clip">
                        <Outlet />
                    </div>
                </div>
                <Footer />
            </section>
        </>
    )
}

export default Layout