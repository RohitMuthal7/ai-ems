import api from "./axios";

/**
 * Get Upcoming Holidays
 */
export const getUpcomingHolidays = async () => {
    const response = await api.get(
        "/holidays/upcoming"
    );

    return response.data;
};

/**
 * Get Holidays By Year
 */
export const getHolidaysByYear = async (year) => {
    const response = await api.get(
        `/holidays/year/${year}`
    );

    return response.data;
};

/**
 * Get All Holidays
 */
export const getAllHolidays = async () => {
    const response = await api.get(
        "/holidays"
    );

    return response.data;
};

/**
 * Get Holiday By ID
 */
export const getHolidayById = async (holidayId) => {
    const response = await api.get(
        `/holidays/${holidayId}`
    );

    return response.data;
};