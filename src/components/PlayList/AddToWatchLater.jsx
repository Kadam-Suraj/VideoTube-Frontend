import { addRemoveFromWatchLater } from "@/api/playlist"
import { useToast } from "@/hooks/use-toast";
import { Clock } from "lucide-react";
import PropTypes from "prop-types";

const AddToWatchLater = ({ id }) => {
    const { toast } = useToast();

    const toggleWatchLaterVideo = async () => {
        const response = await addRemoveFromWatchLater(id);
        console.log(response)
        if (response.success) {
            toast({
                variant: "success",
                title: response.message || "Watch later updated"
            })
        } else {
            toast({
                variant: "destructive",
                title: response.message || "Watch later update failed"
            })
        }
    }
    return (
        <Clock onClick={toggleWatchLaterVideo} />
    )
}

AddToWatchLater.propTypes = {
    id: PropTypes.string
}

export default AddToWatchLater