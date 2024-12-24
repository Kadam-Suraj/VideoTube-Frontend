import { FileVideo2 } from "lucide-react"

const NoVideo = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-2">
            <FileVideo2 size={40} />
            <h2 className="text-2xl font-semibold text-center">No videos found</h2>
            <span>There are no videos available here.</span>
        </div>
    )
}

export default NoVideo