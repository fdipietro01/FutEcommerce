import { useEffect, useState } from "react";
import { createContext } from "react";
import Cookies from "js-cookie";
import { getCurrentUser, logOut } from "../services/accountServices";
import { updateUser } from "../services/userServices";

export const LoginContext = createContext();

const LoginContextProvider = ({ children }) => {
  const [user, setUser] = useState();

  const login = async (token) => {
    Cookies.set("JWT", token);
    await getUser();
  };

  const logOutSession = async () => {
    const response = await logOut();
    if (response?.status === 200) {
      Cookies.remove("JWT");
      setUser();
    }
  };

  const updateCartUser = async (id, cid) => {
    const data = await updateUser(id, cid);
    setUser(data.user);
  };

  const getUser = async () => {
    if (Cookies.get("JWT")) {
      const { data } = await getCurrentUser();
      if (!data) {
        setUser();
      }
      setUser(data);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  const handleUser = (user) => {
    setUser(user);
  };
  return (
    <LoginContext.Provider
      value={{
        login,
        handleUser,
        user,
        logOutSession,
        updateCartUser,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
