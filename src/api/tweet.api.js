import axios from "axios";
import { options } from "./user.api";

export const addTweet = async (data) => {
    console.log(data)
    try {
        const response = await axios.post(`/api/v1/tweets/`, data, {
            options
        });
        return response;

    } catch (error) {
        console.error(error);
        return error.response
    }
};

export const getTweets = async (id) => {
    try {
        const response = await axios.get(`/api/v1/tweets/user/${id}`, {
            options
        });
        return response;

    } catch (error) {
        console.error(error);
        return error.response
    }
};

export const editTweet = async (id, data) => {
    try {
        const response = await axios.patch(`/api/v1/tweets/${id}`, data, {
            options
        });
        return response;

    } catch (error) {
        console.error(error);
        return error.response
    }
};

export const likeTweet = async (id) => {
    try {
        const response = await axios.post(`/api/v1/likes/toggle/t/${id}`, {
            options
        });
        return response;

    } catch (error) {
        console.error(error);
        return error.response
    }
};

export const deleteTweet = async (id) => {
    try {
        const response = await axios.delete(`/api/v1/tweets/${id}`, {
            options
        });
        return response;

    } catch (error) {
        console.error(error);
        return error.response
    }
};