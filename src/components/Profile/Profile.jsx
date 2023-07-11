import { Link } from "react-router-dom";
import styles from "./profile.module.scss";
const ProfileCard = ({ data }) => {
  const {
    avatar,
    nombre,
    apellido,
    edad,
    email,
    role,
    fecha,
    _id,
    ultimaConexion,
  } = data;
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>Tu perfil</div>
        <div className={styles.cardContainer}>
          <span className={styles.pro}>{role}</span>
          <img className={styles.round} src={avatar} alt="user" />
          <h3>{nombre} </h3>
          <h6></h6>
          <p>
            Usuario creado el <br /> {fecha}
          </p>

          <div className={styles.skills}>
            <h6>Personal</h6>
            <ul>
              <li>Nombre: {nombre}</li>
              <li>Apellido: {apellido}</li>
              <li>Correo: {email} </li>
              <li>Edad: {edad} años </li>
              <li>
                Última Conexion: {new Date(ultimaConexion).toLocaleString()}{" "}
              </li>
              <li>Id: {_id}</li>
            </ul>
          </div>
        </div>
        <div className={styles.btns}>
          <Link to={"/"}>
            <button className={"btn btn-primary"} type="submit">
              Ir a la tienda
            </button>
          </Link>
          <Link to={"/logOut"}>
            <button className={"btn btn-primary"}>Cerrar sesión</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
