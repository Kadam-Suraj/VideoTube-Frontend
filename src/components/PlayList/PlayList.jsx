import { ListVideo } from "lucide-react"
import NoContent from "../Content/NoContent"
import { useAuth } from "@/context/AuthContext"
import Loading from "../Loading";
import { useEffect, useState } from "react";
import { deletePlaylist, getCreatedPlaylists } from "@/api/playlist";
import CreatePlaylist from "./CreatePlaylist";
import { NavLink } from "react-router-dom";
import { Card, CardContent, CardFooter } from "../ui/card";
import { PlaylistActions } from "./PlaylistActions";
import VideoCount from "../Video/VideoCount";
import PropTypes from "prop-types";
import Image from "../Image";

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
                                        <h3 className="text-2xl font-medium">Playlists</h3>
                                        <div className="grid w-full gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                            {
                                                playlists?.docs.map((item, idx) => {
                                                    if (item?.totalVideos)
                                                        return <PlayListCard item={item} key={idx} fetchPlaylists={fetchPlaylists} />
                                                })
                                            }
                                        </div>
                                    </div> :
                                    <span className="flex flex-col items-center gap-4">
                                        < NoContent type="playlist">
                                            <ListVideo size={40} />
                                        </NoContent >
                                        {
                                            loggedInUser.username === user.username &&
                                            <span className="text-muted-foreground">Shows playlists with privacy public</span>
                                        }
                                    </span>
                            }
                        </div>
                    </div>
            }
        </div >
    )
}

PlayList.propTypes = {
    user: PropTypes.object
}

const PlayListCard = ({ item, fetchPlaylists }) => {
    const { loggedInUser } = useAuth();

    return (
        <Card className="mx-auto shrink min-h[20.5rem] min-w[22.5rem] p-0">
            <CardContent className="p-0">
                < NavLink to={`/watch?v=${item.video._id}&playlist=${item._id}`} >
                    <div className="relative flex-1 transition-all duration-300 rounded-md sm:hover:scale-105 sm:hover:shadow-lg">
                        <Image url={item?.video?.thumbnail} alt={item?.video?.title} />
                        <VideoCount count={item.totalVideos} />
                    </div>
                </NavLink>
            </CardContent>
            <CardFooter className="p-2 pr-0">
                <NavLink to={`/watch?v=${item.video._id}&playlist=${item._id}`} className="flex items-center justify-between w-full"
                    onClick={(e) => {
                        // Prevent navigation if the click originated from the buttons inside this section
                        if (e.target.closest(".prevent-link")) {
                            e.preventDefault();
                        }
                    }}
                >
                    <div className="flex flex-col w-full gap-1">
                        <h4 className="w-full font-semibold leading-6 text-ellipsis line-clamp-2">
                            {item.name || "Untitled"}
                        </h4>
                        <span className="text-sm text-primary/50">View full playlist</span>
                    </div>
                    {
                        (loggedInUser?._id === item?.owner?._id || loggedInUser?._id === item?.owner) &&
                        <PlaylistActions className="p-2 pb-0 border border-r-0 rounded-md rounded-r-none bg-accent prevent-link" data={item} type="playlist" api={deletePlaylist} fnc={fetchPlaylists} />
                    }
                </NavLink >
            </CardFooter>
        </Card >
    )
}

PlayListCard.propTypes = {
    item: PropTypes.object,
    fetchPlaylists: PropTypes.func
}

export { PlayList, PlayListCard }