import { getUser } from "@/api/user.api";
import Loading from "@/components/Loading";
import { PlayList } from "@/components/PlayList/PlayList";
import ProfileBanner from "@/components/Profile/ProfileBanner";
import Tweet from "@/components/Tweet/Tweet";
import { MenubarSeparator } from "@/components/ui/menubar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SubscribedTo from "@/components/User/Subscribers";
import UserVideos from "@/components/Video/UserVideos";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

const User = () => {
    const { username } = useParams();
    const [user, setUser] = useState(null);

    const fetchUser = async () => {
        const response = await getUser(username.slice(1));
        if (response.data.success) {
            setUser(response.data.data);
        }
    }
    useEffect(() => {
        fetchUser();

        return () => {
            setUser(null);
        }
    }, [username]);

    return (
        <div className="flex flex-col justify-center w-full">
            {!user ?
                <div className="text-center">
                    < Loading />
                </div>
                :
                <section>
                    <ProfileBanner fnc={fetchUser} stats={true} memoizedUser={user} />
                    <div>
                        <Tabs defaultValue="video">
                            <TabsList className="grid justify-around w-full grid-cols-4 bg-transparent">
                                <TabsTrigger value="video" className="rounded-none">
                                    Videos
                                </TabsTrigger>
                                <TabsTrigger value="playlist" className="rounded-none">
                                    Playlists
                                </TabsTrigger>
                                <TabsTrigger value="tweet" className="rounded-none">
                                    Tweets
                                </TabsTrigger>
                                <TabsTrigger value="sub" className="rounded-none">
                                    Subscribed
                                </TabsTrigger>
                            </TabsList>
                            <MenubarSeparator />
                            <div className="my-2">
                                <TabsContent value="video">
                                    <UserVideos userId={user._id} />
                                </TabsContent>
                                <TabsContent value="playlist">
                                    <PlayList user={user} />
                                </TabsContent>
                                <TabsContent value="tweet">
                                    <Tweet id={user._id} />
                                </TabsContent>
                                <TabsContent value="sub">
                                    <SubscribedTo id={user?._id} />
                                </TabsContent>
                            </div>
                        </Tabs>
                    </div>
                </section>
            }
        </div>
    )
}

export default User