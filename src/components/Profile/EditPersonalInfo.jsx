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
    firstName: z.string().min(2, {
        message: "First name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
        message: "Last name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Invalid email.",
    }),
})

const EditPersonalInfo = ({ data }) => {

    const { toast } = useToast();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: data?.fullName?.split(" ").slice(0, -1).join(" ") || "",
            lastName: data?.fullName?.split(" ").slice(-1)[0] || "",
            email: data?.email || "",
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values) {
        values = { ...values, fullName: `${values.firstName} ${values.lastName}` };
        if (data?.fullName === values.fullName && data?.email === values.email) {
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
                    title: "Personal info updated successfully",
                })
                return;
            }
            toast({
                variant: "destructive",
                title: "Failed to update personal info",
            })
        })()
    }

    return (
        <>
            <section className="grid grid-cols-1 gap-4 space-y-8 md:grid-flow-col sm:grid-cols-3">
                <div className="flex flex-col w-full gap-2 mt-8">
                    <Label className="text-xl">Personal Information</Label>
                    <span>Update your account personal details.</span>
                </div>
                <div className="col-span-2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="flex flex-col flex-wrap items-start w-full gap-4 sm:flex-row">
                                <div className="flex-1 w-full">
                                    <FormField
                                        control={form.control}
                                        name="firstName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>First name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter first name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex-1 w-full">
                                    <FormField
                                        control={form.control}
                                        name="lastName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Last name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter last name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your email" {...field} />
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

EditPersonalInfo.propTypes = {
    data: PropTypes.shape({
        email: PropTypes.string,
        fullName: PropTypes.string,
    }),
}

export default EditPersonalInfo
