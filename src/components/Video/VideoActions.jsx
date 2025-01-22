import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { EllipsisVertical } from "lucide-react"
import AddToPlaylist from "../PlayList/AddToPlaylist"
import PropTypes from "prop-types"

const VideoActions = ({ videoId }) => {
    return (
        <div className="h-6 prevent-link">
            <Popover >
                <PopoverTrigger>
                    <EllipsisVertical />
                </PopoverTrigger>
                <PopoverContent className="p-1 w-fit prevent-link">
                    <div className="p-2 rounded-md hover:bg-accent">
                        <AddToPlaylist value={"Add to playlist"} videoId={videoId} />
                    </div>
                </PopoverContent>
            </Popover>

        </div>
    )
}

VideoActions.propTypes = {
    videoId: PropTypes.string
}

export default VideoActions