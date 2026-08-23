import api from "../api/axios";

const authService = {

  // ============================================================
  // LOGIN
  // ============================================================

  async login(loginRequest) {

    const response = await api.post(
      "/auth/login",
      loginRequest
    );

    return response.data;
  },


  // ============================================================
  // REGISTER
  // ============================================================

  register(registerRequest) {

    return api.post(
      "/auth/register",
      registerRequest
    );
  },


  // ============================================================
  // VERIFY OTP
  // ============================================================

  verifyOtp(verificationRequest) {

    return api.post(
      "/auth/verify",
      verificationRequest
    );
  },


  // ============================================================
  // FORGOT PASSWORD
  // ============================================================

  forgotPassword(email) {

    return api.post(
      "/auth/forgot-password",
      { email }
    );
  },


  // ============================================================
  // RESET PASSWORD
  // ============================================================

  resetPassword(resetRequest) {

    return api.post(
      "/auth/reset-password",
      resetRequest
    );
  }

};

export default authService;