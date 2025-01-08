import LoadingCircle from "./LoadingCircle"

const Loading = () => {
    return (
        <button type="button" className="inline-flex items-center px-4 py-2 mx-auto text-sm font-semibold leading-6 rounded-full shadow transition duration-150 ease-in-out cursor-not-allowed text-background bg-accent-foreground h-fit w-fit" disabled="">
            <LoadingCircle />
            Loading...
        </button>
    )
}

export default Loading