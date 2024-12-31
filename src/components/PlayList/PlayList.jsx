import { ListVideo } from "lucide-react"
import NoContent from "../Content/NoContent"

const PlayList = () => {
    return (
        <div>
            <NoContent type="playlist">
                <ListVideo size={40} />
            </NoContent >
        </div>
    )
}

export default PlayList