import api from "./axios";

/**
 * Apply Leave
 */
export const applyLeave = async (leaveData) => {

    const response = await api.post(
        "/leaves",
        leaveData
    );

    return response.data;

};

/**
 * Get All Leaves
 */
export const getAllLeaves = async () => {

    const response = await api.get(
        "/leaves"
    );

    return response.data;

};

/**
 * Get Leave By Id
 */
export const getLeaveById = async (id) => {

    const response = await api.get(
        `/leaves/${id}`
    );

    return response.data;

};

/**
 * Get Employee Leaves
 */
export const getEmployeeLeaves = async (employeeId) => {

    const response = await api.get(
        `/leaves/employee/${employeeId}`
    );

    return response.data;

};

/**
 * Get Leaves By Status
 */
export const getLeavesByStatus = async (status) => {

    const response = await api.get(
        `/leaves/status`,
        {
            params: {
                status,
            },
        }
    );

    return response.data;

};

/**
 * Approve Leave
 */
export const approveLeave = async (

    leaveId,

    adminRemarks,

) => {

    const response = await api.put(

        `/leaves/${leaveId}/approve`,

        {
            adminRemarks,
        }

    );

    return response.data;

};

/**
 * Reject Leave
 */
export const rejectLeave = async (

    leaveId,

    adminRemarks,

) => {

    const response = await api.put(

        `/leaves/${leaveId}/reject`,

        {
            adminRemarks,
        }

    );

    return response.data;

};

/**
 * Cancel Leave
 */
export const cancelLeave = async (leaveId) => {

    const response = await api.put(

        `/leaves/${leaveId}/cancel`

    );

    return response.data;

};

