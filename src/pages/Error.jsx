import PropTypes from "prop-types"
import NavigateButton from "@/components/NavigateButton"
import ContinueSession from "@/components/Profile/ContinueSession";

const Error = ({ code = 404, data }) => {

    const errors = {
        404: {
            code: 404,
            title: "Not Found!",
            message: "Page not found",
            fallback: "Go back",
            link: "/"
        },
        401: {
            code: 401,
            title: "Unauthorized",
            message: "You are not authorized to access this page.",
            fallback: "Login",
            link: "/login",
        },
        500: {
            code: 500,
            title: "Internal Server Error",
            message: "We encountered an error on our side. Please try again later.",
            fallback: "Go back",
            link: "/"
        },
        403: {
            code: 403,
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
        <div className='flex flex-wrap items-center w-full gap-10 p-5 m-auto justify-evenly'>
            <img src={`/404.svg`} className="w-4/5 shrink-0 min-w-72 sm:min-w-96 md:w-2/5" alt="NotFound" />
            <div className="flex flex-col items-center justify-center space-y-5">
                <div className="flex flex-col items-center justify-center gap-2">
                    <h1 className="text-5xl font-bold md:text-7xl" aria-label={`Error Code: ${code}`}>{data?.title || error.title}</h1>
                    <span className="text-xl font-semibold text-center">Code: {data?.code || error.code}</span>
                    <span className="text-xl font-semibold text-center">Error: {data?.message || error.message}</span>
                </div>
                <span className="flex items-center gap-5">
                    {
                        data?.link || error.link == "/login" ?
                            <ContinueSession />
                            :
                            < NavigateButton to={data?.link || error.link} name={data?.fallback || error.fallback} />
                    }
                    {
                        data?.fallback !== "Go back" && error.fallback !== "Go back" && window.location.pathname !== "/" &&
                        <NavigateButton to="/" name={"Home"} />
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