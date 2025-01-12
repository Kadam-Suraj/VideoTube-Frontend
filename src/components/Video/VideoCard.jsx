import PropTypes from "prop-types";
import { Card } from "../ui/card";
import { formatTime } from "@/utils/convertTime";
import { Badge } from "../ui/badge";
import { NavLink } from "react-router-dom";
import { timeAgo } from "@/utils/convertTime";
import countFormat from "@/utils/countFormat";
import VideoActions from "./VideoActions";

const VideoCardLayout = ({ videos }) => {
    return (
        <div className="grid w-full gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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

const VideoCard = ({ item, type }) => {
    return (
        <Card className="mx-auto transition-all duration-300 shrink sm:hover:scale-[1.03] hover:shadow-lg p-0 border-none">
            <div className={`flex justify-between gap-1 rounded-md cursor-pointer max-[363px]:flex-col min-h-28 ${type === "panel" ? "flex-row md:flex-col xl:flex-row" : "flex-col"}`}>
                <div className="relative flex-1 rounded-md">
                    <NavLink to={`/watch?v=${item._id}`} className="shrink">
                        <img
                            src={item.thumbnail || "default-thumbnail.jpg"}
                            alt={item.title || "Thumbnail"}
                            className="object-cover w-full rounded-md aspect-video"
                        />
                        <Badge
                            variant="none"
                            className="absolute text-black bg-white right-2 bottom-2"
                        >
                            {formatTime(item.duration)}
                        </Badge>
                    </NavLink >
                </div>
                <div className="relative flex items-center justify-between flex-1 space-x-2">
                    <NavLink to={`/watch?v=${item._id}`} className="shrink">
                        <div className="flex flex-col gap-2 p-2">
                            <h4 className="w-full font-semibold leading-6 text-ellipsis line-clamp-2">
                                {item.title || "Untitled"}
                            </h4>
                            <div className="flex flex-col text-sm text-primary/50">
                                <span>{item.owner.fullName || "Unknown Creator"}</span>
                                <span className="flex items-center space-x-2 text-xs text-primary/50">
                                    <span>{countFormat(item.views)} views</span>
                                    <span>•</span>
                                    <span>{timeAgo(item.createdAt)}</span>
                                </span>
                            </div>
                        </div>
                    </NavLink>
                    {/* Prevent navigation when interacting with VideoActions */}
                    <span className="right-0 self-start" onClick={(e) => e.stopPropagation()}>
                        <VideoActions videoId={item._id} />
                    </span>
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
    type: PropTypes.string
}

export { VideoCardLayout, VideoCard }