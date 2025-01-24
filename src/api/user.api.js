import axios from 'axios';

export const options = {
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // This will send cookies with the request and allow the server to set cookies
}

const registerUser = async (data) => {
    try {
        const response = await axios.post(`/api/v1/users/register`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

const loginUser = async (data) => {
    try {
        const response = await axios.post(`/api/v1/users/login`, data, options);
        if (response.status !== 200) {
            throw new Error("Login failed");
        }
        return response.data;

    } catch (error) {
        console.log(error);
        return error.response.data;
    }
};

const updateUser = async (data) => {
    try {
        const response = await axios.patch(`/api/v1/users/update-profile`, data, options);
        return response.data;
    } catch (error) {
        throw new error("Profile Update failed");
    }
};

const updateUserAvatar = async (data, onProgress, signal) => {
    try {
        const response = await axios.patch(`/api/v1/users/update-avatar`, data, {
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
        });
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    }
};

const updateUserCoverImage = async (data, onProgress, signal) => {
    console.log(data)
    try {
        const response = await axios.patch(`/api/v1/users/update-cover`, data, {
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
        });
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    }
};

const changePassword = async (data) => {
    try {
        const response = await axios.post(`/api/v1/users/change-password`, data, options);
        return response.data;
    } catch (error) {
        console.error(error);
        return error.response.data;
    }
};


const currentUser = async () => {
    try {
        const response = await axios.get(`/api/v1/users/current-user`, options);
        return response;

    } catch (error) {
        return error.response
    }
};

const refreshSession = async () => {
    try {
        const response = await axios.post(`/api/v1/users/refresh-token`, options);
        return response;

    } catch (error) {
        return error.response
    }
};

const logOutUser = async () => {
    try {
        const response = await axios.post(`/api/v1/users/logout`, options);
        return response;

    } catch (error) {
        console.error(error);
        return error.response
    }
};

const subscribeUser = async (id) => {
    try {
        const response = await axios.post(`/api/v1/subscriptions/c/${id}`, options);
        return response;

    } catch (error) {
        console.error(error);
        return error.response
    }
};

const getPublicVideos = async () => {
    try {
        const response = await axios.get(`/api/v1/videos/`, {
            options,
            params: {
                limit: 35,
                page: 1,
                sortBy: "createdAt",
                sortType: "desc",
            },
        });

        return response;

    } catch (error) {
        console.error(error);
        return error.response
    }
};

const dashboardVideos = async () => {
    try {
        const response = await axios.get(`/api/v1/dashboard/videos/`, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true, // For including cookies
        });

        return response;

    } catch (error) {
        console.error(error);
        throw new Error("Failed to get current user");
    }
};

const getStats = async () => {
    try {
        const response = await axios.get(`/api/v1/dashboard/stats`, options);
        return response;

    } catch (error) {
        console.error(error);
        throw new Error("Failed to get stats");
    }
};

const healthCheck = async () => {
    try {
        const response = await axios.get(`/api/v1/healthCheck/`, options);
        return response;

    } catch (error) {
        console.error(error);
        return error.response
    }
}

const togglePublish = async (id) => {
    try {
        const response = await axios.patch(`/api/v1/videos/toggle/publish/${id}`, options);
        return response.data.data.isPublished;

    } catch (error) {
        throw new error("Failed to get stats");
    }
}

const deleteVideo = async (id) => {
    try {
        const response = await axios.delete(`/api/v1/videos/${id}`, options);
        return response.data;

    } catch (error) {
        return error.response.data
    }
}

const getUser = async (username) => {
    try {
        const response = await axios.get(`/api/v1/users/c/${username}`, options);
        return response;

    } catch (error) {
        return error.response
    }
};

const checkId = async (id) => {
    try {
        const response = await axios.get(`/api/v1/users/checkId/${id}`, options);
        return response?.data;

    } catch (error) {
        return error.response?.data
    }
};

const getCollections = async () => {
    try {
        const response = await axios.get("/api/v1/users/collections", options);
        return response.data;
    } catch (error) {
        console.error(error);
        return error.response.data;
    }
}

export {
    changePassword,
    checkId,
    currentUser,
    dashboardVideos,
    deleteVideo,
    getCollections,
    getPublicVideos,
    getStats,
    getUser,
    healthCheck,
    loginUser,
    logOutUser,
    refreshSession,
    registerUser,
    subscribeUser,
    togglePublish,
    updateUser,
    updateUserAvatar,
    updateUserCoverImage,
}