import { removeFromWatchHistory } from "@/api/watchHistory";
import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react";
import PropTypes from "prop-types"

const RemoveFromWatchHistory = ({ id }) => {
    const { toast } = useToast();

    const handleClick = async () => {
        const response = await removeFromWatchHistory(id);

        if (response.success) {
            toast({
                variant: "success",
                title: response.message || "Video removed from watch history"
            })
        } else {
            toast({
                variant: "destructive",
                title: response.message || "Failed to remove video from watch history"
            })
        }
    }
    return (
        <>
            <X onClick={handleClick} />
        </>
    )
}

RemoveFromWatchHistory.propTypes = {
    id: PropTypes.string
}

export default RemoveFromWatchHistory