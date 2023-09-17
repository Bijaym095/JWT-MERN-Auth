import { useState } from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";

import Container from "../components/Container";
import FormGroup from "../components/FormGroup";
import useSignup from "../hooks/useSignup";

const Signup = () => {
  const [signupValue, setSignupValue] = useState<SignupValue>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { signup, error, isLoading } = useSignup();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSignupValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password, confirmPassword } = signupValue;

    signup(email, password, confirmPassword);

    setSignupValue({
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <section className="h-screen">
      <Container className="grid place-items-center h-full">
        <div className="bg-white p-8">
          <h2 className="mb-4 font-bold text-2xl">Create An Account</h2>

          <form className="space-y-6 mb-8" onSubmit={handleSubmit}>
            <FormGroup>
              <label htmlFor="email">Email</label>
              <input
                className="form-input"
                onChange={handleChange}
                type="email"
                name="email"
                id="email"
                value={signupValue.email}
                placeholder="Enter an email address"
                autoComplete="true"
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
                placeholder="Enter a password"
                value={signupValue.password}
                autoComplete="true"
                required
              />
            </FormGroup>

            <FormGroup>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                className="form-input"
                onChange={handleChange}
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm a password"
                value={signupValue.confirmPassword}
                autoComplete="true"
                required
              />
            </FormGroup>

            <button className="block w-full py-3 bg-accent hover:bg-opacity-95 text-white font-medium uppercase tracking-[0.1rem] text-sm">
              {isLoading ? "Loading..." : "Signup"}
            </button>
          </form>

          {error instanceof AxiosError && (
            <p className="text-center text-red-500 mb-4">
              {error.response?.data.message}
            </p>
          )}

          <p className="text-center">
            Already have an account ?{" "}
            <Link className="text-blue-500 underline" to="/login">
              Login
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
};

export default Signup;

type SignupValue = {
  email: string;
  password: string;
  confirmPassword: string;
};
