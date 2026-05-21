import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import { listarPorId } from "@/pages/api/jogoService";
import styles from "@/pages/detalhe-produto/[id]/detalhe-produto.module.css"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Jogo  {
    nome: string;
    descricao: string;
    preco: number;
    imagem: string; 
    classificacao: string; 
    genero: string[]; 
    plataforma: string[]; 
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
        }, 1000);
    }, [id]);





    return(
        <>
            <Header />
            <main>
                <section id={styles.detalhe_container}>
                    <h2 id={styles.titulo_banner}>Detalhes do jogo</h2>
                    <div id={styles.informacoes}>
    <img src={jogo?.imagem} alt={`Imagem do jogo ${jogo?.nome}`} /> 
    <div id={styles.textos_produto}>
        <h2>{jogo?.nome}</h2>
        <p>{jogo?.descricao}</p>
    </div>
</div>
<div id={styles.dados_jogo}>
    <div id={styles.dados_esquerda}>
        <p>Classificação indicativa: {jogo?.classificacao}</p>
        <p>Preço: R${jogo?.preco}</p>
    </div>
    <div id={styles.dados_direita}>
        <p>Plataformas: {jogo?.plataforma?.join(', ')}</p>
        <p>Gêneros: {jogo?.genero?.join(', ')}</p>
    </div>
</div>
                </section>
                <Footer />
            </main>
        </>
    )
}
export default DetalheProduto;