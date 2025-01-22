import { Outlet } from "react-router-dom"
import Header from "./components/Header/Header"
import { SideBar } from "./components/SideBar/SideBar"
import Footer from "./components/Footer/Footer"


const Layout = () => {

    return (
        <>
            <section className="flex flex-col mx-auto overflow-y-scroll h-svh">
                <div className="flex flex-col w-full">
                    <Header />
                    <div className="absolute left-0 right-0 border-b z-[100] top-16" />
                </div>
                <div className="relative flex flex-grow w-full mx-auto overflow-y-scroll max-w-screen-2xl">
                    <div className="absolute top-0 left-0 z-10 hidden h-full sm:block">
                        <SideBar />
                    </div>
                    <div className="flex flex-col flex-grow w-full h-full p-2 overflow-x-auto overflow-y-scroll sm:ml-14 max-sm:pb-20">
                        <Outlet />
                    </div>
                </div>
                <Footer />
            </section>
        </>
    )
}

export default Layout