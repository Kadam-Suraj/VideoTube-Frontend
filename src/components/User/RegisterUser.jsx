import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Smile } from "lucide-react"
import { useState } from "react"
import { registerUser } from "@/api/user.api"
import { useToast } from "@/hooks/use-toast"
import PropTypes from "prop-types"
import ShowPassword from "../ShowPassword"

const RegisterUser = ({ state }) => {
    const { toast } = useToast();
    const [avatar, setAvatar] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const formSchema = z.object({
        avatar: z
            .instanceof(File, { message: "File must be an image." })
            .refine((file) => file.type.startsWith("image/"), { message: "File must be a valid image type." }),
        username: z
            .string()
            .toLowerCase()
            .min(2, {
                message: "Username must be at least 2 characters.",
            }),
        fullName: z
            .string()
            .min(2, {
                message: "Full name must be at least 2 characters.",
            }),
        email: z
            .string()
            .email({
                message: "Invalid email.",
            }),
        password: z
            .string()
            .min(6, {
                message: "Password must be at least 6 characters.",
            }),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            avatar: null,
            username: "",
            fullName: "",
            email: "",
            password: "",
        },
    })

    async function onSubmit(values) {

        const response = await registerUser(values);

        if (response.success) {
            toast({
                variant: "success",
                title: "Registered successfully",
                description: "You can now login",
            })
            state(true);
            return;
        }

        if (!response.success) {
            toast({
                variant: "destructive",
                title: response.message || "Registration Failed",
            })
            return;
        }
    }

    return (
        <>
            <section className="grid flex-1">
                <h3 className="mb-10 text-2xl font-medium text-center">Register your account</h3>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full space-y-8">
                        <div className="flex gap-5">
                            <FormField
                                control={form.control}
                                name="avatar"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Avatar *</FormLabel>
                                        <FormControl>
                                            <span className="relative flex items-center justify-center w-20 h-20 overflow-hidden border rounded-full">
                                                <Input
                                                    onChange={(e) => { field.onChange(e.target.files[0]); setAvatar(URL.createObjectURL(e.target.files[0])) }}
                                                    className="absolute w-full h-full rounded-full opacity-0 cursor-pointer" type="file" accept=".png, .jpg, .jpeg, .gif" />
                                                {
                                                    avatar ?
                                                        <img className="object-cover w-full h-full" src={avatar} alt="avatar" />
                                                        :
                                                        < Smile size={40} />
                                                }
                                            </span>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Username *</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="enter your username" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name *</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="enter your full name" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email *</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="enter your email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password *</FormLabel>
                                    <FormControl>
                                        <Input type={showPassword ? "text" : "password"} placeholder="enter your username" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <span onClick={() => state(true)} className="text-blue-500 cursor-pointer">{"Already have an account ?"}</span>
                        <div className="flex items-center justify-between gap-2">
                            <ShowPassword setShowPassword={setShowPassword} showPassword={showPassword} />
                            <Button className="self-end w-fit" type="submit">Register</Button>
                        </div>
                    </form>
                </Form>
            </section>
        </>
    )
}

RegisterUser.propTypes = {
    state: PropTypes.func
}

export default RegisterUser