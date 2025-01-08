import { timeAgo } from "@/utils/convertTime"
import ToggleTextView from "./ToggleTextView"
import PropTypes from "prop-types"
import { useAuth } from "@/context/AuthContext"
import { useState } from "react"
import { deleteComment, editVideoComment, likeComment } from "@/api/comment.api"
import ContentActions from "../Content/ContentActions"
import EditContent from "../Content/EditContent"
import LikeContent from "../Content/LikeContent"
import { Avatar } from "../Avatar"
import { NavLink } from "react-router-dom"

const ViewComment = ({ item, fnc, videoOwner }) => {
    const { loggedInUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="space-y-3 transition-transform duration-300 ease-in-out transform data-[state=disappear]:scale-0">
            <div className="flex items-start space-x-2">
                <NavLink to={`/user/@${item.owner.username}`}>
                    <Avatar size="sm" url={item.owner.avatar} />
                </NavLink>
                <div className="flex flex-col space-y-5 w-full">
                    <div className="pl-2 space-y-2 w-full">
                        <div className="flex flex-wrap gap-3 justify-between items-center">
                            <div className="flex flex-wrap gap-3 items-center">
                                <NavLink to={`/user/@${item.owner.username}`}>
                                    <p className={`${item.owner.username === videoOwner ? "bg-accent-foreground/10 rounded-full px-2 py-1 text-accent-foreground" : ""} text-accent-foreground/80`}>@{item.owner.username}</p>
                                </NavLink>
                                <div className="flex items-center space-x-1">
                                    <p className="text-sm text-accent-foreground/60">{timeAgo(item.createdAt)}</p>
                                    {
                                        item.isEdited &&
                                        <p className="text-sm text-accent-foreground/60">(edited)</p>
                                    }
                                </div>
                            </div>
                            {
                                (item.owner.username === loggedInUser.username || loggedInUser.username === videoOwner) &&
                                <ContentActions api={deleteComment} type="comment" state={isEditing} setState={setIsEditing} videoOwner={videoOwner} user={loggedInUser.username} fnc={fnc} data={item} />
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