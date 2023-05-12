import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/loginContext";
import Loading from "../Loading/loading";

const LogOutContainer = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { logOutSession } = useContext(LoginContext);

  const callLogOut = async () => await logOutSession();

  useEffect(() => {
    callLogOut();
    navigate("/");
  }, []);
  return loading && <Loading />;
};

export default LogOutContainer;
