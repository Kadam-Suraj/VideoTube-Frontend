import axios from "axios";
import { options } from "./user.api";

const addVideoToHistory = async (videoId) => {
    try {
        const response = await axios.post(`/api/v1/history/${videoId}`, options);
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}

const getWatchHistory = async () => {
    try {
        const response = await axios.get("/api/v1/history/", options);
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}

const removeFromWatchHistory = async (id) => {
    try {
        const response = await axios.delete(`/api/v1/history/${id}`, options);
        return response.data
    } catch (error) {
        console.error(error)
        return error.response.data
    }
}

export {
    addVideoToHistory,
    getWatchHistory,
    removeFromWatchHistory
}