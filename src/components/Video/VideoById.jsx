import { getVideoById } from "@/api/video.api";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import { getVideDate, timeAgo } from "@/utils/convertTime";
import countFormat from "@/utils/countFormat";
import ListComments from "../Comment/ListComments";
import NoVideo from "./NoVideo";
import LikeVideo from "./Like";
import { subscribeUser } from "@/api/user.api";
import { Button } from "../ui/button";
import ShowVideos from "./ShowVideos";
import { NavLink } from "react-router-dom";

const VideoById = ({ id }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [video, setVideo] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const user = async () => {
        const response = await getVideoById(id);
        if (response.data.success) {
            setVideo(response.data.data);
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 200)
    }

    useEffect(() => {
        user();
        return () => {
            // setVideo(null);
            window.scrollTo(0, 0);
        }
    }, [id]);

    const handleSubscribe = async (id) => {
        const response = await subscribeUser(id);
        if (response.data.success) {
            user();
        }
    }

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <div className="grid min-h-[45rem]">
                {
                    isLoading ? <div className="self-center justify-self-center"><Loading /></div> : video ?
                        <div className="grid grid-cols-4 space-x-4 space-y-5 bg-red-30">
                            <div className="lg:col-span-3 col-span-4 gap-4 space-y-5 min-h-[30rem bg-gay-600">
                                <video src={video.videoFile} poster={video.thumbnail} controls className="h-[30.5rem] w-full rounded-md aspect-video" />
                                <h2 className="text-xl font-medium text-wrap text-ellipsis line-clamp-4">{video.title}</h2>
                                <div className="flex flex-wrap items-center mt-2 space-x-4 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <img src={video.owner.avatar} alt="avatar" className="object-cover rounded-full h-14 w-14" />
                                        <NavLink to={`/@${video.owner.username}`}>
                                            <h3 className="font-medium">{video.owner.fullName}</h3>
                                            <p className="text-sm text-foreground/50">{video.owner.totalSubscribers} subscribers</p>
                                        </NavLink>
                                    </div>
                                    <Button variant="sub" onClick={() => handleSubscribe(video.owner._id)}
                                        className={`rounded-full hover:bg-none bg-foreground font-semibold transition-all duration-300 ${video.owner?.isSubscribed ? "bg-accent-foreground/10" : "bg-red-500 text-white"}`} >
                                        {video.owner?.isSubscribed ? "Subscribed" : "Subscribe"}
                                    </Button>
                                    <LikeVideo id={video._id} likes={video.totalLikes} fnc={user} isLiked={video.isLiked} />
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
                                <ListComments id={video._id} username={video.owner.username} />
                            </div>
                            <div className="hidden lg:block">
                                <ShowVideos />
                            </div>
                        </div>
                        : <NoVideo />
                }
            </div >
        </>
    )
}

VideoById.propTypes = {
    id: PropTypes.string
}

export default VideoById

