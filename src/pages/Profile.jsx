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
                <div className="grid w-full grid-cols-1 gap-5 mx-auto">
                    <ProfileBanner memoizedUser={memoizedUser} />
                    <MenubarSeparator />
                    <div>
                        <Tabs defaultValue="personal">
                            <TabsList className="grid justify-around w-full grid-cols-3 bg-transparent">
                                <TabsTrigger value="personal" className="rounded-none">
                                    Personal
                                </TabsTrigger>
                                <TabsTrigger value="channel" className="rounded-none">
                                    Channel
                                </TabsTrigger>
                                <TabsTrigger value="password" className="rounded-none">
                                    Password
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
import ProfileBanner from "@/components/Profile/ProfileBanner";
import { MenubarSeparator } from "@/components/ui/menubar";

const ProfileSkeleton = () => {
    return (
        <div className="grid w-full grid-cols-1 gap-5 mx-auto">
            <div className="relative grid grid-cols-1 gap-5 md:grid-cols-">
                <Skeleton className="object-cover object-center w-full rounded-md h-60" />
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
            <MenubarSeparator />
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