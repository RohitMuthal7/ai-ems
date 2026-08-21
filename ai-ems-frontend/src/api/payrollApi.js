import api from "./axios";

export const generatePayroll = async (data) => {

    const response = await api.post(
        "/payroll/generate",
        data
    );

    return response.data;

};

export const getAllPayrolls = async () => {

    const response = await api.get(
        "/payroll"
    );

    return response.data;

};

export const getPayrollById = async (id) => {

    const response = await api.get(
        `/payroll/${id}`
    );

    return response.data;

};

export const getPayrollByEmployee = async (employeeId) => {

    const response = await api.get(
        `/payroll/employee/${employeeId}`
    );

    return response.data;

};