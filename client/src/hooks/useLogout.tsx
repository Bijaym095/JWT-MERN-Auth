import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import useAuthContext from "../hooks/useAuthContext";

const useLogout = () => {
  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      return await axios.post("/auth/logout");
    },
  });
  const { dispatch } = useAuthContext();

  const logout = async () => {
    try {
      await mutateAsync();
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("Error while logging out", error.response?.data.message);
      }
    }
  };

  return { logout };
};

export default useLogout;
