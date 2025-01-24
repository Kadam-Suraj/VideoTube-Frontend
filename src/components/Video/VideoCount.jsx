import { ListVideo } from "lucide-react";
import PropTypes from "prop-types";

const VideoCount = ({ count, className }) => {
    return (
        <div className={`${className} flex absolute right-2 bottom-2 gap-1 items-center px-2 py-1 rounded-md text-foreground bg-background/75 backdrop-blur-[3px]`}>
            <ListVideo size={20} />
            <span className="text-sm">{count} {count === 1 ? "video" : "videos"}</span>
        </div>
    )
}

VideoCount.propTypes = {
    count: PropTypes.number,
    className: PropTypes.string
}

export default VideoCount