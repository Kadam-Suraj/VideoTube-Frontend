import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import { NavLink } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import { useNavigate } from 'react-router-dom';
import { loginUser } from "@/api/user.api"
import { useEffect, useState } from "react"
import { useAuth } from "@/context/AuthContext"
import ShowPassword from "@/components/ShowPassword"

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { isLoggedIn, login } = useAuth();

    const { toast } = useToast();
    const navigate = useNavigate();

    const formSchema = z.object({
        username: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
        password: z.string().min(2, {
            message: "Password should be more than 2 characters.",
        }),
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);

    async function onSubmit(values) {
        const response = await loginUser(values);

        if (response.success) {
            login();
            toast({
                variant: "success",
                title: `Welcome back ${response.data.user.fullName}`,
            })
            setTimeout(() => {
                navigate(-1);
            }, 500);
            return;
        }
        if (!response.success) {
            toast({
                variant: "destructive",
                title: "Login Failed",
                description: response.message || "Internal server error.",
            })
        }
    }


    return (
        <>
            <section>
                <div className="container flex flex-col gap-5 p-4 mx-auto my-10 md:flex-row">
                    <div className="items-center justify-center flex-1 hidden sm:block">
                        <div className="flex items-center justify-center w-full h-64 bg-gray-20">
                            <span className="text-gray-500">Image Placeholder</span>
                        </div>
                    </div>
                    <div className="flex-1">
                        <h2 className="mb-10 text-2xl font-semibold text-center">
                            Login to your account
                        </h2>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto space-y-4 md:w-96">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username / Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your username / email (must be in lowercase)" {...field} />
                                            </FormControl>
                                            {/* <FormDescription>
                                                This is your public display name.
                                            </FormDescription> */}
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type={`${showPassword ? "text" : "password"}`} placeholder="Enter your password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div>
                                    <NavLink to={"/change-password"} className="text-blue-500">change password?</NavLink>
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                    <ShowPassword setShowPassword={setShowPassword} showPassword={showPassword} />
                                    <Button type="submit">Login</Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login