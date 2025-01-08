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

    useEffect(() => {
        (async () => {
            const response = await checkId(videoId);
            setData(response);
        })();
    }, [videoId, playlistId]);

    const error = {
        title: "Oops!", message: "Video not found", fallback: "Go back", link: "/"
    }

    // if (!data?.success) {
    //     searchParams.delete("v");
    //     return <Error data={error} code={404} />
    // }

    return (
        <section className="grid grid-cols-1 justify-center my-10 md:space-x-3 max-[768px]:space-y-8 min-h-screen md:grid-cols-4">
            <VideoById className="col-span-3" id={videoId} />
            <div className="col-span-1 space-y-10">
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