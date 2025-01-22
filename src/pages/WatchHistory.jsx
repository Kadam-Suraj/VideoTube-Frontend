import { getWatchHistory } from "@/api/watchHistory";
import NoContent from "@/components/Content/NoContent";
import Loading from "@/components/Loading";
import { VideoCard } from "@/components/Video/VideoCard";
import { History } from "lucide-react";
import { useEffect, useState } from "react";

const WatchHistory = () => {
    const [history, setHistory] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchHistory = async () => {
        const response = await getWatchHistory();
        if (response.data.success) {
            setHistory(response.data.data);
            setIsLoading(false);
        }
    }
    useEffect(() => {
        fetchHistory();
    }, []);

    return (
        <>
            <div className="flex flex-col w-full gap-5 mx-auto mt-5 md:max-w-4xl">
                <h2 className="text-3xl font-bold">Watch History</h2>
                {
                    isLoading ?
                        <Loading />
                        :
                        history?.videos.length ?
                            <div className="flex flex-col gap-4">
                                {
                                    history.videos?.map((item) => (
                                        <div key={item._id}>
                                            <VideoCard history layout={false} type="panel" item={item} key={item._id} />
                                        </div>
                                    ))
                                }
                            </div>
                            :
                            <NoContent type="video">
                                <History size={40} />
                            </NoContent>
                }
            </div>
        </>
    )
}

export default WatchHistory