import api from "../api/axios";

const authService = {

 async login(loginRequest) {
     const response = await api.post("/auth/login", loginRequest);
     return response.data;
 },

  register(registerRequest) {
    return api.post("/auth/register", registerRequest);
  },

  verifyOtp(verificationRequest) {
    return api.post("/auth/verify", verificationRequest);
  },

  forgotPassword(email) {
    return api.post("/auth/forgot-password", { email });
  },

  resetPassword(resetRequest) {
    return api.post("/auth/reset-password", resetRequest);
  }

};

export default authService;