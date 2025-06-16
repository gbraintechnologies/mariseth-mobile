export const endpoints = {
  // AUTH ENDPOINTS
  signIn: "auth/login",
  signup: "auth/register",
  verify: "auth/verify-phone",
  forgotPin: "auth/forgot-password",
  resendOtp: "auth/resend-verification-code",
  pinSetup: "auth/setup-pin",
  updateAccount: "auth/update-account",
  updatePin: "auth/update-pin",
  logout: "auth/logout",
  resetPin: "auth/reset-password",

  // CREDITS ENDPOINTS
  activeCredit: "credit/active-credit",
  creditHistory: "credit/credit-history",
  paybackHistory: "credit/payback-history",

  // FARMS ENDPOINTS
  myFarm: "farm/my-farm",

  // LEAD FARMER FARMS ENDPOINTS
  leadFarmersFarms: "lead-farmer/farms",
  myFarmers: "lead-farmer/smallholders",
};
