import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import PropTypes from 'prop-types'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    // FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Pencil } from "lucide-react"
import { Textarea } from "../ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { updateVideo } from "@/api/video.api"

const formSchema = z.object({
    thumbnail: z
        .instanceof(File, { message: "File must be an image." })
        .refine((file) => file.type.startsWith("image/"), { message: "File must be a valid image type." }),
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    description: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
})
const EditVideo = ({ data, fnc }) => {
    const [image, setImage] = useState(null);
    const { toast } = useToast();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: data.title || "",
            description: data.description || "",
            thumbnail: data.thumbnail || "",
        },
    })

    async function onSubmit(values) {
        const response = await updateVideo(data._id, values);
        if (response.success) {
            fnc();
            toast({
                variant: "success",
                title: "Video updated successfully",
            })
            return;
        } else {
            toast({
                variant: "destructive",
                title: response.message || "Failed to update the delete video",
            })
        }
    }

    return (
        <>
            <Dialog >
                <DialogTrigger>
                    <Pencil className="" />
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update video</DialogTitle>
                        <DialogDescription>
                            Edit video information.
                        </DialogDescription>
                    </DialogHeader>
                    <section className="my8">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8">
                                <FormField
                                    control={form.control}
                                    name="thumbnail"
                                    render={({ field }) => (
                                        <FormItem className="p-0">
                                            <FormLabel>Thumbnail</FormLabel>
                                            <FormControl>
                                                <section className="relative">
                                                    <Input type="file"
                                                        onChange={(e) => { field.onChange(e.target.files[0]); setImage(URL.createObjectURL(e.target.files[0])) }} className="absolute left-0 right-0 mx-auto border-none cursor-pointer backdrop-blur-sm bg-background/50 bottom-2 w-52" />
                                                    <img src={image || data?.thumbnail} alt="thumbnail" className="object-contain rounded-md aspect-video" />
                                                </section>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="enter username" {...field} />
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
                                                <Textarea placeholder="enter description" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button disabled={!form.formState.isValid} type="submit" className="self-end" >Update info</Button>
                            </form>
                        </Form>
                    </section>
                </DialogContent>
            </Dialog>
        </>
    )

}

EditVideo.propTypes = {
    data: PropTypes.shape({
        title: PropTypes.string,
        thumbnail: PropTypes.string,
        description: PropTypes.string,
        _id: PropTypes.string
    }),
    fnc: PropTypes.func,
}

export default EditVideo