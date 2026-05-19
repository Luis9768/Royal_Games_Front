import styles from "@/components/card-produto/card-produto.module.css";
import { formatarPreco } from "@/utils/formatacao";
import Link from "next/link";

type Jogo = {
  titulo: string;
  descricao: string;
  img: string;
  preco: number;
  jogoID: number;
};

const CardProduto = ({ titulo, descricao, img, preco, jogoID }: Jogo) => {
  return (
    <>
      <article className={styles.card_produto}>
        {/* Correção 1: Envelopado a URL dinâmica dentro de uma tag <img> real */}
        <Link href={`/detalhe-produto/${jogoID}`}>
          <img 
            src={img} 
            alt={titulo} 
            className={styles.imagem_card} 
          />
        </Link>

        <h3 className={styles.titulo}>{titulo}</h3>
        <p className={styles.preco}>{formatarPreco(preco)}</p>

        {/* Correção 2: Adicionado o ID do jogo também na rota do botão Detalhes */}
        <Link href={`/detalhe-produto/${jogoID}`}>
          <button className={styles.detalhes}>Detalhes</button>
        </Link>
      </article>
    </>
  );
};

export default CardProduto;