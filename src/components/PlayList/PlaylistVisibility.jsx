import { togglePlaylistVisibility } from "@/api/playlist";
import { useState } from "react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Earth, LockKeyhole } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PlaylistVisibility = ({ playlist, fnc }) => {
    const { toast } = useToast();

    const [visibility, setVisibility] = useState(playlist?.isPublic);

    const toggleVisibility = async (newVisibility) => {
        const response = await togglePlaylistVisibility(playlist?._id);
        if (response.success) {
            setVisibility(newVisibility);
            fnc();

            toast({
                title: `${response?.data?.name} set to ${response?.data?.isPublic ? "Public" : "Private"}`,
            })
        } else {
            console.error("Failed to update visibility", response.message);
        }
    };

    const handleVisibilityChange = (value) => {
        const isPublic = value === "public";
        toggleVisibility(isPublic);
    };

    console.log(playlist)

    return (
        <div className="flex flex-col space-y-1">
            <span className="pl-2 text-sm text-muted-foreground">Privacy (takes effect immediately)</span>
            <Select
                value={visibility ? "public" : "private"}
                onValueChange={handleVisibilityChange}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={visibility ? "Public" : "Private"} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="public">
                        <span className="flex items-center space-x-2">
                            <Earth /> <span>Public</span>
                        </span>
                    </SelectItem>
                    <SelectItem value="private">
                        <span className="flex items-center space-x-2">
                            <LockKeyhole /> <span>Private</span>
                        </span>
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

export default PlaylistVisibility;