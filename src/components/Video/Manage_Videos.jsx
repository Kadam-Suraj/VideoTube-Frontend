import {
    Table,
    TableBody,
    // TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Switch } from "@/components/ui/switch"
import { useEffect, useMemo, useState } from "react";
import { dashboardVideos, togglePublish } from "@/api/user.api";
import DeleteVideo from "./DeleteVideo";
import EditVideo from "./EditVideo";
import { NavLink } from "react-router-dom";

const ManageVideosSkeleton = () => {
    return (
        <>
            <div className="animate-pulse">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">
                                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                            </TableHead>
                            <TableHead>
                                <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
                            </TableHead>
                            <TableHead className="text-center">
                                <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[...Array(6)].map((_, key) => (
                            <TableRow key={key}>
                                <TableCell>
                                    <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                                </TableCell>
                                <TableCell>
                                    <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
                                </TableCell>
                                <TableCell className="text-center">
                                    <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}


const ManageVideos = () => {

    const [loggedInUser, setLoggedInUser] = useState(null);

    const switchPublish = async (id) => {
        const response = await togglePublish(id);
        if (typeof response === 'boolean') {
            user();
        }
    }
    const user = async () => {
        const response = await dashboardVideos();
        if (response.data.success) {
            setLoggedInUser(response.data.data);
        }
        else {
            setLoggedInUser(null);
        }
    }

    useEffect(() => {
        user();
    }, []);

    const memoizedUser = useMemo(() => loggedInUser, [loggedInUser]);

    return (
        <>
            {!memoizedUser ? (
                <ManageVideosSkeleton />
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Status</TableHead>
                            <TableHead className="text-center">Status</TableHead>
                            <TableHead className="text-center">Uploaded</TableHead>
                            <TableHead className="text-center">Views</TableHead>
                            <TableHead className="text-center">Date uploaded</TableHead>
                            <TableHead className="text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {memoizedUser.map((item, key) => (
                            <TableRow className="" key={key}>
                                <TableCell>
                                    <span onClick={() => switchPublish(item._id)}>
                                        <Switch checked={item.isPublished} />
                                    </span>
                                </TableCell>
                                <TableCell className={`text-center w-36`}>
                                    <span className={`border ${item.isPublished ? "border-green-500" : "border-red-500"} py-2 px-4 rounded-full`}>
                                        {item.isPublished ? "Published" : "Unpublished"}
                                    </span>
                                </TableCell>
                                <TableCell className="min-w-[30rem]">
                                    <NavLink to={`/watch/${item._id}`}>
                                        <div className="flex gap-3">
                                            <img src={item.thumbnail} alt="thumbnail" className="object-contain w-24 h-16" />
                                            <span className="font-medium line-clamp-3 text-ellipsis">
                                                {item.title}
                                            </span>
                                        </div>
                                    </NavLink>
                                </TableCell>
                                <TableCell className="text-center">
                                    {item.views}
                                </TableCell>
                                <TableCell className="text-center min-w-32">
                                    {new Date(item.createdAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="">
                                    <div className="flex items-center justify-center gap-8">
                                        <DeleteVideo fnc={user} id={item._id} />
                                        <EditVideo data={item} fnc={user} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            )}
        </>
    )
}


export default ManageVideos
