import { useReducer } from "react";

import AuthContext from "../../contexts/auth/AuthContext";

const authReducer = (state: InitialAuthState, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN":
      sessionStorage.setItem("token", action.payload);
      return {
        currentUser: action.payload,
      };

    case "LOGOUT":
      sessionStorage.removeItem("token");
      return {
        currentUser: "",
      };

    default:
      return state;
  }
};

const initialState: InitialAuthState = {
  currentUser: sessionStorage.getItem("token") ?? "",
};

const AuthState = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;

export type InitialAuthState = {
  currentUser: string;
};

export type AuthAction =
  | { type: "LOGIN"; payload: string }
  | { type: "LOGOUT" };
