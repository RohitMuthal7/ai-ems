import api from "./axios";

/**
 * Get All Attendance
 */
export const getAllAttendance = async () => {

    const response = await api.get("/attendance");

    return response.data;

};

/**
 * Get Attendance By ID
 */
export const getAttendanceById = async (id) => {

    const response = await api.get(`/attendance/${id}`);

    return response.data;

};

/**
 * Get Employee Attendance
 */
export const getEmployeeAttendance = async (employeeId) => {

    const response = await api.get(
        `/attendance/employee/${employeeId}`
    );

    return response.data;

};

/**
 * Get Attendance By Date
 */
export const getAttendanceByDate = async (date) => {

    const response = await api.get(
        `/attendance/date?date=${date}`
    );

    return response.data;

};

/**
 * Check In Employee
 */
export const checkInEmployee = async (attendanceData) => {

    const response = await api.post(
        "/attendance/check-in",
        attendanceData
    );

    return response.data;

};

/**
 * Check Out Employee
 */
export const checkOutEmployee = async (employeeId) => {

    const response = await api.put(
        `/attendance/check-out/${employeeId}`
    );

    return response.data;

};

/**
 * Delete Attendance
 */
export const deleteAttendance = async (id) => {

    const response = await api.delete(
        `/attendance/${id}`
    );

    return response.data;

};

/**
 * Update Attendance
 */
export const updateAttendance = async (

    id,

    attendanceData,

) => {

    const response = await api.put(

        `/attendance/${id}`,

        attendanceData

    );

    return response.data;

};