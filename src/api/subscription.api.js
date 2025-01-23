import axios from "axios";
import { options } from "./user.api";

export const getSubscriptions = async (id) => {
    try {
        const response = await axios.get(`/api/v1/subscriptions/c/${id}`, {
            options
        });
        return response;

    } catch (error) {
        console.error(error);
        return error.response
    }
};

export const getSubscribers = async () => {
    try {
        const response = await axios.get(`/api/v1/subscriptions/u/`, {
            options
        });
        return response.data;

    } catch (error) {
        console.error(error);
        return error.response.data
    }
};