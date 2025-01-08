import PropTypes from "prop-types"
import { EllipsisVertical } from "lucide-react"
import { useEffect, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import DeleteContent from "../Content/DeleteContent"
import { DropdownMenuSeparator } from "../ui/dropdown-menu"

const PlaylistActions = ({ className, data, fnc, api, type }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className={className}>
            <Popover open={open} onOpenChange={(open) => setOpen(open)}>
                <PopoverTrigger>
                    <EllipsisVertical className="cursor-pointer" size={20} />
                </PopoverTrigger>
                <PopoverContent className="max-w-40">
                    <DeleteContent type={type} api={api} fnc={fnc} id={data._id} open={setOpen} />
                    <DropdownMenuSeparator />
                    <EditPlaylist data={data} setState={setOpen} fnc={fnc} />
                </PopoverContent>
            </Popover>
        </div>
    )
}

PlaylistActions.propTypes = {
    data: PropTypes.shape({
        _id: PropTypes.string,
    }),
    className: PropTypes.string,
    fnc: PropTypes.func,
    api: PropTypes.func,
    type: PropTypes.string
}


import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import { updatePlaylist } from "@/api/playlist"
import { useToast } from "@/hooks/use-toast"
import PlaylistVisibility from "./PlaylistVisibility"

const EditPlaylist = ({ data, setState, fnc }) => {
    const [open, setOpen] = useState(false);

    const { toast } = useToast();

    const formSchema = z.object({
        name: z.string().min(2, {
            message: "Name must be at least 2 characters.",
        }),
        description: z.string().min(2, {
            message: "Description must be at least 2 characters.",
        }),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: data?.name || "",
            description: data?.description || "",
        },
    });

    async function onSubmit(values) {
        const res = await updatePlaylist(data?._id, values);
        if (res.data.success) {
            toast({
                variant: "success",
                title: "Playlist updated successfully",
            })
            setOpen(false);
            setState(false);
            fnc();
        } else {
            toast({
                variant: "destructive",
                title: "Failed to update the playlist",
            })
        }
    }


    return (
        <div>
            <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
                <DialogTrigger className="w-full text-start">Edit</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Playlist</DialogTitle>
                        <DialogDescription />
                    </DialogHeader>
                    <img src={data?.video?.thumbnail} alt="thumbnail" />
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter playlist name" {...field} />
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
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea className="resize-none" value={field?.value} rows={Math.max(1, field?.value?.split("\n").length)} placeholder="Enter playlist description" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <PlaylistVisibility fnc={fnc} playlist={data} />
                            <Button className="justify-self-end select-none" disabled={(data?.name === form.getValues().name && data?.description === form.getValues().description)} type="submit">Submit</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export { PlaylistActions, EditPlaylist }
