import { UserRoundX } from "lucide-react";
import NoContent from "../Content/NoContent";
import { getSubscriptions } from "@/api/subscription.api";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Loading from "../Loading";
import Subscribe from "./Subscribe";
import UserInfo from "./UserInfo";

const SubscribedTo = ({ id }) => {
    const [subscriptions, setSubscriptions] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const fetchSubscriptions = async () => {
        const response = await getSubscriptions(id);
        if (response.data.success) {
            setSubscriptions(response.data.data);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchSubscriptions();

        return () => {
            setSubscriptions(null);
        }
    }, [id])


    return (
        <div className="flex flex-col items-center">
            {
                isLoading ?
                    <div>
                        <Loading />
                    </div>
                    :
                    subscriptions && subscriptions.length > 0 ?
                        <div className="space-y-10 w-full">
                            {
                                subscriptions.map((item, key) => (
                                    <div key={key}>
                                        <div className="flex flex-wrap items-center max-[350px]:flex-col w-full justify-between gap-3">
                                            <UserInfo channel={item?.channel} />
                                            <span className="relative min-[480px]:right-4">
                                                <Subscribe fnc={fetchSubscriptions} owner={item?.channel} />
                                            </span>
                                        </div>
                                    </div>
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

SubscribedTo.propTypes = {
    id: PropTypes.string
}

export default SubscribedTo;