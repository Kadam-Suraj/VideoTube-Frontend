import { useEffect, useState } from "react";
import NoContent from "../Content/NoContent"
import { FileVideo2 } from "lucide-react"
import { getUserVideos } from "@/api/video.api";
import Loading from "../Loading";
import PropTypes from "prop-types"
import { VideoCardLayout } from "./VideoCard";
import UploadVideo from "./UploadVideo";
import { useAuth } from "@/context/AuthContext";

const UserVideos = ({ userId }) => {
    const [isLoading, setIsLoading] = useState(true);
    const { loggedInUser } = useAuth();

    const [videos, setVideos] = useState(null);

    useEffect(() => {
        const user = async () => {
            const response = await getUserVideos(userId);
            if (response.data.success) {
                setVideos(response.data.data);
            }
            setTimeout(() => {
                setIsLoading(false);
            }, 300)
        }
        user();


        return () => {
            setVideos(null);
        }
    }, [userId]);

    return (
        <div className="grid items-center justify-center w-full m-auto">
            {
                isLoading ? <Loading /> :
                    videos && videos?.docs.length > 0 ?
                        <VideoCardLayout videos={videos} />
                        :
                        <div className="flex flex-col items-center gap-5">
                            <NoContent type="video">
                                <FileVideo2 size={40} />
                            </NoContent >
                            {
                                loggedInUser._id === userId &&
                                < UploadVideo />
                            }
                        </div>
            }
        </div >
    )
}

UserVideos.propTypes = {
    userId: PropTypes.string
}

export default UserVideos