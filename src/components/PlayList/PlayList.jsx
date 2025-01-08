import { ListVideo } from "lucide-react"
import NoContent from "../Content/NoContent"
import { useAuth } from "@/context/AuthContext"
import Loading from "../Loading";
import { useEffect, useState } from "react";
import { deletePlaylist, getCreatedPlaylists } from "@/api/playlist";
import CreatePlaylist from "./CreatePlaylist";
import { NavLink } from "react-router-dom";
import { Card } from "../ui/card";
import { PlaylistActions } from "./PlaylistActions";

const PlayList = ({ user }) => {
    const { loggedInUser } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [playlists, setPlaylists] = useState(null);

    const fetchPlaylists = async () => {
        const response = await getCreatedPlaylists(user._id);
        if (response.data.success) {
            setPlaylists(response.data.data);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchPlaylists();
    }, [user])

    return (
        <div className="flex flex-col">
            {
                isLoading ?
                    <Loading />
                    :
                    <div className="flex flex-col space-y-5">
                        {
                            loggedInUser.username === user.username &&
                            <div className="self-end">
                                <CreatePlaylist fnc={fetchPlaylists} />
                            </div>
                        }

                        <div>
                            {
                                playlists?.docs.length > 0 ?
                                    <div className="grid gap-4">
                                        <h3 className="text-lg font-medium">Created playlists</h3>
                                        <div className="grid gap-4 w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                            {
                                                playlists?.docs.map((item, idx) => {
                                                    if (item?.totalVideos)
                                                        return <PlayListCard item={item} key={idx} fetchPlaylists={fetchPlaylists} />
                                                })
                                            }
                                        </div>
                                    </div> :
                                    < NoContent type="playlist">
                                        <ListVideo size={40} />
                                    </NoContent >
                            }
                        </div>
                    </div>
            }
        </div >
    )
}

const PlayListCard = ({ item, fetchPlaylists }) => {
    const { loggedInUser } = useAuth();

    return (
        <Card className="mx-auto shrink min-h[20.5rem] min-w[22.5rem] p-0 border-none">
            <div className={`grid gap-1 justify-between rounded-md group`}>
                < NavLink to={`/watch?v=${item.video._id}&playlist=${item._id}`} >
                    <div className="relative flex-1 rounded-md transition-all duration-300 group-hover:scale-105 hover:shadow-lg">
                        <img
                            src={item.video.thumbnail || ""}
                            alt={item.name || "Thumbnail"}
                            className="object-cover w-full rounded-md aspect-video"
                        />
                        <div className="flex absolute right-2 bottom-2 gap-1 items-center px-2 py-1 rounded-md text-foreground bg-background/75 backdrop-blur-[3px]">
                            <ListVideo size={20} />
                            <span className="text-sm">{item.totalVideos} {item.totalVideos === 1 ? "video" : "videos"}</span>
                        </div>
                    </div>
                </NavLink>
                <div className="flex relative justify-between items-center">
                    <NavLink to={`/watch?v=${item.video._id}&playlist=${item._id}`} >
                        <div className="flex flex-col flex-1 gap-1 p-2 w-full">
                            <h4 className="w-full font-semibold leading-6 text-ellipsis line-clamp-2">
                                {item.name || "Untitled"}
                            </h4>
                            <span className="text-sm text-primary/50">View full playlist</span>
                        </div>
                    </NavLink >
                    {
                        loggedInUser?._id === item?.owner?._id &&
                        <PlaylistActions data={item} type="playlist" api={deletePlaylist} fnc={fetchPlaylists} />
                    }
                </div>
            </div>
        </Card >
    )
}

export { PlayList, PlayListCard }