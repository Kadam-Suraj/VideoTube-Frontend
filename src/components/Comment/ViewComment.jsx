import { timeAgo } from "@/utils/convertTime"
import EditComment from "./EditComment"
import ToggleTextView from "./ToggleTextView"
import PropTypes from "prop-types"
import { useAuth } from "@/context/AuthContext"

const ViewComment = ({ item }) => {
    const { loggedInUser } = useAuth();

    return (
        <div className="space-y-3">
            <div className="flex items-start space-x-2">
                <img src={item.owner.avatar} className="object-cover w-8 h-8 rounded-full shrink-0" alt="avatar" />
                <div className="w-full pl-2 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-3">
                            <p className={item.owner.username === loggedInUser.username ? "bg-accent-foreground/10 rounded-full px-2 py-1" : ""}>@{item.owner.username}</p>
                            <p className="text-sm text-accent-foreground/60">{timeAgo(item.createdAt)}</p>
                        </div>
                        <EditComment />
                    </div>
                    <ToggleTextView>
                        <p className="overflow-hidden text-sm leading-[1.40rem] break-all text-accent-foreground/80 text-wrap text-ellipsis">{item.content}</p>
                    </ToggleTextView>
                </div>
            </div>
        </div>
    )
}

ViewComment.propTypes = {
    item: PropTypes.any
}

export default ViewComment