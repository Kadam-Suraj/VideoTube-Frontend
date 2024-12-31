import { MessageSquareWarning } from "lucide-react"
import NoContent from "../Content/NoContent"
import { useEffect, useState } from "react";
import Loading from "../Loading";
import { useAuth } from "@/context/AuthContext";
import { addTweet, getTweets } from "@/api/tweet.api";
import PropTypes from "prop-types";
import ViewTweet from "./ViewTweet";
import AddContent from "../Content/AddContent";

const Tweet = ({ id }) => {
    const { loggedInUser } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [tweets, setTweets] = useState(null);

    const fetchTweets = async () => {
        const response = await getTweets(id);
        if (response.data.success) {
            setTweets(response.data.data);
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 300)
    }
    useEffect(() => {
        fetchTweets();
    }, [id]);

    return (
        <>
            <section className="flex flex-col justify-center">
                {
                    isLoading ? <Loading /> :
                        <div className="flex flex-col gap3">
                            <div>
                                {loggedInUser?._id === id &&
                                    <div className="">
                                        <div className="flex flex-col space-y-3">
                                            <h3 className="text-xl font-medium">Add tweet</h3>
                                            <AddContent api={addTweet} fnc={fetchTweets} type="tweet" />
                                        </div>
                                    </div>
                                }
                            </div>
                            <div>
                                {
                                    tweets.length ?
                                        <div className="flex flex-col gap-3">
                                            {
                                                tweets.map((item, index) => (
                                                    <div key={index} >
                                                        <ViewTweet fnc={fetchTweets} item={item} />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        :
                                        <NoContent type="tweet">
                                            <MessageSquareWarning size={40} />
                                        </NoContent>
                                }
                            </div>
                        </div>
                }
            </section>
        </>
    )
}

Tweet.propTypes = {
    id: PropTypes.string
}

export default Tweet