import { useContext, useState } from "react";
import { LoginContext } from "../../context/loginContext";
import styles from "./userWidget.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const UserWidget = () => {
  const { user } = useContext(LoginContext);
  const [showOptions, setShowOptions] = useState(false);
  const isAdmin = user?.role === "Admin";
  const handleShowOptions = () => {
    setShowOptions(!showOptions);
  };
  const getContent = () => {
    const notLogged = {
      btn1: {
        label: "Login",
        url: "/login",
      },
      btn2: {
        label: "Registrarse",
        url: "/register",
      },
    };
    const logged = {
      btn1: {
        label: "Ver Perfil",
        url: "/profile",
      },
      btn2: {
        label: "Logout",
        url: "/logout",
      },
    };
    return user ? logged : notLogged;
  };
  return (
    <>
      <div onClick={handleShowOptions} className={styles.container}>
        {user ? (
          <img className={styles.image} src={user.avatar} />
        ) : (
          <FontAwesomeIcon className={styles.icon} icon={faUser} />
        )}
      </div>
      {showOptions && (
        <div className={styles.subMenu}>
          <div onClick={handleShowOptions}>
            <Link to={getContent().btn1.url}>
              <p className={styles.opt}>{getContent().btn1.label}</p>
            </Link>
          </div>
          <div onClick={handleShowOptions}>
            <Link to={getContent().btn2.url}>
              <p className={styles.opt}>{getContent().btn2.label}</p>{" "}
            </Link>
          </div>
          {user && isAdmin && (
            <div onClick={handleShowOptions}>
              <Link to={"/productManagerList"}>
                <p className={styles.opt}>Adm catálogo</p>{" "}
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UserWidget;
