import { useContext } from "react";

import AuthContext from "../contexts/auth/AuthContext";

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used inside an AuthState");
  }

  return context;
};

export default useAuthContext;
