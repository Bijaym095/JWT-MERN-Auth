import { useState } from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";

import Container from "../components/Container";
import FormGroup from "../components/FormGroup";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const [loginValue, setLoginValue] = useState<LoginValue>({
    email: "",
    password: "",
  });
  const { login, isLoading, error } = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = loginValue;

    login(email, password);

    setLoginValue({
      email: "",
      password: "",
    });
  };

  return (
    <section className=" h-screen">
      <Container className="p-4 flex justify-center items-center h-full">
        <div className=" p-8 bg-white">
          <h2 className="font-bold capitalize text-2xl mb-6 ">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-6 mb-8">
            <FormGroup>
              <label htmlFor="email">Email</label>
              <input
                className="form-input"
                onChange={handleChange}
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email address"
                value={loginValue.email}
                required
              />
            </FormGroup>

            <FormGroup>
              <label htmlFor="password">Password</label>
              <input
                className="form-input"
                onChange={handleChange}
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                value={loginValue.password}
                required
                autoComplete="true"
              />
            </FormGroup>

            <button className="block w-full py-3 bg-accent hover:bg-opacity-95 text-white font-medium uppercase tracking-[0.1rem] text-sm">
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>

          {error instanceof AxiosError && (
            <p className="text-center text-red-500 mb-4">
              {error.response?.data.message}
            </p>
          )}

          <p>
            Don't have an account ?{" "}
            <Link className="underline text-blue-500" to="/signup">
              Signup
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
};

export default Login;

type LoginValue = {
  email: string;
  password: string;
};
