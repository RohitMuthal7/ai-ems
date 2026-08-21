import api from "./axios";

/**
 * Get all employees
 */
export const getEmployees = async () => {
    const response = await api.get("/admin/employees");
    return response.data;
};

/**
 * Get employee by ID
 */
export const getEmployeeById = async (id) => {
    const response = await api.get(`/admin/employees/${id}`);
    return response.data;
};

/**
 * Create new employee
 */
export const createEmployee = async (employeeData) => {
    const response = await api.post("/admin/employees", employeeData);
    return response.data;
};

/**
 * Update employee
 */
export const updateEmployee = async (id, employeeData) => {
    const response = await api.put(`/admin/employees/${id}`, employeeData);
    return response.data;
};

/**
 * Delete employee
 */
export const deleteEmployee = async (id) => {
    const response = await api.delete(`/admin/employees/${id}`);
    return response.data;
};