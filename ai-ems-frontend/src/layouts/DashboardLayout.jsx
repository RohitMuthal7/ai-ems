import React, {
    useState,
} from "react";

import {
    Outlet,
} from "react-router-dom";

import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import AIAssistantDrawer from "../components/ai/AIAssistantDrawer";

// ===========================================================================
// File: src/layouts/DashboardLayout.jsx
// Admin Portal Application Layout
// ===========================================================================

const DashboardLayout = () => {

    const [
        sidebarOpen,
        setSidebarOpen,
    ] = useState(false);


    const [
        aiOpen,
        setAiOpen,
    ] = useState(false);


    const openAIAssistant = () => {

        setAiOpen(
            true
        );
    };


    const closeAIAssistant = () => {

        setAiOpen(
            false
        );
    };


    return (

        <div className="flex h-screen w-full overflow-hidden bg-[#f3f4f0] font-sans text-[#0c1d27]">

            {/* =============================================================
                Admin Sidebar
            ============================================================= */}

            <Sidebar
                isOpen={
                    sidebarOpen
                }
                onClose={() =>
                    setSidebarOpen(
                        false
                    )
                }
            />


            {/* =============================================================
                Main Application
            ============================================================= */}

            <div className="flex min-w-0 flex-1 flex-col overflow-hidden lg:pl-[264px]">

                {/* =========================================================
                    Top Navigation
                ========================================================= */}

                <TopNavbar
                    onMenuClick={() =>
                        setSidebarOpen(
                            (
                                previous
                            ) =>
                                !previous
                        )
                    }
                    onAIAssistantClick={
                        openAIAssistant
                    }
                />


                {/* =========================================================
                    Main Content Area
                ========================================================= */}

                <main
                    className="
                        custom-scrollbar
                        min-h-0
                        min-w-0
                        flex-1
                        overflow-x-hidden
                        overflow-y-auto
                    "
                >

                    <div className="mx-auto w-full max-w-[1600px] px-4 py-5 sm:px-5 md:px-6 md:py-6 lg:px-8 lg:py-7 xl:px-9">

                        <Outlet
                            context={{
                                openAIAssistant,
                            }}
                        />

                    </div>

                </main>

            </div>


            {/* =============================================================
                AI Assistant
            ============================================================= */}

            <AIAssistantDrawer
                open={
                    aiOpen
                }
                onClose={
                    closeAIAssistant
                }
            />

        </div>

    );
};


export default DashboardLayout;