import React, {useState, createContext, useContext} from "react";
import {AuthContextType} from "./auth-types";

export const authDefaultValue: AuthContextType = {
  isAuthenticated: "",
  setAuthenticated: (isAuthenticated: string) => {
    throw new Error("Error on Auth Context, you must use it inside an AuthProvider" +
      isAuthenticated);
  },
};

const AuthContext = createContext(authDefaultValue);

export function useAuthContext(): AuthContextType {
  const context = useContext(AuthContext);
  return context;
}

export function AuthProvider(props: {children: JSX.Element[] | JSX.Element}): JSX.Element {
  const [isAuthenticated, setAuthenticated] = useState(authDefaultValue.isAuthenticated);
  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      setAuthenticated,
    }}>
      {props.children}
    </AuthContext.Provider>
  );
}

const exportAuth = {
  useAuthContext,
  AuthProvider,
};
export default exportAuth;