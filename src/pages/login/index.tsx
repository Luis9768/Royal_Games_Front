import { ToastContainer } from "react-toastify";
import styles from "./login.module.css";

const Login = () => {
  return;
  <>
    <ToastContainer />
    <main>
      <img src="../imgs/negona_robotica.png" alt="mulher robotica login" />
      <div id={styles.campo_login}>
        <form id={styles.formulario}>
          <img src="../imgs/logo_royal.png" alt="logo do royal" />
          <div id={styles.campo_email}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              placeholder="email@exemplo.com"
              required
            />
          </div>
          <div id={styles.campo_senha}>
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              name="senha"
              placeholder="*******"
              required
            />
          </div>
        </form>
      </div>
    </main>
  </>;
};
