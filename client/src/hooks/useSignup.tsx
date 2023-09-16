import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
  const { mutateAsync, error, isLoading } = useMutation({
    mutationFn: async ({
      email,
      password,
      confirmPassword,
    }: {
      email: string;
      password: string;
      confirmPassword: string;
    }) => {
      return await axios.post("/auth/register", {
        email,
        password,
        confirmPassword,
      });
    },
  });
  const navigate = useNavigate();

  const signup = async (
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    await mutateAsync({
      email,
      password,
      confirmPassword,
    });

    navigate("/login");
  };

  return { signup, error, isLoading };
};

export default useSignup;
