import { subscribeUser } from "@/api/user.api";
import { Button } from "../ui/button";
import PropTypes from "prop-types";
import { useAuth } from "@/context/AuthContext";
const Subscribe = ({ fnc, owner }) => {

    const { loggedInUser } = useAuth();

    const handleSubscribe = async (id) => {
        const response = await subscribeUser(id);
        if (response.data.success) {
            fnc();
        }
    }

    return (
        <>
            <div className="text-sm">
                {
                    loggedInUser?.username !== owner?.username ?
                        < Button variant="sub" onClick={() => handleSubscribe(owner._id)}
                            className={`rounded-full hover:bg-none bg-foreground font-semibold transition-all duration-300 ${owner?.isSubscribed ? "bg-accent-foreground/10" : "bg-red-500 text-white"}`} >
                            {owner?.isSubscribed ? "Subscribed" : "Subscribe"}
                        </Button>
                        :
                        <span className="px-4 py-2 font-semibold rounded-full bg-accent-foreground/10">Your Channel</span>
                }
            </div>
        </>
    )
}

Subscribe.propTypes = {
    fnc: PropTypes.func,
    owner: PropTypes.shape({
        _id: PropTypes.string,
        isSubscribed: PropTypes.bool,
        username: PropTypes.string
    })
}

export default Subscribe