import axios from 'axios';

export const options = {
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // This will send cookies with the request and allow the server to set cookies
}
export const registerUser = async (data) => {
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

export const loginUser = async (data) => {
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

export const updateUser = async (data) => {
    try {
        const response = await axios.patch(`/api/v1/users/update-profile`, data, options);
        return response.data;
    } catch (error) {
        throw new error("Profile Update failed");
    }
};

export const updateUserAvatar = async (data, onProgress, signal) => {
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

export const updateUserCoverImage = async (data, onProgress, signal) => {
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

export const changePassword = async (data) => {
    try {
        const response = await axios.post(`/api/v1/users/change-password`, data, options);
        return response.data;
    } catch (error) {
        console.error(error);
        return error.response.data;
    }
};


export const currentUser = async () => {
    try {
        const response = await axios.get(`/api/v1/users/current-user`, options);
        return response;

    } catch (error) {
        return error.response
    }
};

export const refreshSession = async () => {
    try {
        const response = await axios.post(`/api/v1/users/refresh-token`, options);
        return response;

    } catch (error) {
        return error.response
    }
};

export const logOutUser = async () => {
    try {
        const response = await axios.post(`/api/v1/users/logout`, options);
        return response;

    } catch (error) {
        console.error(error);
        return error.response
    }
};

export const subscribeUser = async (id) => {
    try {
        const response = await axios.post(`/api/v1/subscriptions/c/${id}`, options);
        return response;

    } catch (error) {
        console.error(error);
        return error.response
    }
};

export const getPublicVideos = async () => {
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

export const dashboardVideos = async () => {
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

export const getStats = async () => {
    try {
        const response = await axios.get(`/api/v1/dashboard/stats`, options);
        return response;

    } catch (error) {
        console.error(error);
        throw new Error("Failed to get stats");
    }
};

export const healthCheck = async () => {
    try {
        const response = await axios.get(`/api/v1/healthcheck/`, options);
        return response;

    } catch (error) {
        throw new error("Failed to get stats");
    }
}

export const togglePublish = async (id) => {
    try {
        const response = await axios.patch(`/api/v1/videos/toggle/publish/${id}`, options);
        return response.data.data.isPublished;

    } catch (error) {
        throw new error("Failed to get stats");
    }
}

export const updateVideo = async (id, data) => {
    try {
        const response = await axios.patch(`/api/v1/videos/${id}`, data, options);
        return response.data;

    } catch (error) {
        throw new error("Failed to get stats");
    }
}

export const deleteVideo = async (id) => {
    try {
        const response = await axios.delete(`/api/v1/videos/${id}`, options);
        return response.data;

    } catch (error) {
        throw new error("Failed to get stats");
    }
}

export const getUser = async (username) => {
    try {
        const response = await axios.get(`/api/v1/users/c/${username}`, options);
        return response;

    } catch (error) {
        return error.response
    }
};