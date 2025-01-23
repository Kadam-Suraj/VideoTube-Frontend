import PlaylistVideos from "@/components/PlayList/PlaylistVideos";
import PanelVideos from "@/components/Video/PanelVideos";
import VideoById from "@/components/Video/VideoById"
import { useSearchParams } from "react-router-dom"

const Video = () => {
    const [searchParams] = useSearchParams();
    const videoId = searchParams.get("v");
    const playlistId = searchParams.get("playlist");

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