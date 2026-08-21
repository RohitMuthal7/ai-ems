import {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    Camera,
    Image as ImageIcon,
    UploadCloud,
    Trash2,
    AlertCircle,
} from "lucide-react";

// ===========================================================================
// File: src/components/employee/ImageUpload.jsx
// ===========================================================================

const API_BASE_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:8080/api";

const SERVER_BASE_URL =
    API_BASE_URL.replace(/\/api\/?$/, "");

const MAX_FILE_SIZE =
    5 * 1024 * 1024;

const ALLOWED_TYPES = [
    "image/jpeg",
    "image/png",
    "image/jpg",
];

const DEFAULT_AVATAR =
    "https://ui-avatars.com/api/?name=Employee&background=ecf4f9&color=0c1d27&size=256";

const getImageUrl = (image) => {
    if (!image) {
        return null;
    }

    if (image instanceof File) {
        return URL.createObjectURL(image);
    }

    if (
        image.startsWith("http://") ||
        image.startsWith("https://")
    ) {
        return image;
    }

    if (
        image.startsWith("/uploads/")
    ) {
        return `${SERVER_BASE_URL}${image}`;
    }

    if (
        image.startsWith("uploads/")
    ) {
        return `${SERVER_BASE_URL}/${image}`;
    }

    return `${SERVER_BASE_URL}/uploads/${image}`;
};

export default function ImageUpload({
    image,
    onImageChange,
    onRemove,
}) {
    const fileInputRef =
        useRef(null);

    const [preview, setPreview] =
        useState(DEFAULT_AVATAR);

    const [error, setError] =
        useState("");

    useEffect(() => {
        setError("");

        if (!image) {
            setPreview(
                DEFAULT_AVATAR
            );

            return;
        }

        if (image instanceof File) {
            const objectUrl =
                URL.createObjectURL(
                    image
                );

            setPreview(objectUrl);

            return () => {
                URL.revokeObjectURL(
                    objectUrl
                );
            };
        }

        const imageUrl =
            getImageUrl(image);

        setPreview(
            imageUrl ||
                DEFAULT_AVATAR
        );
    }, [image]);

    const openFilePicker = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (
        event
    ) => {
        const file =
            event.target.files?.[0];

        // Allow selecting the same
        // file again after removing it.
        event.target.value = "";

        if (!file) {
            return;
        }

        if (
            !ALLOWED_TYPES.includes(
                file.type
            )
        ) {
            setError(
                "Only JPG, JPEG and PNG images are allowed."
            );

            return;
        }

        if (
            file.size >
            MAX_FILE_SIZE
        ) {
            setError(
                "Image size must be 5 MB or smaller."
            );

            return;
        }

        setError("");

        onImageChange?.(file);
    };

    const handleRemove = () => {
        setError("");
        onRemove?.();

        if (fileInputRef.current) {
            fileInputRef.current.value =
                "";
        }
    };

    const hasImage = Boolean(
        image
    );

    return (
        <div className="w-full">

            <div className="rounded-2xl border border-[#ced0c8]/50 bg-white p-5">

                <div className="flex flex-col items-center">

                    {/* =================================================
                        Profile Image
                    ================================================= */}
                    <div className="relative">

                        <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-[#ecf4f9] bg-[#ecf4f9] shadow-sm">

                            <img
                                src={preview}
                                alt="Employee profile"
                                className="h-full w-full object-cover"
                                onError={() => {
                                    setPreview(
                                        DEFAULT_AVATAR
                                    );
                                }}
                            />

                        </div>

                        <button
                            type="button"
                            onClick={
                                openFilePicker
                            }
                            aria-label="Change profile image"
                            className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-[#31749b] text-white shadow-lg transition-all hover:bg-[#255774] hover:scale-105 active:scale-95"
                        >
                            <Camera
                                size={17}
                            />
                        </button>
                    </div>

                    {/* =================================================
                        Information
                    ================================================= */}
                    <div className="mt-4 text-center">

                        <div className="flex items-center justify-center gap-2">
                            <ImageIcon
                                size={14}
                                className="text-[#31749b]"
                            />

                            <h3 className="text-sm font-bold text-[#0c1d27]">
                                Profile Photo
                            </h3>
                        </div>

                        <p className="mt-1 max-w-sm text-[10px] leading-4 text-[#9ca191]">
                            Add a professional profile
                            image for this employee.
                        </p>
                    </div>

                    {/* =================================================
                        Actions
                    ================================================= */}
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-2">

                        <button
                            type="button"
                            onClick={
                                openFilePicker
                            }
                            className="flex items-center gap-2 rounded-lg border border-[#ced0c8] bg-white px-4 py-2.5 text-xs font-semibold text-[#183a4e] transition hover:bg-[#f3f4f0]"
                        >
                            <UploadCloud
                                size={15}
                            />

                            {hasImage
                                ? "Change Image"
                                : "Upload Image"}
                        </button>

                        {hasImage && (
                            <button
                                type="button"
                                onClick={
                                    handleRemove
                                }
                                className="flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-4 py-2.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-100"
                            >
                                <Trash2
                                    size={15}
                                />

                                Remove
                            </button>
                        )}

                    </div>

                    {/* =================================================
                        File Rules
                    ================================================= */}
                    <p className="mt-3 text-center text-[9px] font-medium leading-4 text-[#9ca191]">
                        JPG, JPEG or PNG
                        <br />
                        Maximum file size: 5 MB
                    </p>

                    {/* =================================================
                        Error
                    ================================================= */}
                    {error && (
                        <div className="mt-4 flex max-w-md items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2.5 text-left">
                            <AlertCircle
                                size={15}
                                className="mt-0.5 shrink-0 text-rose-500"
                            />

                            <p className="text-[10px] font-semibold leading-4 text-rose-600">
                                {error}
                            </p>
                        </div>
                    )}

                    <input
                        ref={
                            fileInputRef
                        }
                        type="file"
                        accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                        hidden
                        onChange={
                            handleFileChange
                        }
                    />
                </div>
            </div>
        </div>
    );
}