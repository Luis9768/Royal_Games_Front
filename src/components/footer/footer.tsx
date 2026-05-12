import styles from "@/components/footer/footer.module.css";

const Footer = () => {
  return (
    <>
    <footer id={styles.footer_container}>
      <img src="../imgs/logo_royal.png" alt="imagem logo" id={styles.imagem} />
      <div id={styles.lado_direito}></div>
      <ul className={styles.lista_contato}>
        <li>royalgames@email.com</li>
        <li>(11)99999-9999</li>
        <li>@RoyalGames</li>
      </ul>
      </footer>
    </>
  );
};
export default Footer;
