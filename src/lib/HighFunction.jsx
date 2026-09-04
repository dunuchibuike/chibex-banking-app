export const ValidateInputs = ( userData , error, setErrorMsg) => {
    if (
      !error.err &&
      userData.fullName &&
      userData.emailAddress &&
      userData.password &&
      userData.confirmPassword
    ) {
       return true; 
    } else{
        setErrorMsg({
            err : true,
            name : "general",
            msg : " Please fill in all fields correctly ",
        });
        return false;
    }
};

// Vercel injects VITE_* values only while building. Keep the production API as
// a fallback so authentication works before that dashboard variable is added.
const DEFAULT_BASE_URL = "https://transfer-of-money-between-accounts-1.onrender.com/api/v1/user";
export const BaseURL = (import.meta.env.VITE_BASE_URL || DEFAULT_BASE_URL).replace(/\/$/, "");
export const INITIAL_ACCOUNT_BALANCE = 500000;

export const getUserProfile = (profileName) => {
  if (!profileName) return ""; 
  const words = profileName.split(" ");
  return words.map((word) => word[0]).join("").toUpperCase();
};
