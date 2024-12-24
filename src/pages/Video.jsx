import VideoById from "@/components/Video/VideoById"
import { useParams } from "react-router-dom"

const Video = () => {
    const { videoId } = useParams();
    return (
        <section className="min-h-screen my-10">
            <VideoById id={videoId} />
        </section>
    )
}

export default Video