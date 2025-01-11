import { Button } from "@/components/ui/button"
import { NavLink } from "react-router-dom"
import PropTypes from "prop-types"

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
        <div className='flex flex-col items-center justify-center p-5 sm:h-[calc(100vh-6.5rem)] h-[calc(100vh-10.5rem)] md:flex-row sm:space-x-10'>
            <img src={`/404.svg`} className="w-4/5 min-w-72 sm:min-w-96 md:w-2/5" alt="NotFound" />
            <div className="flex flex-col items-center justify-center space-y-5">
                <h1 className="text-5xl font-bold md:text-7xl" aria-label={`Error Code: ${code}`}>{data?.title || error.title}</h1>
                <span className="text-xl font-semibold">Error: {data?.message || error.message}</span>
                <span className="flex items-center gap-5">
                    <NavLink to={data?.link || error.link}>
                        <Button>{data?.fallback || error.fallback}</Button>
                    </NavLink>
                    {
                        data?.fallback !== "Go back" && error.fallback !== "Go back" &&
                        <NavLink to="/">
                            <Button>Home</Button>
                        </NavLink>
                    }
                </span>
            </div>
        </div>
    )
}

Error.propTypes = {
    code: PropTypes.number,
    data: PropTypes.object
}

export default Error