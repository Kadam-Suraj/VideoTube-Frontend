import { updateLikedVideos } from "@/api/playlist"
import { likeVideo } from "@/api/video.api"
import countFormat from "@/utils/countFormat"
import { ThumbsUp } from "lucide-react"
import PropTypes from "prop-types"

const LikeVideo = ({ id, likes, fnc, isLiked }) => {

    const like = async () => {
        const response = await likeVideo(id);
        await updateLikedVideos(id);
        if (response.data.success) {
            fnc();
        }
    }

    return (
        <div onClick={like} className="flex items-center gap-2 px-4 py-2 font-medium rounded-full cursor-pointer select-none bg-accent-foreground/10">
            <ThumbsUp className={isLiked ? "fill-accent-foreground" : ""} />{likes > 0 && <span >|<span className="ml-2">{countFormat(likes)}</span></span>}
        </div>
    )
}

LikeVideo.propTypes = {
    id: PropTypes.string,
    likes: PropTypes.number,
    fnc: PropTypes.func,
    isLiked: PropTypes.bool
}

export default LikeVideo