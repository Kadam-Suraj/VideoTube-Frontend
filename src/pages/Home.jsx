import ShowVideos from "@/components/Video/ShowVideos"
import { useAuth } from "@/context/AuthContext"
import Error from "./Error";

const Home = () => {
    const { isLoggedIn } = useAuth();

    return (
        <>
            <section className="">
                <div>
                    {
                        isLoggedIn ?
                            < ShowVideos />
                            :
                            <Error code={401} />
                    }
                </div>
            </section >
        </>
    )
}

export default Home