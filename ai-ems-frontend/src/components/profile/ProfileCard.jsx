import React, { useEffect, useState } from "react";
import {
    Mail,
    Phone,
    Building2,
    Briefcase,
    Calendar,
    User,
    Camera,
    Trash2,
    Pencil,
    Save,
    X,
} from "lucide-react";

const DEFAULT_AVATAR =
    "https://ui-avatars.com/api/?name=Employee&background=ecf4f9&color=0c1d27&size=200";

const API_BASE_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:8080/api";

const SERVER_BASE_URL =
    API_BASE_URL.replace(/\/api\/?$/, "");

const getProfileImageUrl = (profileImage) => {
    if (!profileImage) {
        return DEFAULT_AVATAR;
    }

    if (
        profileImage.startsWith("http://") ||
        profileImage.startsWith("https://")
    ) {
        return profileImage;
    }

    if (profileImage.startsWith("/uploads/")) {
        return `${SERVER_BASE_URL}${profileImage}`;
    }

    return `${SERVER_BASE_URL}/uploads/${profileImage}`;
};

const ProfileCard = ({
    profile,
    editMode,
    formData,
    onChange,
    onEdit,
    onSave,
    onCancel,
    onUploadImage,
    onDeleteImage,
    saving,
    uploading,
    deletingImage,
}) => {
    const [imageUrl, setImageUrl] = useState(
        DEFAULT_AVATAR
    );

    useEffect(() => {
        setImageUrl(
            getProfileImageUrl(
                profile?.profileImage
            )
        );
    }, [profile?.profileImage]);

    if (!profile) {
        return (
            <div className="rounded-2xl border border-[#ced0c8]/50 bg-white p-8 shadow-sm">
                <p className="text-sm text-[#696e5e]">
                    Profile data unavailable.
                </p>
            </div>
        );
    }

    const handleImageError = () => {
        setImageUrl(DEFAULT_AVATAR);
    };

    return (
        <div className="overflow-hidden rounded-2xl border border-[#ced0c8]/50 bg-white shadow-sm">
            {/* Profile Header */}
            <div className="border-b border-[#ced0c8]/50 bg-[#f3f4f0]/50 px-6 py-8 md:px-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-col items-center gap-5 sm:flex-row">
                        <div className="relative">
                            <img
                                src={imageUrl}
                                alt={
                                    profile.fullName
                                }
                                onError={
                                    handleImageError
                                }
                                className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-md"
                            />

                            {editMode && (
                                <>
                                    <label
                                        htmlFor="profile-image-upload"
                                        className="absolute bottom-0 right-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#31749b] text-white shadow-md transition hover:bg-[#255774]"
                                        title="Upload profile image"
                                    >
                                        <Camera
                                            size={16}
                                        />
                                    </label>

                                    <input
                                        id="profile-image-upload"
                                        type="file"
                                        accept="image/jpeg,image/png,image/jpg"
                                        className="hidden"
                                        onChange={
                                            onUploadImage
                                        }
                                        disabled={
                                            uploading
                                        }
                                    />
                                </>
                            )}
                        </div>

                        <div className="text-center sm:text-left">
                            <h1 className="text-2xl font-bold tracking-tight text-[#0c1d27]">
                                {
                                    profile.fullName
                                }
                            </h1>

                            <p className="mt-1 text-sm font-medium text-[#696e5e]">
                                {
                                    profile.designation ||
                                    "Employee"
                                }
                            </p>

                            <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                                <span className="rounded-full border border-[#ebf4d7] bg-[#f5faeb] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#5c7821]">
                                    {
                                        profile.status ||
                                        "ACTIVE"
                                    }
                                </span>

                                <span className="rounded-full border border-[#ced0c8]/60 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#696e5e]">
                                    {
                                        profile.employeeCode ||
                                        "Employee"
                                    }
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-2 md:justify-end">
                        {editMode ? (
                            <>
                                <button
                                    type="button"
                                    onClick={
                                        onCancel
                                    }
                                    disabled={
                                        saving
                                    }
                                    className="flex items-center gap-2 rounded-lg border border-[#ced0c8] bg-white px-4 py-2 text-sm font-semibold text-[#4f5346] transition hover:bg-[#f3f4f0] disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <X
                                        size={16}
                                    />
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    onClick={
                                        onSave
                                    }
                                    disabled={
                                        saving
                                    }
                                    className="flex items-center gap-2 rounded-lg bg-[#31749b] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#255774] disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <Save
                                        size={16}
                                    />

                                    {saving
                                        ? "Saving..."
                                        : "Save Changes"}
                                </button>
                            </>
                        ) : (
                            <button
                                type="button"
                                onClick={onEdit}
                                className="flex items-center gap-2 rounded-lg bg-[#31749b] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#255774]"
                            >
                                <Pencil
                                    size={16}
                                />
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>

                {editMode &&
                    profile.profileImage && (
                        <button
                            type="button"
                            onClick={
                                onDeleteImage
                            }
                            disabled={
                                deletingImage
                            }
                            className="mt-5 flex items-center gap-2 text-xs font-semibold text-rose-600 transition hover:text-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <Trash2
                                size={14}
                            />

                            {deletingImage
                                ? "Removing..."
                                : "Remove profile photo"}
                        </button>
                    )}
            </div>

            {/* Personal Information */}
            <div className="px-6 py-8 md:px-8">
                <div className="mb-6">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-[#4f5346]">
                        Personal Information
                    </h2>

                    <p className="mt-1 text-xs text-[#9ca191]">
                        Information you are allowed
                        to update.
                    </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                    <Info
                        icon={<Mail size={18} />}
                        label="Email"
                        value={
                            profile.email
                        }
                    />

                    {editMode ? (
                        <EditableInfo
                            icon={
                                <Phone size={18} />
                            }
                            label="Phone"
                            name="phone"
                            type="tel"
                            value={
                                formData.phone
                            }
                            onChange={
                                onChange
                            }
                            placeholder="Enter phone number"
                        />
                    ) : (
                        <Info
                            icon={
                                <Phone size={18} />
                            }
                            label="Phone"
                            value={
                                profile.phone
                            }
                        />
                    )}

                    <Info
                        icon={
                            <User size={18} />
                        }
                        label="Gender"
                        value={
                            profile.gender
                        }
                    />

                    {editMode ? (
                        <EditableInfo
                            icon={
                                <Calendar size={18} />
                            }
                            label="Date of Birth"
                            name="dob"
                            type="date"
                            value={
                                formData.dob
                            }
                            onChange={
                                onChange
                            }
                        />
                    ) : (
                        <Info
                            icon={
                                <Calendar size={18} />
                            }
                            label="Date of Birth"
                            value={
                                profile.dob
                            }
                        />
                    )}

                    {editMode ? (
                        <EditableInfo
                            icon={
                                <MapPinIcon />
                            }
                            label="Address"
                            name="address"
                            type="textarea"
                            value={
                                formData.address
                            }
                            onChange={
                                onChange
                            }
                            placeholder="Enter address"
                            fullWidth
                        />
                    ) : (
                        <Info
                            icon={
                                <MapPinIcon />
                            }
                            label="Address"
                            value={
                                profile.address
                            }
                            fullWidth
                        />
                    )}
                </div>
            </div>

            {/* Employment Information */}
            <div className="border-t border-[#ced0c8]/40 bg-[#f8f9f7] px-6 py-8 md:px-8">
                <div className="mb-6">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-[#4f5346]">
                        Employment Information
                    </h2>

                    <p className="mt-1 text-xs text-[#9ca191]">
                        Employment-controlled
                        information.
                    </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                    <Info
                        icon={
                            <Briefcase size={18} />
                        }
                        label="Employee Code"
                        value={
                            profile.employeeCode
                        }
                    />

                    <Info
                        icon={
                            <Building2 size={18} />
                        }
                        label="Department"
                        value={
                            profile.department
                        }
                    />

                    <Info
                        icon={
                            <Briefcase size={18} />
                        }
                        label="Designation"
                        value={
                            profile.designation
                        }
                    />

                    <Info
                        icon={
                            <Calendar size={18} />
                        }
                        label="Joining Date"
                        value={
                            profile.joiningDate
                        }
                    />
                </div>
            </div>
        </div>
    );
};

const Info = ({
    icon,
    label,
    value,
    fullWidth = false,
}) => (
    <div
        className={`flex items-start gap-4 rounded-xl border border-[#ced0c8]/40 bg-white p-4 ${
            fullWidth
                ? "md:col-span-2"
                : ""
        }`}
    >
        <div className="mt-0.5 text-[#31749b]">
            {icon}
        </div>

        <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#9ca191]">
                {label}
            </p>

            <p className="mt-1 break-words text-sm font-semibold text-[#183a4e]">
                {value || "—"}
            </p>
        </div>
    </div>
);

const EditableInfo = ({
    icon,
    label,
    name,
    type,
    value,
    onChange,
    placeholder,
    fullWidth = false,
}) => (
    <div
        className={`rounded-xl border border-[#31749b]/30 bg-[#fafdff] p-4 ${
            fullWidth
                ? "md:col-span-2"
                : ""
        }`}
    >
        <div className="mb-2 flex items-center gap-3">
            <div className="text-[#31749b]">
                {icon}
            </div>

            <label
                htmlFor={name}
                className="text-[10px] font-bold uppercase tracking-wider text-[#9ca191]"
            >
                {label}
            </label>
        </div>

        {type === "textarea" ? (
            <textarea
                id={name}
                name={name}
                value={value || ""}
                onChange={onChange}
                placeholder={
                    placeholder
                }
                rows={3}
                className="w-full resize-none rounded-lg border border-[#ced0c8] bg-white px-3 py-2.5 text-sm text-[#0c1d27] outline-none transition focus:border-[#31749b] focus:ring-2 focus:ring-[#31749b]/20"
            />
        ) : (
            <input
                id={name}
                name={name}
                type={type}
                value={value || ""}
                onChange={onChange}
                placeholder={
                    placeholder
                }
                className="w-full rounded-lg border border-[#ced0c8] bg-white px-3 py-2.5 text-sm text-[#0c1d27] outline-none transition focus:border-[#31749b] focus:ring-2 focus:ring-[#31749b]/20"
            />
        )}
    </div>
);

const MapPinIcon = () => (
    <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle
            cx="12"
            cy="10"
            r="3"
        />
    </svg>
);

export default ProfileCard;