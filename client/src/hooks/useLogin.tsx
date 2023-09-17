import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import useAuthContext from "../hooks/useAuthContext";

const useLogin = () => {
  const { mutateAsync, error, isLoading } = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const { data } = await axios.post(
        "/auth/login",
        { email, password },
        {
          withCredentials: true,
        }
      );

      axios.defaults.headers.common["Authorization"] = `Bearer ${data["token"]}`;

      return data;
    },
  });
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    const response = await mutateAsync({
      email,
      password,
    });

    dispatch({ type: "LOGIN", payload: response.token });
    navigate("/");
  };

  return { login, error, isLoading };
};

export default useLogin;
