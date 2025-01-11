import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { getPublicVideos } from "@/api/user.api";
import NoContent from "../Content/NoContent";
import { FileVideo2 } from "lucide-react";
import { VideoCardLayout } from "./VideoCard";

const ShowVideos = () => {

    const [isLoading, setIsLoading] = useState(true);

    const [videos, setVideos] = useState(null);

    useEffect(() => {
        const user = async () => {
            const response = await getPublicVideos();
            if (response.data.success) {
                setVideos(response.data.data);
            }
            setIsLoading(false);
        }
        user();
    }, []);
    return (
        <>
            <section className="">
                <div className="flex items-center justify-center gap-4">
                    {isLoading ?
                        <Loading />
                        :
                        videos ?
                            <VideoCardLayout videos={videos} />
                            :
                            <NoContent type="video">
                                <FileVideo2 size={40} />
                            </NoContent >
                    }
                </div >
            </section>
        </>
    )
}

export default ShowVideos