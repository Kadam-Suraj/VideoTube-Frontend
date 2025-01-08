import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { FolderPlus } from "lucide-react"
import { Input } from "../ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Textarea } from "../ui/textarea"
import { Label } from "../ui/label"
import AddVideos from "./AddVideos"
import { useState } from "react"
import { createPlaylist } from "@/api/playlist"
import { useToast } from "@/hooks/use-toast"


const CreatePlaylist = ({ fnc, videoRequired = true }) => {
    const [videos, setVideos] = useState([]);
    const [open, setOpen] = useState(false);

    const { toast } = useToast();

    const formSchema = z.object({
        name: z.string().min(2, {
            message: "Title must be at least 2 characters.",
        }),
        description: z.string().min(2, {
            message: "Description must be at least 2 characters.",
        }),
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    })

    async function onSubmit(values) {
        values = { ...values, videoIds: videos };
        if (!videos.length && videoRequired) {
            toast({
                variant: "destructive",
                title: "Please add at least one video to the playlist",
            })
            return;
        }
        else {
            const res = await createPlaylist(values);
            if (res.data.success) {
                setOpen(false);
                toast({
                    variant: "success",
                    title: "Playlist created successfully",
                });
                form.reset();
                setVideos([]);
                fnc();
            } else {
                toast({
                    variant: "destructive",
                    title: "Failed to create the playlist",
                })
            }
        }
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
                <DialogTrigger className="flex gap-3 items-center px-4 py-2 font-medium rounded-full bg-accent-foreground text-background">
                    New <FolderPlus />
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create a new Playlist</DialogTitle>
                    </DialogHeader>
                    <DialogDescription />
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title *</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Add a title" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description *</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                className="resize-none"
                                                rows={Math.max(1, String | field?.value?.split("\n").length)}
                                                placeholder="Add a description" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {
                                videoRequired &&
                                <div className="flex justify-between items-end space-x-4">
                                    <div className="flex flex-col gap-2 items-start">
                                        <Label>Videos</Label>
                                        <span className="text-sm text-muted-foreground">Choose a existing video to add to this playlist</span>
                                        <div className="flex gap-2 justify-between items-center w-full">
                                            <Dialog>
                                                <DialogTrigger className="px-4 py-2 text-sm font-medium rounded-full bg-foreground text-background">
                                                    Add videos
                                                </DialogTrigger>
                                                <DialogContent className="grid">
                                                    <DialogHeader>
                                                        <DialogTitle>Choose videos</DialogTitle>
                                                    </DialogHeader>
                                                    <DialogDescription />
                                                    <AddVideos addToPlaylist={setVideos} playlistVideos={videos} />
                                                    <DialogTrigger asChild>
                                                        <Button className="justify-self-end w-fit">Done</Button>
                                                    </DialogTrigger>
                                                </DialogContent>
                                            </Dialog>
                                            {
                                                videos.length !== 0 &&
                                                < span className="px-4 py-2 text-sm rounded-full bg-accent">{videos.length} {videos.length === 1 ? "video" : "videos"} selected</span>
                                            }
                                        </div>
                                    </div>
                                </div>
                            }
                            <Button className="self-end" type="submit">
                                Create
                            </Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div >
    )
}

export default CreatePlaylist