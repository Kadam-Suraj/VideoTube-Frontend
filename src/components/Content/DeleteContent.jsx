import { AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { useToast } from "@/hooks/use-toast"
// import { deleteComment } from "@/api/comment.api"
import PropTypes from "prop-types"
import { useState } from "react"

const DeleteContent = ({ id, fnc, api, type }) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const { toast } = useToast();

    async function handleDelete() {
        setIsPopoverOpen(false);
        const response = await api(id);
        if (response.data.success) {
            toast({
                variant: "success",
                title: `${type[0].toUpperCase() + type.slice(1)} deleted successfully`,
            })
            fnc();
            return;
        }

        if (!response.data.success) {
            toast({
                variant: "destructive",
                title: "Delete Failed",
                description: response.message || `Unable to delete ${type}.`,
            })
        }
    }

    return (
        <div>
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger className="w-full text-left">
                    Delete
                </PopoverTrigger>
                <PopoverContent className="flex items-center gap-2 px-2 py-0 w-fit">
                    <Alert className="space-x-2 border-none w-96">
                        <AlertTriangle />
                        <AlertTitle>Confirm deletion</AlertTitle>
                        <AlertDescription className="text-accent-foreground/80">
                            This action cannot be undone.
                        </AlertDescription>
                    </Alert>
                    <Button variant="destructive"
                        onClick={handleDelete}>
                        Delete
                    </Button>
                </PopoverContent>
            </Popover >
        </div>
    )
}

DeleteContent.propTypes = {
    id: PropTypes.string,
    fnc: PropTypes.func,
    api: PropTypes.func,
    type: PropTypes.string
}

export default DeleteContent