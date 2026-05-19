import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import { listarPorId } from "@/pages/api/jogoService";
import styles from "@/pages/detalhe-produto/[id]/detalhe-produto.module.css"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Jogo  {
    nome: string,
    descricao: string,
    preco: number,
    imagemUrl: string,
    classificacao: number,
    generos: string[],
    plataformas: string[]
}


const DetalheProduto = () => {

const [jogo, setJogo] = useState<Jogo>();
const params = useParams();
const id = params?.id;

async function listarJogo() {
    try{
        const response = await listarPorId(Number(id));
            console.log(response)
            setJogo(response);
    }catch (error: any) {
            console.log(error.message)
        }
}
  useEffect(() => {
        if (!id) return;

        setTimeout(() => {
            listarJogo();
        }, 1000); // 1 segundo
    }, [id]);





    return(
        <>
            <Header />
            <main>
                <section id={styles.detalhe_container}>
                    <h2 id={styles.titulo_banner}>Detalhes do jogo</h2>
                    <div id={styles.informacoes}>
                        <img src="../imgs/lol.png" alt="imagem jogo lol" />
                        <div id={styles.textos_produto}>
                            <h2>League of Legends</h2>
                            <p>League of Legends (LoL) é um jogo eletrônico do gênero MOBA (Multiplayer Online Battle Arena) onde duas equipes de cinco jogadores competem entre si com o objetivo de destruir a base adversária. Cada jogador controla um campeão com habilidades únicas, exigindo estratégia, trabalho em equipe e tomada de decisões rápidas durante as partidas.O jogo possui diversos modos, mapas e estilos de jogo, além de oferecer atualizações frequentes com novos personagens, eventos e ajustes de balanceamento. League of Legends é conhecido pelo seu cenário competitivo mundial, reunindo milhões de jogadores e campeonatos profissionais ao redor do mundo.</p>
                        </div>
                    </div>
                    <div id={styles.dados_jogo}>
                        <div id={styles.dados_esquerda}>
                            <p>Classificação indicativa: 18 anos</p>
                            <p>Preco: R$ 100,00</p>
                            <p>Plataformas</p>
                        </div>
                        <div id={styles.dados_direita}>
                            <p>Categorias</p>
                            <p>Gêneros</p>
                        </div>
                    </div>
                </section>
                <Footer />
            </main>
        </>
    )
}
export default DetalheProduto;