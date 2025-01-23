import { getSearchResults } from "@/api/video.api";
import NoContent from "@/components/Content/NoContent";
import Loading from "@/components/Loading";
import SubscribersList from "@/components/SubscribersList";
import { VideoCard } from "@/components/Video/VideoCard";
import { SearchX } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

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
        <div className="max-w-2xl pt-5 mx-auto">
            {
                isLoading ?
                    <Loading /> :
                    data?.videos?.length || data?.users?.length > 0 ?
                        <div className="space-y-5">
                            {
                                data?.users?.length > 0 &&
                                <div className="flex flex-col space-y-5">
                                    {
                                        data?.users.map((item) => (
                                            <SubscribersList key={item._id} item={item} />
                                        ))
                                    }
                                </div>
                            }
                            {

                            }
                            {
                                data?.videos?.length > 0 && <div className="flex flex-col gap-3">
                                    {
                                        data.videos.map((item) =>
                                            <div key={item._id} className="">
                                                < VideoCard item={item} type="panel" className="" />
                                            </div>
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