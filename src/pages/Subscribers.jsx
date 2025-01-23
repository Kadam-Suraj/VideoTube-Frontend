import { getSubscribers } from "@/api/subscription.api";
import NoContent from "@/components/Content/NoContent";
import Loading from "@/components/Loading";
import SubscribersList from "@/components/SubscribersList";
import { timeAgo } from "@/utils/convertTime";
import { UserRoundX } from "lucide-react";
import { useEffect, useState } from "react";

const Subscribers = () => {
    const [data, setData] = useState(null);
    const [toggleTime, setToggleTime] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const fetchSubscribers = async () => {
        const response = await getSubscribers();
        if (response.success) {
            setData(response.data);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchSubscribers();
    }, [])

    const handleToggleTime = (id) => {
        setToggleTime((prev) => ({
            ...prev,
            [id]: !prev[id] // Toggle only for the targeted user
        }))
    }

    return (
        <div className="flex flex-col w-full max-w-4xl gap-5 mx-auto mt-5">
            <h3 className="text-3xl font-bold">Subscribers</h3>
            {
                isLoading ?
                    <Loading />
                    :
                    data ?
                        <div className="flex flex-col w-full gap-2">
                            {
                                data.map((item) => (
                                    <span key={item._id} className="flex flex-col">
                                        <SubscribersList item={item.subscriber} />
                                        <span className="self-end pr-2 text-sm cursor-pointer text-end text-muted-foreground w-fit" onClick={() => handleToggleTime(item._id)}>Subscribed: {toggleTime[item._id] ? new Date(item.createdAt).toLocaleDateString() : timeAgo(item.createdAt)}</span>
                                    </span>
                                ))
                            }
                        </div>
                        :
                        <NoContent type="subscriber">
                            <UserRoundX size={40} />
                        </NoContent>
            }
        </div>
    )
}

export default Subscribers