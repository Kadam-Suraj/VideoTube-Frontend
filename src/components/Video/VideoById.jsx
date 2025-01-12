import { getVideoById, updateVideoViews } from "@/api/video.api";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
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

const VideoById = ({ id, className }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [video, setVideo] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const user = async () => {
        const response = await getVideoById(id);
        if (response.data.success) {
            setVideo(response.data.data);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        setTimeout(async () => {
            await updateVideoViews(id);
        }, 2000);

        user();

        return () => {
            // setVideo(null);
            window.scrollTo(0, 0);
        }
    }, [id]);

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <div className={className}>
                {
                    isLoading ?
                        <div className="self-center justify-self-center">
                            <Loading />
                        </div> : video ?
                            <div className="flex-auto gap-4 space-y-5">
                                <VideoPlayer video={video} />
                                <h2 className="text-xl font-medium text-wrap text-ellipsis line-clamp-4">{video.title}</h2>
                                <div className="flex items-center justify-between">
                                    <span className="flex flex-wrap items-center w-full gap-3 space-y-4">
                                        <UserInfo channel={video?.owner} />
                                        <Subscribe fnc={user} owner={video?.owner} />
                                        <div className="flex items-center justify-between flex-1 space-x-5">
                                            <LikeVideo id={video._id} likes={video.totalLikes} fnc={user} isLiked={video.isLiked} />
                                            <AddToPlaylist videoId={video._id} />
                                        </div>
                                    </span>
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
        </>
    )
}

VideoById.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string
}

export default VideoById

