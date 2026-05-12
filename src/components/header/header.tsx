import Link from "next/link";
import styles from "./header.module.css";

const Header = () => {
  return (
    <>
      <header id={styles.header_container}>
          <img src="../imgs/logo_royal.png" alt="imagem logo" id={styles.imagem}/>
        <div id={styles.direita}>
          <Link href="/catalogo">
            <button id={styles.botao_catalogo} >Catalogo</button>
          </Link>
          <Link href="/login">
            <button id={styles.botao_login}>Login</button>
          </Link>
        </div>
      </header>
    </>
  );
};
export default Header;
