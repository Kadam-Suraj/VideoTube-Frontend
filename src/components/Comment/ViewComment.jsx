import { timeAgo } from "@/utils/convertTime"
import ToggleTextView from "./ToggleTextView"
import PropTypes from "prop-types"
import { useAuth } from "@/context/AuthContext"
import { useState } from "react"
import { deleteComment, editVideoComment, likeComment } from "@/api/comment.api"
import ContentActions from "../Content/ContentActions"
import EditContent from "../Content/EditContent"
import LikeContent from "../Content/LikeContent"

const ViewComment = ({ item, fnc, videoOwner }) => {
    const { loggedInUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    // console.log(loggedInUser.username)

    return (
        <div className="space-y-3 transition-transform duration-300 ease-in-out transform data-[state=disappear]:scale-0">
            <div className="flex items-start space-x-2">
                <img src={item.owner.avatar} className="object-cover w-8 h-8 rounded-full shrink-0" alt="avatar" />
                <div className="flex flex-col w-full space-y-5">
                    <div className="w-full pl-2 space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="flex flex-wrap items-center gap-3">
                                <p className={`${item.owner.username === videoOwner ? "bg-accent-foreground/10 rounded-full px-2 py-1 text-accent-foreground" : ""} text-accent-foreground/80`}>@{item.owner.username}</p>
                                <div className="flex items-center space-x-1">
                                    <p className="text-sm text-accent-foreground/60">{timeAgo(item.createdAt)}</p>
                                    {
                                        item.isEdited &&
                                        <p className="text-sm text-accent-foreground/60">(edited)</p>
                                    }
                                </div>
                            </div>
                            {
                                (item.owner.username === loggedInUser.username || loggedInUser.username ===videoOwner) &&
                                <ContentActions api={deleteComment} type="comment" state={setIsEditing} fnc={fnc} data={item} />
                            }
                        </div>
                        {
                            isEditing ?
                                <EditContent data={item} IsEditing={setIsEditing} fnc={fnc} api={editVideoComment} type="comment" />
                                :
                                <ToggleTextView>
                                    <p className="overflow-hidden text-sm leading-[1.40rem] break-all text-accent-foreground/80 text-wrap text-ellipsis">{item.content}</p>
                                </ToggleTextView>
                        }
                    </div>
                    {
                        !isEditing &&
                        < LikeContent api={likeComment} id={item._id} isLiked={item.isLiked} likes={item.totalLikes} fnc={fnc} />
                    }
                </div>
            </div>
        </div>
    )
}

ViewComment.propTypes = {
    item: PropTypes.any,
    fnc: PropTypes.func,
    videoOwner: PropTypes.string
}

export default ViewComment