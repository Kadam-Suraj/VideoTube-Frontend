import PropTypes from "prop-types";
import { Card } from "../ui/card";
import { formatTime } from "@/utils/convertTime";
import { Badge } from "../ui/badge";
import { NavLink } from "react-router-dom";
import { timeAgo } from "@/utils/convertTime";
import countFormat from "@/utils/countFormat";
import VideoActions from "./VideoActions";
import RemoveFromWatchHistory from "../User/RemoveFromWatchHistory";

const VideoCardLayout = ({ videos }) => {
    return (
        <div className="grid h-full gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {
                videos?.docs.map((item, key) => (
                    <VideoCard item={item} key={key} />
                ))
            }
        </div>
    )
}

VideoCardLayout.propTypes = {
    videos: PropTypes.object
}

const VideoCard = ({ item, type, className, history }) => {
    return (
        <Card className={`${className} mx-auto shrink w-full h-full`}>
            <div className={`flex justify-between gap-1 h-full rounded-md cursor-pointer max-[363px]:flex-col ${type === "panel" ? "flex-row md:flex-col xl:flex-row" : "flex-col"}`}>
                <div className="flex-1 rounded-md sm:hover:scale-[1.03] transition-all duration-300 sm:hover:shadow-lg">
                    <NavLink to={`/watch?v=${item._id}`} className="relative h-full shrink">
                        <img
                            src={item.thumbnail || "default-thumbnail.jpg"}
                            alt={item.title || "Thumbnail"}
                            className="object-cover w-full h-full rounded-md aspect-video"
                        />
                        <Badge
                            variant="none"
                            className="absolute text-black bg-white right-2 bottom-2"
                        >
                            {formatTime(item.duration)}
                        </Badge>
                    </NavLink >
                </div>
                <div className="relative flex items-start self-start flex-1 w-full h-full py-1 space-x-2">
                    {/* NavLink wraps only the clickable areas */}
                    <NavLink
                        to={`/watch?v=${item._id}`}
                        className="relative flex flex-col flex-grow w-full h-full gap-2 px-2 pr-0"
                        onClick={(e) => {
                            // Prevent navigation if the click originated from the buttons inside this section
                            if (e.target.closest(".prevent-link")) {
                                e.preventDefault();
                            }
                        }}
                    >
                        <span className="flex items-center gap-2">
                            {/* Clickable Title */}
                            <h4 className="font-semibold leading-6 w-fit text-ellipsis line-clamp-2">
                                {item.title || "Untitled"}
                            </h4>
                            {/* Non-clickable area */}
                            <span className="flex items-center p-2 border border-r-0 bg-accent rounded-l-md prevent-link">
                                {/* These components should not trigger navigation */}
                                {
                                    history &&
                                    <RemoveFromWatchHistory id={item._id} />
                                }
                                <VideoActions videoId={item._id} />
                            </span>
                        </span>
                        {/* Additional clickable metadata */}
                        <div className="flex flex-col text-sm text-primary/50">
                            <span>{item.owner.fullName || "Unknown Creator"}</span>
                            <span className="flex items-center space-x-2 text-xs text-primary/50">
                                <span>{countFormat(item.views)} views</span>
                                <span>•</span>
                                <span>{timeAgo(item.createdAt)}</span>
                            </span>
                        </div>
                    </NavLink>
                </div>
            </div>
        </Card>
    )
}

VideoCard.propTypes = {
    item: PropTypes.shape({
        _id: PropTypes.string,
        title: PropTypes.string,
        thumbnail: PropTypes.string,
        views: PropTypes.number,
        duration: PropTypes.number,
        owner: PropTypes.shape({
            _id: PropTypes.string,
            fullName: PropTypes.string
        }),
        createdAt: PropTypes.string
    }),
    type: PropTypes.string,
    className: PropTypes.string,
    history: PropTypes.bool
}

export { VideoCardLayout, VideoCard }