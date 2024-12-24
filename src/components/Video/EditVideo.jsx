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
import { PenBox, Pencil } from "lucide-react"
import { Textarea } from "../ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { updateVideo } from "@/api/user.api"

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    description: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
})
const EditVideo = ({ data, fnc }) => {
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
        }
        toast({
            variant: "destructive",
            title: "Failed to update the delete video",
        })
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
                    <h2 className="mt-5 text-sm font-medium">Thumbnail</h2>
                    <section className="relative grid grid-cols-1 gap-5 text-black">
                        <span className="absolute p-2 bg-white rounded-full top-10 right-10">
                            <PenBox />
                        </span>
                        <img src={data?.thumbnail} alt="coverImage" className="object-contain rounded-md aspect-video" />
                    </section>

                    <section className="my-8">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                                <Button type="submit" >Update info</Button>
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