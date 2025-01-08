import { useAuth } from "@/context/AuthContext";
import Loading from "../Loading";
import { useEffect, useState } from "react";
import { getUserVideos } from "@/api/video.api";
import { Checkbox } from "../ui/checkbox";
import NoContent from "../Content/NoContent";
import { FileVideo2 } from "lucide-react";
import { Button } from "../ui/button";

const AddVideos = ({ addToPlaylist, playlistVideos }) => {
    const { loggedInUser } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    const [videos, setVideos] = useState(null);
    const user = async () => {
        const response = await getUserVideos(loggedInUser._id);
        if (response.data.success) {
            setVideos(response.data.data);
        }
        setIsLoading(false);
    }

    const addVideos = (id) => {
        if (playlistVideos?.includes(id)) {
            addToPlaylist(playlistVideos.filter((i) => i !== id));
        } else {
            addToPlaylist([...playlistVideos, id]);
        }
    }

    useEffect(() => {
        user();
        return () => {
            setVideos(null);
        }
    }, []);

    return (
        <div className="flex flex-col border-y border-muted">
            {
                isLoading ?
                    <Loading />
                    :
                    videos && videos?.docs.length > 0 ?
                        <div className="flex overflow-y-scroll flex-col gap-5 max-h-64">
                            {
                                videos?.docs.map((item) => (
                                    <div key={item?._id} onClick={() => addVideos(item?._id)} className="flex gap-5 items-center p-2 rounded-md cursor-pointer hover:bg-accent">
                                        <Checkbox checked={playlistVideos?.includes(item?._id)} />
                                        <div className="flex gap-2 items-center">
                                            <img src={item?.thumbnail} alt="thumbnail" className="w-16 rounded-sm aspect-video" />
                                            <span className="font-medium line-clamp-1">{item?.title}</span>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        :
                        <div className="flex flex-col gap-5 items-center">
                            <NoContent type="video">
                                <FileVideo2 size={40} />
                            </NoContent>
                            <p className="text-lg font-medium">No videos added</p>
                        </div>
            }
        </div>
    )
}

export default AddVideos