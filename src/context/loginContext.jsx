import { useEffect, useState } from "react";
import { createContext } from "react";
import Cookies from "js-cookie";
import { getCurrentUser, logOut } from "../services/accountServices";
import { updateUser } from "../services/userServices";

export const LoginContext = createContext();

const LoginContextProvider = ({ children }) => {
  const [user, setUser] = useState();

  const getUser = async () => {
    if (Cookies.get("JWT")) {
      const { data } = await getCurrentUser();
      if (!data) {
        setUser();
        return;
      }
      setUser(data);
    }
  };

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

  useEffect(() => {
    getUser();
  }, []);

  return (
    <LoginContext.Provider
      value={{
        login,
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
