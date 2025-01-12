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
                        <Error code={401} />
                }
            </section >
        </>
    )
}

export default Home