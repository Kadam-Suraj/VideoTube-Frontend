import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import PropTypes from "prop-types"
import { Label } from "../ui/label"
import { updateUser } from "@/api/user.api"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
    description: z.string().min(2, {
        message: "Description must be at least 2 characters.",
    }),
})

const EditChannelInfo = ({ data }) => {

    const { toast } = useToast();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: data?.username + " - Cannot be changed" || "",
            description: data?.description || "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values) {
        if (data?.description === values.description) {
            toast({
                title: "Details are unchanged",
                description: "Update ignored. Please try again",
            })
            return;
        }
        (async () => {
            const response = await updateUser(values);
            if (response.success) {
                toast({
                    variant: "success",
                    title: "Channel info updated successfully",
                })
                return;
            }
            toast({
                variant: "destructive",
                title: "Failed to update channel info",
            })
        })()
    }

    return (
        <>
            <section className="grid grid-cols-1 gap-4 space-y-8 md:grid-flow-col sm:grid-cols-3">
                <div className="flex flex-col gap-2 mt-8">
                    <Label className="text-xl">Channel Information</Label>
                    <span>Update your channel details.</span>
                </div>
                <div className="col-span-2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter username" disabled {...field} />
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
                                            <Input placeholder="Enter description" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Save changes</Button>
                        </form>
                    </Form>
                </div>
            </section>
        </>
    )
}

EditChannelInfo.propTypes = {
    data: PropTypes.shape({
        username: PropTypes.string,
        description: PropTypes.string,
    }),
}

export default EditChannelInfo