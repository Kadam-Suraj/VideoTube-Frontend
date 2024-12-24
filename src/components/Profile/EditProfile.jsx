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
import { PenBox } from "lucide-react"
import { updateUser } from "@/api/user.api"

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    fullName: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Invalid email.",
    }),
})

const EditProfile = ({ data }) => {

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: data.username || "",
            fullName: data.fullName || "",
            email: data.email || "",
        },
    })

    function onSubmit(values) {
        // console.log(values)
    }

    return (
        <>
            <Dialog>
                <DialogTrigger className="px-5 py-2 mt-3 font-semibold rounded-full w-fit bg-foreground text-background">Edit Profile</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{data?.fullName}</DialogTitle>
                        <DialogDescription>
                            Edit your profile information.
                        </DialogDescription>
                    </DialogHeader>
                    <section className="relative grid grid-cols-1 gap-5 p-5 text-black">
                        <span className="absolute p-2 bg-white rounded-full top-10 right-10">
                            <PenBox />
                        </span>
                        <img src={data?.coverImage} alt="coverImage" className="object-cover object-center w-full rounded-md h-80" />
                        <div className="absolute w-48 rounded-full -bottom-5">
                            <span className="absolute top-0 right-0 p-2 bg-white rounded-full">
                                <PenBox />
                            </span>
                            <img src={data?.avatar} alt="avatar" className="object-cover w-48 h-48 rounded-full -bottom-5" />
                        </div>
                    </section>

                    <section className="my-8">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input placeholder="enter username" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="enter name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="enter email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">Save changes</Button>
                            </form>
                        </Form>
                    </section>
                </DialogContent>
            </Dialog>
        </>
    )
}
EditProfile.propTypes = {
    data: PropTypes.shape({
        username: PropTypes.string,
        email: PropTypes.string,
        fullName: PropTypes.string,
        avatar: PropTypes.string,
        coverImage: PropTypes.string,
    }),
}

export default EditProfile;