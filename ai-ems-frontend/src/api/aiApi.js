import api from "./axios";

export const askAI = async (prompt, messages = []) => {

    const response = await api.post(
        "/ai/chat",
        {
            prompt,
            messages,
        }
    );

    return response.data;
};