import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { EllipsisVertical } from "lucide-react"
import AddToPlaylist from "../PlayList/AddToPlaylist"

const VideoActions = ({ videoId }) => {
    return (
        <div>
            <Popover>
                <PopoverTrigger>
                    <EllipsisVertical className="text-accent-foreground/80" />
                </PopoverTrigger>
                <PopoverContent className="p-1 w-fit">
                    <div className="p-2 rounded-md hover:bg-accent">
                        <AddToPlaylist value={"Add to playlist"} videoId={videoId} />
                    </div>
                </PopoverContent>
            </Popover>

        </div>
    )
}

export default VideoActions