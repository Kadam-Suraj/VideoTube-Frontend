import { currentUser } from "@/api/user.api";
import { useEffect, useMemo, useState } from "react";
import { ProfileSkeleton } from "./Profile";
import ProfileStats from "@/components/Profile/Profile_Stats";
import ManageVideos from "@/components/Video/Manage_Videos";
import AdminHeader from "@/components/Profile/AdminHeader";
import UploadVideo from "@/components/Video/UploadVideo";
import HealthCheck from "@/components/HealthCheck";

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