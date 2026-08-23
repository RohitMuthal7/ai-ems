import api from "../api/axios";

const authService = {

  async login(loginRequest) {
    const response = await api.post("/api/auth/login", loginRequest);
    return response.data;
  },

  register(registerRequest) {
    return api.post("/api/auth/register", registerRequest);
  },

  verifyOtp(verificationRequest) {
    return api.post("/api/auth/verify", verificationRequest);
  },

  forgotPassword(email) {
    return api.post("/api/auth/forgot-password", { email });
  },

  resetPassword(resetRequest) {
    return api.post("/api/auth/reset-password", resetRequest);
  }

};

export default authService;