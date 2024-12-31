import { currentUser, healthCheck } from "@/api/user.api";
import { useEffect, useMemo, useState } from "react";
import { ProfileSkeleton } from "./Profile";
import ProfileStats from "@/components/Profile/Profile_Stats";
import ManageVideos from "@/components/Video/Manage_Videos";
import AdminHeader from "@/components/Profile/AdminHeader";

const Dashboard = () => {

    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        const user = async () => {
            const response = await currentUser();
            if (response.data.success) {
                setTimeout(() => {
                    setLoggedInUser(response.data.data);
                }, 300)
            } else {
                setLoggedInUser(null);
            }
        }

        user();
    }, []);


    const memoizedUser = useMemo(() => loggedInUser, [loggedInUser]);
    return (
        <>
            <section className="relative flex flex-col items-center">
                <div className="self-end">
                    <HealthCheck />
                </div>
                {!loggedInUser ? <ProfileSkeleton /> :
                    <div className="grid w-full grid-cols-1 gap-5 my-10">
                        <div className="flex items-center max-[450px]:flex-col justify-between gap-5">
                            <AdminHeader username={memoizedUser.fullName} />
                            <span className="self-end">
                                < UploadVideo />
                            </span>
                        </div>
                        <span className="w-full h-[.1rem] bg-gray-300 dark:bg-gray-800" />
                        <div>
                            <h2 className="text-2xl font-semibold">Channel Statistics</h2>
                            <div className="">
                                <ProfileStats />
                            </div>
                        </div>
                        <div>
                            <ManageVideos />
                        </div>
                    </div>
                }
            </section>
        </>
    )
}

export default Dashboard




import { Hourglass } from "lucide-react";
import UploadVideo from "@/components/Video/UploadVideo";

const HealthCheck = () => {
    const [health, setHealth] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    function refreshLoading() {
        setTimeout(() => {
            setIsLoading(false);
        }, 400);
    }

    useEffect(() => {
        const checkHealth = async () => {
            refreshLoading();
            const response = await healthCheck();
            setHealth(response.data.success);
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
            {isLoading
                ?
                <p className="flex items-center gap-2 text-blue-500">
                    <Hourglass className="text-sm duration-[2000] animate-spin" />
                    <span>Checking Server Health</span>
                </p>
                :
                <div className="flex items-center gap-2 animate-fade-in-out">
                    <span className="relative flex w-3 h-3">
                        <span className={`relative inline-flex w-3 h-3 rounded-full ${health ? "bg-green-500" : "bg-red-500"}`}></span>
                        <span className={`absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping ${health ? "bg-green-500" : "bg-red-500"}`}></span>
                    </span>
                    <p className={`${health ? "text-green-500" : "text-red-500"}`}>Server {health ? "Health OK" : "Not Functional"}</p>
                </div >
            }
        </>
    )
}

export { HealthCheck }