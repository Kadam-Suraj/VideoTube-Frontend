import PropTypes from "prop-types";
import { Avatar } from "../Avatar";
import countFormat from "@/utils/countFormat";
import Subscribe from "../User/Subscribe";
import TotalSubscribers from "../User/TotalSubscribers";
import { Button } from "../ui/button";
import { useState } from "react";
import { PenBox } from "lucide-react";
import UploadImage from "../User/UploadImage";
import { updateUserAvatar, updateUserCoverImage } from "@/api/user.api";

const ProfileBanner = ({ memoizedUser, stats, fnc }) => {
    const [isEditing, setIsEditing] = useState(false);
    stats = stats || false;

    return (
        <div className="grid grid-cols-1 gap-5 min-[375px]:my-5">
            <div className="relative flex items-center justify-center object-cover object-center w-full m-auto rounded-md h-60">
                {
                    memoizedUser.coverImage ?
                        <img src={memoizedUser.coverImage} alt="coverImage" className="object-cover object-center w-full h-full rounded-md" />
                        :
                        <span className="text-xl font-semibold text-center text-accent-foreground/50" >No Cover Image</span>
                }
                {
                    !stats && isEditing &&

                    <span className="absolute flex items-center justify-center p-2 border rounded-full -top-2 -right-2 text-accent-foreground bg-background border-accent-foreground">
                        <UploadImage type="cover image" api={updateUserCoverImage}>
                            <PenBox size={20} />
                        </UploadImage>
                    </span>
                }
            </div>
            <div className="relative flex flex-col items-center space-x-5 min-[375px]:ml-10 min-[375px]:flex-row">
                <div className="relative -top-12">
                    <Avatar size="xl" url={memoizedUser.avatar} className="border-4 border-background" />
                    {
                        !stats && isEditing &&

                        <span className="absolute flex items-center justify-center p-2 border rounded-full -top-2 -right-2 text-accent-foreground bg-background border-accent-foreground">
                            <UploadImage type="avatar" api={updateUserAvatar}>
                                <PenBox size={20} />
                            </UploadImage>
                        </span>
                    }
                </div>
                <div className="flex flex-col items-start relative justify-between flex-1 w-full min-[550px]:flex-row space-y-5 max-[375px]:-top-8">
                    <div className="relative flex flex-col justify-center space-y-1">
                        <h1 className="text-xl font-medium">{memoizedUser.fullName}</h1>
                        <div className="font-normal">
                            <p className="opacity-50 dark:text-gray-300 dark:opacity-80">@{memoizedUser.username}</p>
                            {
                                stats &&
                                <>
                                    <TotalSubscribers count={memoizedUser?.subscribersCount} />
                                    <span> • </span>
                                    <span className="opacity-50 dark:text-gray-300 dark:opacity-80">{countFormat(memoizedUser.subscriptionsCount)} {memoizedUser.subscriptionsCount === 1 ? "Subscription" : "Subscriptions"}</span>
                                </>
                            }
                            <p className="opacity-50 dark:text-gray-300 dark:opacity-80">Joined on: {new Date(memoizedUser.createdAt).toDateString()}</p>
                        </div>
                    </div>
                    {
                        stats ?
                            <span className="min-[550px]:relative right-5">
                                <Subscribe fnc={fnc} owner={memoizedUser} />
                            </span>
                            :
                            <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                                {isEditing ? "close" : "Edit images"}
                            </Button>
                    }
                </div>
            </div>
        </div>
    )
}

ProfileBanner.propTypes = {
    memoizedUser: PropTypes.shape({
        avatar: PropTypes.string,
        coverImage: PropTypes.string,
        fullName: PropTypes.string,
        username: PropTypes.string,
        createdAt: PropTypes.string,
        subscribersCount: PropTypes.number,
        subscriptionsCount: PropTypes.number
    }),
    stats: PropTypes.bool,
    fnc: PropTypes.func
}

export default ProfileBanner