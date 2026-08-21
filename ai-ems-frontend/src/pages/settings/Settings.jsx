import React, { useEffect, useState } from "react";

import {
    getProfile,
    updateProfile,
    uploadProfileImage,
    deleteProfileImage,
} from "../../api/profileApi";

import ProfileCard from "../../components/profile/ProfileCard";

// ===========================================================================
// File: src/pages/settings/Settings.jsx
// ===========================================================================

export default function Settings() {
    const [profile, setProfile] = useState(null);

    const [loading, setLoading] =
        useState(true);

    const [editMode, setEditMode] =
        useState(false);

    const [formData, setFormData] =
        useState({
            phone: "",
            dob: "",
            address: "",
        });

    const [saving, setSaving] =
        useState(false);

    const [uploading, setUploading] =
        useState(false);

    const [deletingImage, setDeletingImage] =
        useState(false);

    const [message, setMessage] =
        useState("");

    const [error, setError] =
        useState("");

    const loadProfile = async () => {
        try {
            setLoading(true);
            setError("");

            const data =
                await getProfile();

            setProfile(data);

            setFormData({
                phone: data?.phone || "",
                dob: data?.dob || "",
                address:
                    data?.address || "",
            });
        } catch (error) {
            console.error(
                "Failed to load profile:",
                error
            );

            setError(
                "Failed to load your profile."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProfile();
    }, []);

    const handleChange = (event) => {
        const {
            name,
            value,
        } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleEdit = () => {
        setMessage("");
        setError("");

        setFormData({
            phone:
                profile?.phone || "",
            dob:
                profile?.dob || "",
            address:
                profile?.address || "",
        });

        setEditMode(true);
    };

    const handleCancel = () => {
        setMessage("");
        setError("");

        setFormData({
            phone:
                profile?.phone || "",
            dob:
                profile?.dob || "",
            address:
                profile?.address || "",
        });

        setEditMode(false);
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            setMessage("");
            setError("");

            const updatedProfile =
                await updateProfile({
                    phone: formData.phone,
                    dob: formData.dob || null,
                    address:
                        formData.address,
                });

            setProfile(
                updatedProfile
            );

            setFormData({
                phone:
                    updatedProfile?.phone ||
                    "",
                dob:
                    updatedProfile?.dob ||
                    "",
                address:
                    updatedProfile?.address ||
                    "",
            });

            setEditMode(false);

            setMessage(
                "Profile updated successfully."
            );
        } catch (error) {
            console.error(
                "Failed to update profile:",
                error
            );

            setError(
                error.response?.data
                    ?.message ||
                    "Failed to update profile."
            );
        } finally {
            setSaving(false);
        }
    };

    const handleUploadImage = async (
        event
    ) => {
        const file =
            event.target.files?.[0];

        if (!file) {
            return;
        }

        try {
            setUploading(true);
            setMessage("");
            setError("");

            await uploadProfileImage(
                file
            );

            const updatedProfile =
                await getProfile();

            setProfile(
                updatedProfile
            );

            setMessage(
                "Profile photo updated successfully."
            );
        } catch (error) {
            console.error(
                "Failed to upload profile image:",
                error
            );

            setError(
                error.response?.data
                    ?.message ||
                    "Failed to upload profile photo."
            );
        } finally {
            setUploading(false);

            event.target.value = "";
        }
    };

    const handleDeleteImage =
        async () => {
            try {
                setDeletingImage(true);
                setMessage("");
                setError("");

                await deleteProfileImage();

                const updatedProfile =
                    await getProfile();

                setProfile(
                    updatedProfile
                );

                setMessage(
                    "Profile photo removed successfully."
                );
            } catch (error) {
                console.error(
                    "Failed to delete profile image:",
                    error
                );

                setError(
                    error.response?.data
                        ?.message ||
                        "Failed to remove profile photo."
                );
            } finally {
                setDeletingImage(false);
            }
        };

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="text-sm font-semibold text-[#696e5e]">
                    Loading profile...
                </div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="p-6">
                <div className="rounded-xl border border-rose-200 bg-rose-50 p-6 text-sm font-semibold text-rose-700">
                    {error ||
                        "Profile data is unavailable."}
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto w-full max-w-[1200px] pb-10">
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight text-[#0c1d27]">
                    My Profile
                </h1>

                <p className="mt-1 text-sm text-[#696e5e]">
                    Manage your personal information
                    and profile photo.
                </p>
            </div>

            {message && (
                <div className="mb-5 rounded-lg border border-[#d7e9af] bg-[#f5faeb] px-4 py-3 text-sm font-semibold text-[#5c7821]">
                    {message}
                </div>
            )}

            {error && (
                <div className="mb-5 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
                    {error}
                </div>
            )}

            <ProfileCard
                profile={profile}
                editMode={editMode}
                formData={formData}
                onChange={handleChange}
                onEdit={handleEdit}
                onSave={handleSave}
                onCancel={handleCancel}
                onUploadImage={
                    handleUploadImage
                }
                onDeleteImage={
                    handleDeleteImage
                }
                saving={saving}
                uploading={uploading}
                deletingImage={
                    deletingImage
                }
            />
        </div>
    );
}