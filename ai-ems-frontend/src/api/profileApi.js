import api from "./axios";

/**
 * Get Logged-in User Profile
 */
export const getProfile = async () => {
    const response = await api.get("/profile");
    return response.data;
};

/**
 * Update Profile
 */
export const updateProfile = async (profileData) => {
    const response = await api.put("/profile", profileData);
    return response.data;
};

/**
 * Upload Profile Image
 */
export const uploadProfileImage = async (file) => {

    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post(
        "/profile/photo",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};

/**
 * Delete Profile Image
 */
export const deleteProfileImage = async () => {
    const response = await api.delete("/profile/photo");
    return response.data;
};

/**
 * Change Password
 */
export const changePassword = async (passwordData) => {
    const response = await api.put(
        "/profile/change-password",
        passwordData
    );

    return response.data;
};