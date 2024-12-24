// import EditProfile from "@/components/Profile/EditProfile";
import { useState, useMemo, useEffect } from "react";
import { currentUser } from "@/api/user.api";

const Profile = () => {

    const { isLoggedIn } = useAuth();
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
    }, [isLoggedIn]);


    const memoizedUser = useMemo(() => loggedInUser, [loggedInUser]);

    return (
        <>
            {!loggedInUser ? <ProfileSkeleton /> :
                <div className="container grid grid-cols-1 gap-5 px-5 mx-auto my-10">
                    <div className="relative grid grid-cols-1 gap-5 p-5 md:grid-cols-">
                        <img src={memoizedUser.coverImage} alt="coverImage" className="object-cover object-center w-full rounded-md h-80" />
                        <div className="flex flex-col items-start gap-5 sm:flex-row">
                            <img src={memoizedUser.avatar} alt="avatar" className="object-cover w-40 h-40 rounded-full -bottom-20 md:w-48 md:h-48" />
                            <div className="flex flex-col justify-center gap-2 mt-5">
                                <h1 className="text-3xl font-bold">{memoizedUser.fullName}</h1>
                                <p className="font-normal opacity-50 dark:text-gray-300 dark:opacity-80">@{memoizedUser.username}</p>
                                <p className="font-normal opacity-50 dark:text-gray-300 dark:opacity-80">Joined on: {new Date(memoizedUser.createdAt).toDateString()}</p>
                                {/* <EditProfile data={memoizedUser} /> */}
                            </div>
                        </div>
                    </div>
                    <span className="w-full h-[.1rem] bg-gray-300 dark:bg-gray-800" />
                    <div>
                        <Tabs defaultValue="personal">
                            <TabsList className="justify-around w-full">
                                <TabsTrigger value="personal" >
                                    Personal Information
                                </TabsTrigger>
                                <TabsTrigger value="channel">
                                    Channel Information
                                </TabsTrigger>
                                <TabsTrigger value="password">
                                    Change Password
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="personal">
                                <EditPersonalInfo data={memoizedUser} />
                            </TabsContent>
                            <TabsContent value="channel">
                                <EditChannelInfo data={memoizedUser} />
                            </TabsContent>
                            <TabsContent value="password">
                                <ChangePassword data={memoizedUser} />
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            }
        </>
    );
};

export default Profile;


import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditPersonalInfo from "@/components/Profile/EditPersonalInfo";
import EditChannelInfo from "@/components/Profile/EditChannelInfo";
import ChangePassword from "@/components/Profile/ChangePassword";

const ProfileSkeleton = () => {
    return (
        <div className="container grid h-screen grid-cols-1 gap-5 px-5 mx-auto my-10">
            <div className="relative grid grid-cols-1 gap-5 p-5 md:grid-cols-">
                <Skeleton className="object-cover object-center w-full rounded-md h-80" />
                <div className="flex flex-col items-start gap-5 sm:flex-row">
                    <Skeleton className="w-40 rounded-full -bottom-20 md:w-48" />
                    <div className="flex flex-col justify-center gap-2 mt-5">
                        <Skeleton className="w-48 h-8" />
                        <Skeleton className="w-32 h-6" />
                        <Skeleton className="w-40 h-6" />
                        <Skeleton className="w-full h-10" />
                    </div>
                </div>
            </div>
            <span className="w-full h-[.1rem] bg-gray-300 dark:bg-gray-800" />
            <div>
                <Skeleton className="w-48 h-8" />
                <div className="mt-2">
                    <Skeleton className="w-full h-40" />
                </div>
            </div>
        </div>
    );
};

export { ProfileSkeleton };