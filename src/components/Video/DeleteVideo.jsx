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
import { useState } from "react";


const DeleteVideo = ({ fnc, id }) => {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();

    async function onSubmit() {
        const response = await deleteVideo(id);
        if (response.success) {
            fnc();
            toast({
                variant: "success",
                title: response.message || "Video deleted successfully",
            })
        }
        if (!response.success) {
            toast({
                variant: "destructive",
                title: response.message || "Failed to delete video",
            })
        }
        setOpen(false);
    }

    return (
        <>
            <Popover open={open} onOpenChange={(open) => setOpen(open)}>
                <PopoverTrigger>
                    <Trash2 />
                </PopoverTrigger>
                <PopoverContent className="flex gap-2 items-center px-2 py-0 w-fit">
                    <Alert className="space-x-2 w-96 border-none">
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