import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";

import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
    <StrictMode>

        <App />

        <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={10}
            toastOptions={{
                duration: 3000,
                style: {
                    background: "#ffffff",
                    color: "#1e293b",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    fontSize: "14px",
                    fontWeight: "500",
                },
                success: {
                    iconTheme: {
                        primary: "#16a34a",
                        secondary: "#ffffff",
                    },
                },
                error: {
                    iconTheme: {
                        primary: "#dc2626",
                        secondary: "#ffffff",
                    },
                },
            }}
        />

    </StrictMode>
);