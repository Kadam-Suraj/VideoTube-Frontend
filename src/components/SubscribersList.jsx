import { NavLink } from "react-router-dom"
import { Avatar } from "./Avatar"
import Subscribe from "./User/Subscribe"
import TotalSubscribers from "./User/TotalSubscribers"
import PropTypes from "prop-types"

const SubscribersList = ({ item }) => {

    return (
        <div className="flex items-center space-x-3">
            <NavLink to={`/user/@${item?.username}`} className="flex items-center w-full space-x-3">
                <Avatar url={item?.avatar} size="lg" />
                <div className="">
                    <h3>{item?.fullName}</h3>
                    <div className="flex flex-wrap items-center space-x-2 text-sm">
                        <span className="text-muted-foreground">@{item?.username}</span>
                        <TotalSubscribers count={item?.totalSubscribers} />
                    </div>
                    <p className="text-sm text-accent-foreground/70 line-clamp-2">{item?.description}</p>
                </div>
            </NavLink>
            <Subscribe owner={item} className="justify-self-end text-end min-w-36" />
        </div>
    )
}

SubscribersList.propTypes = {
    item: PropTypes.shape({
        _id: PropTypes.string,
        username: PropTypes.string,
        avatar: PropTypes.string,
        fullName: PropTypes.string,
        totalSubscribers: PropTypes.number,
        description: PropTypes.string
    })
}

export default SubscribersList