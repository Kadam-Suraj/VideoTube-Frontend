import { useEffect, useState } from "react"
import PropTypes from "prop-types";
import { Navigate, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import countFormat from "@/utils/countFormat";
import { formatTime, timeAgo } from "@/utils/convertTime";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// import Loading from "@/components/Loading";
import NoContent from "@/components/Content/NoContent";
import { getPlaylistById } from "@/api/playlist";

const PlaylistVideos = ({ className }) => {
    const [playlist, setPlaylist] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [count, setCount] = useState(0);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const playlistId = searchParams.get("playlist");
    const videoId = searchParams.get("v");

    const fetchPlaylist = async () => {
        const response = await getPlaylistById(playlistId);
        if (response.data.success) {
            setPlaylist(response.data.data);
            setIsLoading(false);
        }
        else {
            // remove playlistId from url if playlist not found
            searchParams.delete("playlist");
            navigate(`/watch?v=${videoId}`, { replace: true });
        }
    }

    useEffect(() => {
        fetchPlaylist();
    }, [playlistId, videoId]);

    useEffect(() => {
        if (playlist?.videos) {
            const currentIndex = playlist.videos.findIndex(item => item._id === videoId);
            setCount(currentIndex + 1);
        }
    }, [videoId, playlist?.videos]);


    return (
        <div className={`flex flex-col space-y-3 rounded-md border ${className}`}>
            <div className="p-2 rounded-t-md bg-muted">
                <h2 className="text-2xl font-semibold">{playlist?.name || "Untitled"}</h2>
                <span className="text-sm text-primary/50">{playlist?.owner?.fullName || "Unknown Creator"} - {`${count} / ${playlist?.videos?.length || 0}`}</span>
            </div>
            {
                playlist?.videos && playlist?.videos?.length > 0 ?
                    <div className="grid p-2 space-y-2">
                        {playlist?.videos.map((item, key) => {

                            return <NavLink key={key} to={`/watch?v=${item._id}&playlist=${playlistId}`} className="shrink">
                                <Card className="mx-auto transition-all duration-300 shrink sm:hover:scale-[1.03] sm:hover:shadow-lg p-0 border-none">
                                    <div className="flex items-center">
                                        <div className={`flex relative gap-1 justify-between ${item?._id === videoId && "bg-accent border border-border"} rounded-md cursor-pointer min-h-28 max-[363px]:flex-col md:flex-col xl:flex-row`}>
                                            <span className="absolute z-10 self-center px-2 text-sm rounded top-1 left-1 backdrop-blur text-background bg-foreground">{key + 1}</span>
                                            <div className="relative flex-1 rounded-md">
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
                                            </div>
                                            <div className="flex flex-col flex-1 gap-2 p-2">
                                                <h4 className="w-full font-semibold leading-6 text-ellipsis line-clamp-2">
                                                    {item.title || "Untitled"}
                                                </h4>
                                                <div className="flex flex-col text-sm text-primary/50">
                                                    <span>{item.owner.fullName || "Unknown Creator"}</span>
                                                    <span className="flex items-center space-x-2 text-xs text-primary/50">
                                                        <span className="">{countFormat(item.views)} views</span>
                                                        <span>•</span>
                                                        <span className="">{timeAgo(item.createdAt)}</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </NavLink>
                        }
                        )
                        }
                    </div>
                    :
                    <NoContent type="video" />
            }
        </div>
    )
}

PlaylistVideos.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    api: PropTypes.func
}

export default PlaylistVideos;