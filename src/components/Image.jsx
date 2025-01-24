import PropTypes from "prop-types";
import LoadingCircle from "./LoadingCircle";
import axios from "axios";
import { useEffect, useState } from "react";

const Image = ({ url, alt }) => {
    const [loaded, setLoaded] = useState(false);

    async function checkImage(url) {
        try {
            const response = await axios.get(url, { responseType: 'blob' });
            if (response.status === 200 && response.headers['content-type'].startsWith('image/')) {
                console.log('Image fetched successfully');
                return true;
            } else {
                console.log('URL does not contain an image');
                return false;
            }
        } catch (error) {
            console.error('Error fetching image:', error.message);
            return false;
        }
    }

    useEffect(() => {
        setLoaded(checkImage());
    }, [url])


    return (
        <>
            {
                !loaded ?
                    <span className="flex items-center justify-center w-full h-full p-4 min-h-24">
                        <LoadingCircle />
                    </span>
                    :
                    <img src={url} alt={alt || "video-thumbnail"} loading="lazy" className="object-cover w-full h-full rounded-md aspect-video" />
            }
        </>
    )
}

Image.propTypes = {
    url: PropTypes.string,
    alt: PropTypes.string
}

export default Image