import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge"
import { formatTime, timeAgo } from "../../utils/convertTime"
import { Card } from "@/components/ui/card";
import Loading from "@/components/Loading";
import { getAllVideos } from "@/api/user.api";
import { NavLink } from "react-router-dom";
import NoVideo from "./NoVideo";
import countFormat from "@/utils/countFormat";
import Avatar from "../Avatar";

const ShowVideos = () => {

    const [isLoading, setIsLoading] = useState(true);

    const [videos, setVideos] = useState(null);

    useEffect(() => {
        const user = async () => {
            const response = await getAllVideos();
            if (response.data.success) {
                setVideos(response.data.data);
            }
            setTimeout(() => {
                setIsLoading(false);
            }, 300)
        }
        user();
    }, []);
    return (
        <>
            <section className="my-10">
                <div className="flex items-center justify-center gap-4 min-h-[30rem] ">
                    {isLoading ?
                        <Loading />
                        :
                        videos ?
                            <div className="grid items-baseline gap-1 space-x-2 space-y-4 grid-cols-[repeat(auto-fit,_minmax(22.8rem,_1fr))] w-full">
                                {videos.docs.map((item, key) => (
                                    <NavLink to={`/watch/${item._id}`} key={key}>
                                        <Card className="mx-auto transition-all duration-300 shrink h-[20.5rem] hover:shadow-lg hover:scale-105 w-[22.5rem] p-0 border-none">
                                            <div className="flex flex-col items-center gap-1 rounded-md cursor-pointer">
                                                <div className="relative rounded-md">
                                                    <img
                                                        src={item.thumbnail || "default-thumbnail.jpg"}
                                                        alt={item.title || "Thumbnail"}
                                                        className="object-contain rounded-t aspect-video"
                                                    />
                                                    <Badge
                                                        variant="none"
                                                        className="absolute text-black bg-white bottom-2 right-2"
                                                    >
                                                        {formatTime(item.duration)}
                                                    </Badge>
                                                </div>
                                                <div className="flex items-center self-start w-full gap-4 p-4">
                                                    <Avatar url={item.owner.avatar} />
                                                    <div className="flex flex-col w-full gap-2 pr-4">
                                                        <h4 className="w-full text-xl font-semibold leading-6 text-ellipsis line-clamp-2">
                                                            {item.title || "Untitled"}
                                                        </h4>
                                                        <div className="items-center gap-2 text-sm text-primary/50">
                                                            <span>{item.owner.fullName || "Unknown Creator"}</span>
                                                            <span className="flex items-center gap-2 text-primary/50">
                                                                <span>{countFormat(item.views)} views</span>•<span>{timeAgo(item.createdAt)}</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    </NavLink>
                                ))}
                            </div>

                            :
                            <NoVideo />
                    }
                </div >
            </section>
        </>
    )
}

export default ShowVideos