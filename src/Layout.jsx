import { Outlet } from "react-router-dom"
import Header from "./components/Header/Header"
// import Footer from "./components/Footer/Footer"


const Layout = () => {

    return (
        <>
            <section className="relative min-h-screen mx-auto overflow-x-hidden max-w-screen-2xl">
                <Header />
                <div className="px-2 mt-24">
                    <Outlet />
                </div>
                {/* <Footer /> */}
            </section>
        </>
    )
}

export default Layout