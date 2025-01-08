import { getPanelVideos } from "@/api/video.api";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { VideoCard } from "./VideoCard";
import NoContent from "../Content/NoContent";
import Loading from "../Loading";

const PanelVideos = ({ id, className }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [videos, setVideos] = useState(null);


    const fetchData = async () => {
        setIsLoading(true);
        const response = await getPanelVideos(id)
        if (response.data.success) {
            setVideos(response.data.data);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchData();
        return () => {
            // setVideos(null);
        }
    }, [id])


    return (
        <div className={`${className} flex flex-col items-center min-h-[50%]`}>
            {
                isLoading ?
                    <div className="mt-10">
                        <Loading />
                    </div>
                    :
                    videos && videos?.docs.length > 0 ?
                        <div className="grid space-y-2">
                            {videos.docs.map((item, key) =>
                                < VideoCard key={key} item={item} type="panel" />
                            )
                            }
                        </div>
                        :
                        <NoContent type="video" />
            }
        </div>
    )
}

PanelVideos.propTypes = {
    id: PropTypes.string
}

export default PanelVideos