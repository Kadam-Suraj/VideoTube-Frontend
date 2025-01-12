import { checkId } from "@/api/user.api";
import PlaylistVideos from "@/components/PlayList/PlaylistVideos";
import PanelVideos from "@/components/Video/PanelVideos";
import VideoById from "@/components/Video/VideoById"
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"
import Error from "./Error";

const Video = () => {
    const [searchParams] = useSearchParams();
    const videoId = searchParams.get("v");
    const playlistId = searchParams.get("playlist");
    const [data, setData] = useState(null);

    const fetchData = async () => {
        const response = await checkId(videoId);
        setData(response);
    };
    useEffect(() => {
        fetchData();
    }, [videoId, playlistId]);

    const error = {
        title: "Video not found!", message: "Invalid video link or video removed", fallback: "Go back", link: "/"
    }

    if (!data?.success) {
        return <Error data={error} code={404} />
    }

    return (
        <section className="grid justify-center w-full grid-cols-1 max-md:space-y-10 sm:gap-3 md:grid-cols-4">
            <VideoById className="col-span-3" id={videoId} />
            <div className="col-span-1 space-y-10 overflow-x-hidden">
                {
                    playlistId &&
                    <PlaylistVideos />
                }
                <PanelVideos className="col-span-1" id={videoId} />
            </div>
        </section>
    )
}

export default Video