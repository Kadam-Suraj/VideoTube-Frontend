import axios from 'axios';
import { options } from './user.api';

export const getCreatedPlaylists = async (id) => {
    try {
        const response = await axios.get(`/api/v1/playlists/user/${id}`, {
            options
        });
        return response;

    } catch (error) {
        console.error(error);
        return error.response
    }
};

export const getAllPlaylists = async (id) => {
    try {
        const response = await axios.get(`/api/v1/playlists/user/all/${id}`, {
            options
        });
        return response;

    } catch (error) {
        console.error(error);
        return error.response
    }
};

export const createPlaylist = async (data) => {
    try {
        const response = await axios.post(`/api/v1/playlists/`, data, {
            options
        });
        return response;

    } catch (error) {
        console.error(error);
        return error.response
    }
};

export const addVideoToPlaylist = async (id, data) => {
    try {
        const response = await axios.patch(`/api/v1/playlists/add/${id}`, data, {
            options
        });
        return response;

    } catch (error) {
        console.error(error);
        return error.response
    }
};

export const checkVideoInPlaylist = async (videoId, playlistId) => {
    try {
        const response = await axios.get(`/api/v1/playlists/check/${videoId}/${playlistId}`, {
            options
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return error.response.data;
    }
};


export const getPlaylistById = async (id) => {
    try {
        const response = await axios.get(`/api/v1/playlists/${id}`, {
            options
        });
        return response;

    } catch (error) {
        console.error(error);
        return error.response
    }
};

export const updatePlaylist = async (id, data) => {
    try {
        const response = await axios.patch(`/api/v1/playlists/${id}`, data, {
            options
        });
        return response;

    } catch (error) {
        console.error(error);
        return error.response
    }
};

export const deletePlaylist = async (id) => {
    try {
        const response = await axios.delete(`/api/v1/playlists/${id}`, {
            options
        });
        return response;

    } catch (error) {
        console.error(error);
        return error.response
    }
};

export const removeVideoFromPlaylist = async (videoId, playlistId) => {
    try {
        const response = await axios.patch(`/api/v1/playlists/remove/${videoId}/${playlistId}`, {
            options
        });
        return response.data;

    } catch (error) {
        console.error(error);
        return error.response.data
    }
};

export const addVideoFromPlaylist = async (videoId, playlistId) => {
    try {
        const response = await axios.patch(`/api/v1/playlists/add/${videoId}/${playlistId}`, {
            options
        });
        return response.data;

    } catch (error) {
        console.error(error);
        return error.response.data
    }
};

const updateLikedVideos = async (id) => {
    try {
        const response = await axios.post(`/api/v1/videos/v/${id}`, {
            options
        });

        return response;

    } catch (error) {
        console.error(error);
        return error.response
    }
};

export const togglePlaylistVisibility = async (playlistId) => {
    try {
        const response = await axios.patch(`/api/v1/playlists/user/${playlistId}`, {
            options
        });
        return response.data;

    } catch (error) {
        console.error(error);
        return error.response.data
    }
};

const clearPlaylist = async (playlistId) => {
    try {
        const response = await axios.post(`/api/v1/playlists/c/${playlistId}`, options);
        return response.data;
    } catch (error) {
        console.error(error);
        return error.response.data
    }
}

const addRemoveFromWatchLater = async (id) => {
    try {
        const response = await axios.patch(`/api/v1/playlists/watch/${id}`, options);
        return response.data
    } catch (error) {
        console.error(error);
        return error.response.data;
    }
}

export {
    clearPlaylist,
    addRemoveFromWatchLater,
    updateLikedVideos
}