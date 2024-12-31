import { addVideoComment, getVideoComments } from "@/api/comment.api";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import ViewComment from "./ViewComment";
import NoContent from "../Content/NoContent";
import { MessageSquareWarning } from "lucide-react";
import AddContent from "../Content/AddContent";

const ListComments = ({ id, videoOwner }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [comments, setComments] = useState(null);

    const user = async () => {
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
                            <AddContent api={addVideoComment} fnc={user} type="comment" id={id} />
                            {
                                comments.docs.length > 0 ?
                                    <div className="space-y-8">
                                        {
                                            comments.docs.map((item, key) => (
                                                <ViewComment videoOwner={videoOwner} fnc={user} item={item} key={key} />
                                            ))
                                        }
                                    </div>
                                    :
                                    <div>
                                        <NoContent type="video">
                                            <MessageSquareWarning size={40} />
                                        </NoContent >
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
    username: PropTypes.string,
    videoOwner: PropTypes.string
}

export default ListComments