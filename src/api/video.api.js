import axios from 'axios';

const options = {
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // This will send cookies with the request and allow the server to set cookies
}

export const getVideoById = async (id) => {
    try {
        const response = await axios.get(`/api/v1/videos/${id}`, {
            options
        });

        return response;

    } catch (error) {
        console.error(error);
        return error.response
    }
};

export const likeVideo = async (id) => {
    try {
        const response = await axios.post(`/api/v1/likes/toggle/v/${id}`, {
            options
        });

        return response;

    } catch (error) {
        console.error(error);
        return error.response
    }
};