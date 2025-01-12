import { getSearchResults } from "@/api/video.api";
import { Avatar } from "@/components/Avatar";
import NoContent from "@/components/Content/NoContent";
import Loading from "@/components/Loading";
import Subscribe from "@/components/User/Subscribe";
import TotalSubscribers from "@/components/User/TotalSubscribers";
import { VideoCard } from "@/components/Video/VideoCard";
import { SearchX } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";

const SearchResults = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [searchParams] = useSearchParams();
    const query = searchParams.get("search_query");

    const fetchData = async () => {
        const response = await getSearchResults(query);
        if (response.data.success) {
            setData(response.data.data);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [query])

    return (
        <div className="pt-5 mx-auto">
            {
                isLoading ?
                    <Loading /> :
                    data?.videos?.length || data?.users?.length > 0 ?
                        <div className="space-y-5">
                            {
                                data?.users?.length > 0 &&
                                <div className="flex flex-col space-y-5">
                                    {
                                        data?.users.map((item) => {
                                            return (
                                                <div key={item?._id} className="flex items-center space-x-3">
                                                    <NavLink to={`/user/@${item?.username}`} className="flex items-center w-full space-x-3">
                                                        <Avatar url={item?.avatar} size="lg" />
                                                        <div className="">
                                                            <h3>{item?.fullName}</h3>
                                                            <div className="flex flex-wrap items-center space-x-2">
                                                                <span className="text-accent-foreground/70">@{item?.username}</span>
                                                                <TotalSubscribers count={item?.totalSubscribers} />
                                                            </div>
                                                            <p className="text-accent-foreground/70 line-clamp-2">{item?.description}</p>
                                                        </div>
                                                    </NavLink>
                                                    <Subscribe fnc={fetchData} owner={item} className="justify-self-end text-end min-w-36" />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            }
                            {

                            }
                            {
                                data?.videos?.length > 0 && <div className="">
                                    {
                                        data.videos.map((item) =>
                                            < VideoCard key={item._id} item={item} type="search" />
                                        )
                                    }
                                </div>
                            }
                        </div>
                        :
                        <NoContent type="result" >
                            <SearchX size={40} />
                        </NoContent >
            }
        </div >
    )
}

export default SearchResults