import CardProduto from "@/components/card-produto/card-produto";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import styles from "@/pages/home/home.module.css";

const Home = () => {
  return (
    <>
      <Header />
      <main>
        <section className={styles.banner}>
          <div className={`${styles.container_banner} layout_guide`}>
            <div className={styles.textos_banner}>
              <h1 className={styles.titulo_banner}>Conheça nossos jogos!</h1>
              <h2 className={styles.subtitulo_banner}>
                Navegue por títulos de todas as gerações, descubra plataformas,
                gêneros e detalhes completos antes de escolher sua próxima
                aventura. Seu próximo jogo favorito começa aqui.
              </h2>
            </div>
            <img
              src="../imgs/banner.png"
              alt="Foto futurista de uma mulher no estilo cyberpunk"
            />
          </div>
        </section>
        <section id={styles.catalogo}>
          <h2>Catálogo de jogos</h2>
          <div id={styles.filtros}>
            <div id={styles.pesquisar}>
              <label htmlFor="pesquisa"/>
              <input
                type="text"
                name="pesquisa"
                id=""
                placeholder="Pesquise..."
              />
            </div>
            <div id={styles.precos}>
              <button id={styles.dropbtn}>Todos</button>
             
            </div>
            <div id={styles.categoria}>
              <button id={styles.dropbtn}>Categoria</button>
            </div>
          </div>
        </section>
        <section id={styles.card_produto}>
          <CardProduto />
          <CardProduto />
          <CardProduto />
          <CardProduto />
        </section>
      </main>
      <Footer />
    </>
  );
};
export default Home;
