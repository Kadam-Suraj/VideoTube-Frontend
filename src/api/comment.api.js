import axios from 'axios';
import { options } from './user.api';

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

export const addVideoComment = async (data, id) => {
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

export const editVideoComment = async (id, data) => {
    try {
        const response = await axios.patch(`/api/v1/comments/c/${id}`, data, {
            options
        });
        return response;

    } catch (error) {
        console.error(error);
        return error.response
    }
};

export const deleteComment = async (id) => {
    try {
        const response = await axios.delete(`/api/v1/comments/c/${id}`, {
            options
        });
        return response;

    } catch (error) {
        console.error(error);
        return error.response
    }
};

export const likeComment = async (id) => {
    try {
        const response = await axios.post(`/api/v1/likes/toggle/c/${id}`, {
            options
        });
        return response;

    } catch (error) {
        console.error(error);
        return error.response
    }
};