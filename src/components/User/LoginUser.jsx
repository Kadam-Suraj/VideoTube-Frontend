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
import PropTypes from "prop-types"

const LoginUser = ({ state }) => {

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
        // if (isLoggedIn) {
        //     navigate(-1);
        // }
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
                navigate('/');
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
            <section className="flex-1">
                <div >
                    <h2 className="mb-10 text-2xl font-semibold text-center">
                        Login to your account
                    </h2>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto space-y-4">
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
                            <div className="flex flex-col gap-2 justify-between">
                                <NavLink to={"/change-password"} className="text-blue-500">Change password ?</NavLink>
                                <span onClick={() => state(false)} className="text-blue-500 cursor-pointer">{"Don't have an account ?"}</span>
                            </div>
                            <div className="flex gap-2 justify-between items-center">
                                <ShowPassword setShowPassword={setShowPassword} showPassword={showPassword} />
                                <Button type="submit">Login</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </section >
        </>
    )
}

LoginUser.propTypes = {
    state: PropTypes.func
}

export default LoginUser