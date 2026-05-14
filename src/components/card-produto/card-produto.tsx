import styles from "@/components/card-produto/card-produto.module.css";
import Link from "next/link";

const CardProduto = () => {
  return (
    <>
      <article className={styles.card_produto}>
        <Link href={"/detalhe-produto/"}>
          <img src="../imgs/minecraft.png" alt="imagem call of fut" />
        </Link>
        <h3 className={styles.titulo}>Counter Strike</h3>
        <p className={styles.preco}>R$70,00</p>
        <Link href={"/detalhe-produto/"}>
          <button className={styles.detalhes}>Detalhes</button>
        </Link>
      </article>
    </>
  );
};
export default CardProduto;
