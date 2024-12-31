import { timeAgo } from "@/utils/convertTime"
import PropTypes from "prop-types"
import { useAuth } from "@/context/AuthContext"
import { useState } from "react"
import ToggleTextView from "../Comment/ToggleTextView"
import { MenubarSeparator } from "../ui/menubar"
import { Avatar } from "../Avatar"
import { deleteTweet, editTweet, likeTweet } from "@/api/tweet.api"
import ContentActions from "../Content/ContentActions"
import EditContent from "../Content/EditContent"
import LikeContent from "../Content/LikeContent"

const ViewTweet = ({ item, fnc }) => {
    const { loggedInUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="space-y-3 mt-5 transition-transform duration-300 ease-in-out transform data-[state=disappear]:scale-0">
            <div className="flex items-start space-x-2">
                <Avatar url={item.owner.avatar} />
                <div className="flex flex-col w-full space-y-5">
                    <div className="w-full pl-2">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="flex flex-wrap items-center gap-3 text-sm text-accent-foreground/60">
                                <p className="">@{item.owner.username}</p>
                                <div className="flex items-center space-x-1">
                                    <p>{timeAgo(item.createdAt)}</p>
                                    {
                                        item.isEdited &&
                                        <p>(edited)</p>
                                    }
                                </div>
                            </div>
                            {
                                item.owner.username === loggedInUser.username &&
                                <ContentActions api={deleteTweet} type="tweet" state={setIsEditing} fnc={fnc} data={item} />
                            }
                        </div>
                        {
                            isEditing ?
                                <EditContent IsEditing={setIsEditing} fnc={fnc} data={item} api={editTweet} type="tweet" />
                                :
                                <ToggleTextView>
                                    <p className="overflow-hidden text-sm leading-[1.40rem] break-words text-accent-foreground/80 text-wrap line-clamp-2 text-ellipsis">{item.content}</p>
                                </ToggleTextView>
                        }
                    </div>
                    {
                        !isEditing &&
                        < LikeContent id={item._id} api={likeTweet} isLiked={item.isLiked} likes={item.totalLikes} fnc={fnc} />
                    }
                </div>
            </div>
            <MenubarSeparator />
        </div>
    )
}

ViewTweet.propTypes = {
    item: PropTypes.any,
    fnc: PropTypes.func
}


export default ViewTweet