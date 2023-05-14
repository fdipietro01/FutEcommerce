import styles from "./navbar.module.scss";
import { CartWidget } from "../CartWidget/CartWidget";
import logo from "../../assets/images/logo.jpg";
import { Link } from "react-router-dom";
import UserWidget from "../UserWidget/UserWidget";
import ChatWidget from "../ChatWidget/ChatWidget";

const Navbar = () => {
  const categories = [
    "Arqueros",
    "Defensores",
    "Centrocampistas",
    "Delanteros",
  ];
  return (
    <div className={styles.container}>
      <Link to={"/"}>
        {" "}
        <img className={styles.logo} src={logo} />{" "}
      </Link>
      <div className={styles.categories}>
        {categories.map((categorie) => (
          <Link
            className={styles.link}
            key={categorie}
            to={`category/${categorie}`}
          >
            {categorie}
          </Link>
        ))}
      </div>

      <div className={styles.cart}>
        <Link to="/chat">
          <ChatWidget />
        </Link>
        <Link to="/cart">
          <CartWidget />
        </Link>
        <UserWidget />
      </div>
    </div>
  );
};

export default Navbar;
