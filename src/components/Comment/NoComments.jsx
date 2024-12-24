import { MessageSquareWarning } from "lucide-react"

const NoComments = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-2">
            <MessageSquareWarning size={40} />
            <h2 className="text-2xl font-semibold text-center">No comments found</h2>
            <span>No comments found. Be the first to comment!</span>
        </div>
    )
}

export default NoComments