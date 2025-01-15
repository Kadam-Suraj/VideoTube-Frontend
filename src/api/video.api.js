import axios from 'axios';
import { options } from './user.api';

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

export const getSearchResults = async (query) => {
    try {
        const response = await axios.get(`/api/v1/videos/search/`, {
            options,
            params: {
                query: query
            }
        });

        return response;

    } catch (error) {
        console.error(error);
        return error.response
    }
};

export const getPanelVideos = async (id) => {
    try {
        const response = await axios.get(`/api/v1/videos/r/${id}`, {
            options
        });

        return response;

    } catch (error) {
        console.error(error);
        return error.response
    }
};

export const updateVideoViews = async (id) => {
    try {
        const response = await axios.post(`/api/v1/videos/${id}`, {
            options
        });

        return response;

    } catch (error) {
        console.error(error);
        return error.response
    }
};

export const getUserVideos = async (id) => {
    try {
        const response = await axios.get("/api/v1/videos/u/", {
            options,
            params: {
                limit: 20,
                page: 1,
                sortBy: "createdAt",
                sortType: "desc",
                userId: id,
            },
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

export const addVideo = async (data, onProgress, signal) => {
    try {
        const response = await axios.post(`/api/v1/videos/`,
            data,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    if (onProgress) {
                        onProgress(progress); // Pass progress to the callback
                    }
                },
                signal
            }
        );
        return response;

    } catch (error) {
        if (axios.isCancel(error)) {
            console.error("Upload cancelled", error.message);
        } else {
            console.error("Error during upload", error);
        }
        return error.response
    }
};

export const updateVideo = async (id, data) => {
    try {
        const response = await axios.patch(`/api/v1/videos/${id}`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
        });
        return response.data;

    } catch (error) {
        console.error(error);
        return error.response.data;
    }
}