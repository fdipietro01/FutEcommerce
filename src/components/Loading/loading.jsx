import styles from "./loading.module.scss";

const Loading = ({ container = true }) => {
  return (
    <>
      <div className={container ? styles.container : styles.noContainer}>
        <span className={styles.loader}></span>
      </div>
    </>
  );
};

export default Loading;
