import React, {
    useState,
} from "react";

import {
    Outlet,
} from "react-router-dom";

import EmployeeSidebar from "./EmployeeSidebar";
import EmployeeTopNavbar from "./EmployeeTopNavbar";

import EmployeeAIAssistantDrawer
    from "../components/ai/EmployeeAIAssistantDrawer";

// ===========================================================================
// File: src/layouts/EmployeeLayout.jsx
// Employee Portal Layout
// ===========================================================================

const EmployeeLayout = () => {

    // =======================================================================
    // Sidebar
    // =======================================================================

    const [
        sidebarOpen,
        setSidebarOpen,
    ] = useState(false);


    // =======================================================================
    // Employee AI
    // =======================================================================

    const [
        aiOpen,
        setAiOpen,
    ] = useState(false);


    // =======================================================================
    // Open AI Assistant
    // =======================================================================

    const openAIAssistant = () => {

        setAiOpen(true);

    };


    // =======================================================================
    // Close AI Assistant
    // =======================================================================

    const closeAIAssistant = () => {

        setAiOpen(false);

    };


    // =======================================================================
    // Render
    // =======================================================================

    return (

        <div className="flex h-screen overflow-hidden bg-[#f3f4f0] font-sans text-[#0c1d27]">

            {/* =============================================================
                Employee Sidebar
            ============================================================= */}

            <EmployeeSidebar
                isOpen={
                    sidebarOpen
                }
                onClose={() =>
                    setSidebarOpen(false)
                }
                onAIAssistantClick={
                    openAIAssistant
                }
            />


            {/* =============================================================
                Main Application Area
            ============================================================= */}

            <div className="flex h-full min-w-0 flex-1 flex-col overflow-hidden lg:ml-[270px]">

                {/* =========================================================
                    Employee Top Navbar
                ========================================================= */}

                <EmployeeTopNavbar
                    onMenuClick={() =>
                        setSidebarOpen(
                            (previous) =>
                                !previous
                        )
                    }
                    onAIAssistantClick={
                        openAIAssistant
                    }
                />


                {/* =========================================================
                    Page Content
                ========================================================= */}

                <main className="custom-scrollbar min-h-0 flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 lg:p-8">

                    <Outlet
                        context={{
                            openAIAssistant,
                        }}
                    />

                </main>

            </div>


            {/* =============================================================
                Employee AI Assistant
                IMPORTANT:
                This is NOT the Admin AIAssistantDrawer.
            ============================================================= */}

            <EmployeeAIAssistantDrawer
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

export default EmployeeLayout;