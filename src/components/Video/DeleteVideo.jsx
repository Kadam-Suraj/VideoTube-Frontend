import { deleteVideo } from "@/api/user.api";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, Trash2 } from "lucide-react"
import PropTypes from "prop-types";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "../ui/button";


const DeleteVideo = ({ fnc, id }) => {
    const { toast } = useToast();

    async function onSubmit() {
        const response = await deleteVideo(id);
        if (response.success) {
            fnc();
            toast({
                variant: "success",
                title: "Video deleted successfully",
            })
            return;
        }
        toast({
            variant: "destructive",
            title: "Failed to delete video",
        })
    }

    return (
        <>
            <Popover>
                <PopoverTrigger>
                    <Trash2 />
                </PopoverTrigger>
                <PopoverContent className="flex items-center gap-2 px-2 py-0 w-fit">
                    <Alert className="space-x-2 border-none w-96">
                        <AlertTriangle />
                        <AlertTitle>Are you absolutely sure?</AlertTitle>
                        <AlertDescription className="text-accent-foreground/80">
                            This action cannot be undone. This will permanently delete the video from server.
                        </AlertDescription>
                    </Alert>
                    <Button variant="destructive" onClick={onSubmit}>Delete</Button>
                </PopoverContent>
            </Popover>
        </>
    )
}

DeleteVideo.propTypes = {
    fnc: PropTypes.any.isRequired,
    id: PropTypes.any.isRequired,
};

export default DeleteVideo