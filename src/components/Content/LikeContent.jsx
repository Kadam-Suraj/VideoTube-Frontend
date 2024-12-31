import countFormat from "@/utils/countFormat";
import { ThumbsUp } from "lucide-react";
import PropTypes from "prop-types";

const LikeContent = ({ id, likes, fnc, api, isLiked }) => {

    const like = async () => {
        const response = await api(id);
        if (response.data.success) {
            fnc();
        }
    }

    return (
        <div onClick={like} className="flex items-center gap-2 cursor-pointer select-none w-fit">
            <ThumbsUp className={isLiked && "fill-accent-foreground"} />{likes > 0 && countFormat(likes)}
        </div >
    )
}

LikeContent.propTypes = {
    fnc: PropTypes.func,
    id: PropTypes.string,
    isLiked: PropTypes.bool,
    likes: PropTypes.number,
    api: PropTypes.func
}

export default LikeContent;