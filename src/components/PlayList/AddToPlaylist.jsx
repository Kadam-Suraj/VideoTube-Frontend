import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "../ui/button"
import { useEffect, useState } from "react";
import { addVideoFromPlaylist, checkVideoInPlaylist, getAllPlaylists, removeVideoFromPlaylist } from "@/api/playlist";
import { Bookmark, LockKeyhole } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Checkbox } from "../ui/checkbox";
import Loading from "../Loading";
import CreatePlaylist from "./CreatePlaylist";
import LoadingCircle from "../LoadingCircle";
import { useToast } from "@/hooks/use-toast";

const AddToPlaylist = ({ videoId, className, value }) => {
    const { loggedInUser } = useAuth()
    const { toast } = useToast();

    const [playList, setPlayList] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [processingItemId, setProcessingItemId] = useState(null);
    const [isInPlaylist, setIsInPlaylist] = useState([]);
    const [videoInPlaylist, setVideoInPlaylist] = useState([]);

    const getPlayList = async () => {
        const response = await getAllPlaylists(loggedInUser?._id);
        if (response.data.success) {
            setPlayList(response.data.data);
            setIsLoading(false);
        }
    }

    const handlePlaylistCheck = async () => {
        const updatedPlaylists = await Promise.all(
            playList.docs.map(async (item) => {
                const res = await checkVideoInPlaylist(videoId, item?._id);
                if (res.success) {
                    return { id: item?._id, inPlaylist: res?.data }; // Collect data
                }
            })
        );

        setVideoInPlaylist(updatedPlaylists); // Batch update state
    }

    const addRemovePlaylist = async (id) => {
        // Check if the video is in the playlist
        const isIn = videoInPlaylist.some((item) => item.id === id && item.inPlaylist);

        setProcessingItemId(id); // Set the item being processed
        try {
            if (isIn) {
                const res = await removeVideoFromPlaylist(videoId, id);
                if (res.success) {
                    handlePlaylistCheck();
                    toast({
                        title: res?.message || `Video removed from ${res?.data?.name}`
                    })
                }
            } else {
                const res = await addVideoFromPlaylist(videoId, id);
                if (res.success) {
                    handlePlaylistCheck();
                    toast({
                        title: res?.message || `Video added in ${res?.data?.name}`
                    })
                }
            }
        } finally {
            setProcessingItemId(null); // Reset the processing state for the item
        }
    };

    useEffect(() => {
        if (playList) handlePlaylistCheck();
    }, [playList]);

    return (
        <span className={`relative ${className}`}>
            <Dialog>
                <DialogTrigger className="flex gap-2 items-center" onClick={getPlayList}>
                    <Bookmark className="relative -mb-1" />
                    <span>
                        {value}
                    </span>
                </DialogTrigger>
                <DialogContent className="!min-w-60 w-fit min-h-40 px-4">
                    <DialogHeader>
                        <DialogTitle>Save video to...</DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="hidden" />
                    <div className="flex flex-col">
                        {
                            isLoading ? <Loading />
                                :
                                playList?.docs.length ?
                                    playList?.docs.map((item, idx) => {
                                        return (
                                            <div key={item._id} className="flex gap-2 items-center p-2 rounded-md cursor-pointer hover:bg-muted/40">
                                                <div className="flex items-center space-x-2 w-full" onClick={() => addRemovePlaylist(item._id)}>
                                                    <span className="flex relative justify-center items-center w-5">
                                                        {
                                                            processingItemId === item?._id ?
                                                                <span className="absolute left-1">
                                                                    <LoadingCircle />
                                                                </span>
                                                                :
                                                                <Checkbox checked={videoInPlaylist[idx]?.inPlaylist} />
                                                        }
                                                    </span>
                                                    <span>{item.name}</span>
                                                </div>
                                                <span className="justify-self-end ml-auto">
                                                    {!item?.isPublic && <LockKeyhole size={20} />}
                                                </span>
                                            </div>
                                        )
                                    })
                                    :
                                    <span className="font-medium">No playlist found</span>
                        }
                    </div>
                    <CreatePlaylist fnc={getPlayList} videoRequired={false} />
                </DialogContent>
            </Dialog>
        </span>
    )
}

export default AddToPlaylist