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
import { Label } from "../ui/label"
import { useToast } from "@/hooks/use-toast"
import { changePassword, logOutUser } from "@/api/user.api"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import ShowPassword from "../ShowPassword"

const formSchema = z.object({
    oldPassword: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
    newPassword: z.string().min(6, {
        message: "New password must be at least 6 characters.",
    }),
    confirmPassword: z
        .string()
        .min(6, {
            message: "Confirm password must be at least 6 characters.",
        })
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "New password and confirm password must match.",
    path: ["confirmPassword"], // This highlights the confirmPassword field in case of an error
});

const ChangePassword = () => {
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const { toast } = useToast();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values) {

        (async () => {
            if (values.oldPassword === values.newPassword) {
                toast({
                    title: "New password must be different from old password",
                    description: "Update ignored. Please try again",
                })
                return;
            }
            const response = await changePassword(values);
            if (response.success) {
                toast({
                    variant: "success",
                    title: response.message || "Password updated successfully",

                })

                setTimeout(async () => {
                    const res = await logOutUser();
                    if (res.data.success) {
                        toast({
                            variant: "success",
                            title: "User logged out",
                            description: "Password changed. please login again",
                        })
                        setTimeout(() => {
                            navigate("/login");
                        }, 300);
                    }
                }, 1000);
                return;
            }
            toast({
                variant: "destructive",
                title: "Failed to update",
                description: response.message || "Failed to update password",
            })
        })()
    }

    return (
        <>
            <section className="grid grid-cols-1 gap-4 space-y-8 md:grid-flow-col sm:grid-cols-3">
                <div className="flex flex-col gap-2 mt-8">
                    <Label className="text-xl">Password Information</Label>
                    <span>Update your account password.</span>
                </div>
                <div className="col-span-2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="oldPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Current password</FormLabel>
                                        <FormControl>
                                            <Input type={showPassword ? "text" : "password"} placeholder="Enter current password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New password</FormLabel>
                                        <FormControl>
                                            <Input type={showPassword ? "text" : "password"} placeholder="Enter new password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm password</FormLabel>
                                        <FormControl>
                                            <Input type={showPassword ? "text" : "password"} placeholder="Confirm your password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex max-[340px]:flex-col justify-between gap-5">
                                <ShowPassword setShowPassword={setShowPassword} showPassword={showPassword} />
                                <Button type="submit">Save changes</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </section>
        </>
    )
}

export default ChangePassword