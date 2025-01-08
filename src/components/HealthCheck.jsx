import { healthCheck } from "@/api/user.api";
import { timeAgo } from "@/utils/convertTime";
import { Hourglass } from "lucide-react";
import { useEffect, useState } from "react";

const HealthCheck = () => {
    const [health, setHealth] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    let time;

    function refreshLoading() {
        setTimeout(() => {
            setIsLoading(false);
        }, 400);
    }

    useEffect(() => {
        const checkHealth = async () => {
            refreshLoading();
            const response = await healthCheck();
            console.log(response)
            setHealth(response.data);
        };

        //TODO: After deploy activate setinterval

        // setInterval(() => {
        //     setIsLoading(true);
        //     checkHealth();
        // }, 15000);

        checkHealth();
    }, []);

    return (
        <>
            <div className="px-4 py-2 rounded-md bg-accent">
                {isLoading
                    ?
                    <p className="flex gap-2 items-center text-blue-500">
                        <Hourglass className="text-sm duration-[2000] animate-spin" />
                        <span>Checking Server Health</span>
                    </p>
                    :
                    <div className="flex gap-3 items-center animate-fade-in-out">
                        <span className="flex relative self-start pt-1 w-3 h-3">
                            <span className={`relative inline-flex w-3 h-3 rounded-full ${health.success ? "bg-green-500" : "bg-red-500"}`} />
                            <span className={`absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping ${health.success ? "bg-green-500" : "bg-red-500"}`} />
                        </span>
                        <div className="flex flex-col text-sm font-semibold">
                            <span className="">Database: <span className={`${health.success ? "text-green-500" : "text-red-500"} animate-pulse`}>
                                {health.database || "Disconnected"}
                            </span>
                            </span>
                            <span className="">Status: <span className={`${health.success ? "text-green-500" : "text-red-500"} animate-pulse`}>
                                {health.status || "Offline"}
                            </span>
                            </span>
                            <span className="">Uptime: <span>
                                {health.uptime || "N/A"}
                            </span>
                            </span>
                            <span className="">Date: <span>
                                {health.timestamp && new Date(health.timestamp).toDateString() || "N/A"}
                            </span>
                            </span>

                            {/* <p className={`${health.success ? "text-green-500" : "text-red-500"}`}>Server {health.success ? "Health OK" : "Not Functional"}</p> */}
                        </div>
                    </div >
                }
            </div>
        </>
    )
}

export default HealthCheck