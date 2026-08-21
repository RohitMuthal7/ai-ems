import api from "./axios";

/**
 * Get All Departments
 */
export const getAllDepartments = async () => {

    const response = await api.get("/admin/departments");

    return response.data;

};

/**
 * Get Department By Id
 */
export const getDepartmentById = async (id) => {

    const response = await api.get(`/admin/departments/${id}`);

    return response.data;

};

/**
 * Create Department
 */
export const createDepartment = async (departmentData) => {

    const response = await api.post(
        "/admin/departments",
        departmentData
    );

    return response.data;

};

/**
 * Update Department
 */
export const updateDepartment = async (
    id,
    departmentData
) => {

    const response = await api.put(
        `/admin/departments/${id}`,
        departmentData
    );

    return response.data;

};

/**
 * Change Department Status
 */
export const changeDepartmentStatus = async (id) => {

    const response = await api.patch(
        `/admin/departments/${id}/status`
    );

    return response.data;

};

/**
 * Delete Department
 */
export const deleteDepartment = async (id) => {

    const response = await api.delete(
        `/admin/departments/${id}`
    );

    return response.data;

};