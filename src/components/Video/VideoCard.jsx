import PropTypes from "prop-types";
import { Card } from "../ui/card";
import { formatTime } from "@/utils/convertTime";
import { Badge } from "../ui/badge";
import { NavLink } from "react-router-dom";
import { timeAgo } from "@/utils/convertTime";
import countFormat from "@/utils/countFormat";

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
        <NavLink to={`/watch/${item._id}`} className="shrink">
            <Card className="mx-auto transition-all duration-300 shrink min-h[20.5rem] hover:scale-105 hover:shadow-lg min-w[22.5rem] p-0 border-none">
                <div className={`flex justify-between gap-1 rounded-md cursor-pointer sm:fle-col max-[363px]:flex-col ${type === "panel" ? "flex-row" : "flex-col"}`}>
                    <div className="relative flex-1 rounded-md">
                        <img
                            src={item.thumbnail || "default-thumbnail.jpg"}
                            alt={item.title || "Thumbnail"}
                            className="object-contain w-full rounded-md aspect-video"
                        />
                        <Badge
                            variant="none"
                            className="absolute text-black bg-white bottom-2 right-2"
                        >
                            {formatTime(item.duration)}
                        </Badge>
                    </div>
                    <div className="flex flex-col flex-1 w-full gap-2 p-2">
                        <h4 className="w-full font-semibold leading-6 text-ellipsis line-clamp-2">
                            {item.title || "Untitled"}
                        </h4>
                        <div className="flex flex-col text-sm text-primary/50">
                            <span>{item.owner.fullName || "Unknown Creator"}</span>
                            <span className="flex items-center gap-2 text-primary/50">
                                <span>{countFormat(item.views)} views</span>•
                                <span>{timeAgo(item.createdAt)}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </Card>
        </NavLink>
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