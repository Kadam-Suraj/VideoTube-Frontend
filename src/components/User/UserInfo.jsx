import { NavLink } from "react-router-dom";
import { Avatar } from "../Avatar"
import TotalSubscribers from "./TotalSubscribers"
import PropTypes from "prop-types";

const UserInfo = ({ channel }) => {
    return (
        <NavLink to={`/user/@${channel?.username}`} className="flex flex-wrap gap-3 items-center">
            <Avatar size="lg" url={channel?.avatar} />
            <div className="flex flex-col">
                <span className="font-medium">{channel?.fullName}</span>
                <TotalSubscribers count={channel?.totalSubscribers} />
            </div>
        </NavLink>
    )
}

UserInfo.propTypes = {
    channel: PropTypes.shape({
        avatar: PropTypes.string,
        fullName: PropTypes.string,
        totalSubscribers: PropTypes.number,
        username: PropTypes.string
    })
}

export default UserInfo