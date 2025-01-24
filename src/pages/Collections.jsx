import { getCollections } from "@/api/user.api";
import NoContent from "@/components/Content/NoContent";
import Loading from "@/components/Loading";
import { Library } from "lucide-react";
import { useEffect, useState } from "react";

const Collections = () => {
    const [collections, setCollections] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchCollections = async () => {
        const response = await getCollections();
        if (response.success) {
            setCollections(response.data);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchCollections();
    }, [])

    // console.log(collections)

    return (
        <div className="flex flex-col w-full gap-5 mx-auto mt-5 ">
            <h3 className="text-3xl font-bold">Collections</h3>
            {
                isLoading ?
                    <Loading />
                    :
                    collections ?
                        <div className="grid items-center w-full gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {
                                collections?.collections.map((item, idx) => <PlayListCard key={idx} item={item} fetchPlaylists={fetchCollections} />)
                            }
                        </div>
                        :
                        <NoContent type="collection">
                            <Library size={40} />
                        </NoContent>
            }
        </div>
    )
}


import PropTypes from "prop-types";
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import VideoCount from "@/components/Video/VideoCount";
import { NavLink } from "react-router-dom";
import { PlaylistActions } from "@/components/PlayList/PlaylistActions";
import { deletePlaylist } from "@/api/playlist";
import { PlayListCard } from "@/components/PlayList/PlayList";

const CollectionCard = ({ item }) => {

    return (
        <NavLink to={`/watch?v=${item.video._id}&playlist=${item._id}`} className="mx-auto hover:scale-105 transition-transform duration-300 shrink min-h[20.5rem] min-w[22.5rem]"
            onClick={(e) => {
                // Prevent navigation if the click originated from the buttons inside this section
                if (e.target.closest(".prevent-link")) {
                    e.preventDefault();
                }
            }}
        >
            <Card className="w-full">
                <CardContent className="relative w-full h-full p-0">
                    <img src={item?.video?.thumbnail} className="rounded-t-md" alt="playlist-thumbnail" />
                    <VideoCount count={item?.totalVideos} />
                </CardContent>
                <CardFooter className="flex flex-col items-start p-2">
                    <div className="flex items-center justify-between">
                        <h4 className="font-medium">{item.name}</h4>
                        <PlaylistActions className="prevent-link" data={item} type="playlist" api={deletePlaylist} />
                    </div>
                    <span className="text-muted-foreground">{item.description}</span>
                </CardFooter>
            </Card>
        </NavLink>
    )
}

CollectionCard.propTypes = {
    item: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        totalVideos: PropTypes.number,
        description: PropTypes.string,
        video: PropTypes.object
    })
}

export default Collections