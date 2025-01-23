import { subscribeUser } from "@/api/user.api";
import { Button } from "../ui/button";
import PropTypes from "prop-types";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Subscribe = ({ fnc, owner, className }) => {
    const [isSubscribed, setIsSubscribed] = useState(owner?.isSubscribed || false);
    const navigate = useNavigate();
    const { loggedInUser } = useAuth();

    const handleSubscribe = async (id) => {
        const response = await subscribeUser(id);
        if (response.data.success) {
            setIsSubscribed(!isSubscribed);
            fnc && fnc();
        }
    }

    return (
        <>
            <div className={`text-sm min-w-32 ${className}`}>
                {
                    loggedInUser?.username !== owner?.username ?
                        < Button variant="sub" onClick={() => handleSubscribe(owner._id)}
                            className={`rounded-full hover:bg-none bg-foreground font-semibold transition-all duration-300 ${isSubscribed ? "bg-accent-foreground/10" : "bg-red-500 text-white"}`} >
                            {isSubscribed ? "Subscribed" : "Subscribe"}
                        </Button>
                        :
                        <span className="px-4 py-2 font-semibold rounded-full cursor-pointer bg-accent-foreground/10" onClick={() => navigate("/user-profile")}>Manage profile</span>
                }
            </div>
        </>
    )
}

Subscribe.propTypes = {
    fnc: PropTypes.func,
    className: PropTypes.string,
    owner: PropTypes.shape({
        _id: PropTypes.string,
        isSubscribed: PropTypes.bool,
        username: PropTypes.string
    })
}

export default Subscribe