import { getVideoComments } from "@/api/comment.api";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import NoComments from "./NoComments";
import AddComments from "./AddComments";
import { useAuth } from "@/context/AuthContext";
import ViewComment from "./ViewComment";

const ListComments = ({ id }) => {

    const { loggedInUser } = useAuth();

    const [isLoading, setIsLoading] = useState(true);
    const [comments, setComments] = useState(null);

    const user = async () => {
        setIsLoading(true);
        const response = await getVideoComments(id);
        if (response.data.success) {
            setComments(response.data.data);
            setTimeout(() => {
                setIsLoading(false);
            }, 500)
        }
    }
    useEffect(() => {
        user();
    }, [id]);

    return (
        <>
            <section className="flex items-center justify-center">
                {
                    isLoading ? <Loading /> :
                        <div className="grid w-full gap-4">
                            {comments.docs.length > 0 && <span className="font-medium">
                                {comments.docs.length} {comments.docs.length === 1 ? "Comment" : "Comments"}
                            </span>}
                            <AddComments id={id} fnc={user} url={loggedInUser?.avatar} />
                            {
                                comments.docs.length > 0 ?
                                    <div className="space-y-8">
                                        {
                                            comments.docs.map((item, key) => (
                                                <ViewComment item={item} key={key} />
                                            ))
                                        }
                                    </div>
                                    :
                                    <div>
                                        <NoComments />
                                    </div>
                            }
                        </div>
                }
            </section>
        </>
    )
}

ListComments.propTypes = {
    id: PropTypes.string,
    username: PropTypes.string
}

export default ListComments