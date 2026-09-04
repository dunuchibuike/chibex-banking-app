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

export const BaseURL = import.meta.env.VITE_BASE_URL;
export const INITIAL_ACCOUNT_BALANCE = 500000;

export const getUserProfile = (profileName) => {
  if (!profileName) return ""; 
  const words = profileName.split(" ");
  return words.map((word) => word[0]).join("").toUpperCase();
};