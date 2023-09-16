import { createContext } from "react";

import { AuthAction } from "../../contexts/auth/AuthState";

const AuthContext = createContext<User | undefined>(undefined);

export type User = {
  currentUser: string;
  dispatch: React.Dispatch<AuthAction>;
};

export default AuthContext;
