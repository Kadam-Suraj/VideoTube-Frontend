import ShowVideos from "@/components/Video/ShowVideos"
import { useAuth } from "@/context/AuthContext"
import Error from "./Error";

const Home = () => {
    const { isLoggedIn } = useAuth();

    return (
        <>
            <section className="flex flex-col m-auto">
                {
                    isLoggedIn ?
                        < ShowVideos />
                        :
                        <Error data={{ code: 401, message: "User is not logged in. Please log in to continue.", title: "Unauthorized", fallback: "Login", link: "/login" }} />
                }
            </section >
        </>
    )
}

export default Home