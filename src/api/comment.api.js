import axios from 'axios';

const options = {
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // This will send cookies with the request and allow the server to set cookies
}

export const getVideoComments = async (id) => {
    try {
        const response = await axios.get(`/api/v1/comments/${id}`, {
            options
        });

        return response;

    } catch (error) {
        console.error(error);
        return error.response
    }
};

export const addVideoComment = async (id, data) => {
    try {
        const response = await axios.post(`/api/v1/comments/${id}`, data, {
            options
        });
        return response;

    } catch (error) {
        console.error(error);
        return error.response
    }
};