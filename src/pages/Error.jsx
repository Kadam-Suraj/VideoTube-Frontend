import { Button } from "@/components/ui/button"
import { NavLink } from "react-router-dom"

const Error = ({ code = 404, data }) => {
    const errors = {
        404: {
            title: "Oops!",
            message: "Page not found",
            fallback: "Go back",
            link: "/"
        },
        401: {
            title: "Unauthorized",
            message: "You are not authorized to access this page.",
            fallback: "Login",
            link: "/login",
        },
        500: {
            title: "Internal Server Error",
            message: "We encountered an error on our side. Please try again later.",
            fallback: "Go back",
            link: "/"
        },
        403: {
            title: "Forbidden",
            message: "You do not have permission to access this page.",
            fallback: "Go back",
            link: "/"
        },
    }


    let error = errors[code] || {
        title: "Unexpected Error",
        message: "An unknown error occurred.",
        fallback: "Go back",
        link: "/"
    };

    error = {
        ...errors[code],
        ...data
    };

    if (!error) {
        return null
    }

    return (
        <div className='flex flex-col justify-center items-center p-5 space-y-5 md:flex-row sm:space-x-10'>
            <img src={`/404.svg`} className="w-4/5 min-w-72 sm:min-w-96 md:w-2/5" alt="NotFound" />
            <div className="flex flex-col justify-center items-center space-y-5">
                <h1 className="text-5xl font-bold md:text-7xl" aria-label={`Error Code: ${code}`}>{data.title || error.title}</h1>
                <span className="text-xl font-semibold">Error: {data.message || error.message}</span>
                <NavLink to={data.link || error.link}>
                    <Button>{data.fallback || error.fallback}</Button>
                </NavLink>
            </div>
        </div>
    )
}

export default Error