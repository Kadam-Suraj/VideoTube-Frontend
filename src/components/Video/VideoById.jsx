import { getVideoById, updateVideoViews } from "@/api/video.api";
import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import Loading from "../Loading";
import { getVideDate, timeAgo } from "@/utils/convertTime";
import countFormat from "@/utils/countFormat";
import ListComments from "../Comment/ListComments";
import LikeVideo from "./Like";
import NoContent from "../Content/NoContent";
import { FileVideo2 } from "lucide-react";
import Subscribe from "../User/Subscribe";
import UserInfo from "../User/UserInfo";
import AddToPlaylist from "../PlayList/AddToPlaylist";
import VideoPlayer from "./VideoPlayer";
import { addVideoToHistory } from "@/api/watchHistory";
import AddToWatchLater from "../PlayList/AddToWatchLater";

const VideoById = ({ id, className }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [video, setVideo] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const user = async () => {
        const response = await getVideoById(id);
        if (response.data.success) {
            setVideo(response.data.data);
            await addVideoToHistory(id);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        setTimeout(async () => {
            await updateVideoViews(id);
        }, 60000); // update views after 1min

        user();

        return () => {
            setVideo(null);
        }
    }, [id]);

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    // Memoize the VideoPlayer component so it only rerenders when `videoUrl` changes
    const memoizedVideoPlayer = useMemo(() => {
        return < VideoPlayer videoData={video} />;
    }, [video?.videoFile]); // Only rerender the video player if the video URL changes

    return (

        <div className={className}>
            {
                isLoading ?
                    <div className="self-center justify-self-center">
                        <Loading />
                    </div>
                    : video ?
                        <div className="flex-auto gap-4 space-y-5">
                            {
                                video?.videoFile &&
                                memoizedVideoPlayer
                            }
                            <h2 className="text-xl font-medium text-wrap text-ellipsis line-clamp-4">{video.title}</h2>
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                {/* <span className="flex flex-wrap items-center w-full gap-3 space-y-4">
                                </span> */}
                                <div className="flex items-center gap-2">
                                    <UserInfo channel={video?.owner} />
                                    <Subscribe fnc={user} owner={video?.owner} />
                                    <LikeVideo id={video._id} likes={video.totalLikes} fnc={user} isLiked={video.isLiked} />
                                </div>
                                <div className="flex items-center justify-between space-x-5">
                                    <AddToWatchLater id={video._id} />
                                    <AddToPlaylist videoId={video._id} />
                                </div>
                            </div>
                            <div className="relative px-3 py-2 font-medium transition-all duration-700 rounded-xl bg-accent-foreground/10">
                                <div className="space-x-5">
                                    <span>{countFormat(video.views)} views</span>
                                    <span>{isOpen ? getVideDate(video.createdAt) : timeAgo(video.createdAt)}</span>
                                </div>
                                <p className={`overflow-hidden mb-2 font-normal text-accent-foreground/90 ${isOpen ? "" : "line-clamp-2"}`}>
                                    {video.description}
                                </p>
                                {
                                    <span onClick={handleClick} className="bottom-0 cursor-pointer">{isOpen ? "Show less" : "more..."}</span>
                                }
                            </div>
                            <ListComments videoOwner={video.owner.username} id={video._id} username={video.owner.username} />
                        </div>
                        : <NoContent type="video">
                            <FileVideo2 size={40} />
                        </NoContent >
            }
        </div >
    )
}

VideoById.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string
}

export default VideoById

