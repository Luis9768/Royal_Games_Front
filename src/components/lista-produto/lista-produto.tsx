import styles from "@/components/lista-produto/lista-produto.module.css";
import CardProduto from "../card-produto/card-produto";
import Paginacao from "@/components/paginacao/paginacao";
import { useEffect, useState } from "react";
import { excluirJogo, listarJogo } from "@/pages/api/jogoService";
import { toast } from "react-toastify";
import { notificacao, toastConfirmarExclusao } from "@/utils/toast";
import { verificarAutenticacao } from "@/utils/auth";

interface Jogo {
  jogoID: number;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
  statusJogo: boolean;
}

const ListaProduto = () => {
  const [jogos, setJogos] = useState<Jogo[]>([]);
  const [ordem, setOrdem] = useState("todos");
  const [pesquisa, setPesquisa] = useState("");
  const[estaAutenticado, setEstaAutenticado] = useState(false);

  async function listar() {
    try {
      const lista = await listarJogo();
      setJogos(lista);
      console.log(lista);
    } catch (error: any) {
      console.log(error.message);
    }
  }


function confirmarExclusao(jogoId: number){
  toastConfirmarExclusao(async() => {
    try{
      await excluirJogo(jogoId);

      setJogos((listaAtual) => 
      listaAtual.map((jogo) =>
      jogo.jogoID === jogoId
    ? {...jogo, statusJogo: false}
  :jogo
)
)
notificacao("Produto inativado chefe!");
listar();
    } catch (error: any) {
                error(error.message)
            }
  })
}

   useEffect(() => {
        setEstaAutenticado(verificarAutenticacao());
        listar();
    }, [])

    const jogosFiltrados = jogos.filter((jogo) =>
    jogo.nome.toLowerCase().includes(pesquisa.toLowerCase())).sort((a,b) =>{
       if(ordem === "menor_valor"){
            //se o preco de a é MENOR que o preço e B
            return a.preco - b.preco
        }else if(ordem === "maior_valor"){
            //se o preco de B é MENOR que o preço e A
            return b.preco - a.preco
        }
        return a.jogoID - b.jogoID;
    });



  return (
    <>
      <h2>Catálogo de jogos</h2>

      <div id={styles.filtros}>
        <div className={styles.campoPesquisa}>
          <label htmlFor="pesquisa"></label>
          <input
            type="text"
            name="pesquisa"
            id=""
            placeholder="Pesquise..."
            value={pesquisa}
                    onChange={(e) => {setPesquisa(e.target.value)}}
                    />
          
        </div>

        <select className={styles.botao} defaultValue="Todos" value={ordem} onChange={(e) => setOrdem(e.target.value)} >
          <option value="todos">Todos os preços</option>
          <option value="menor_valor">Menor valor</option>
          <option value="maior_valor">Maior valor</option>
        </select>

        <select className={styles.botao} value={ordem} onChange={(e) => setOrdem(e.target.value)}  defaultValue="Categorias">
          <option value="todas">Todas as categorias</option>
          <option value="acao">Ação</option>
          <option value="corrida">Corrida</option>
          <option value="esports">E-Sports</option>
        </select>
      </div>

      <div className={styles.gridProdutos}>
        {jogosFiltrados.length > 0 ? jogosFiltrados.map((item) => (
            <CardProduto 
            key={item.jogoID}
            jogoID = {item.jogoID}
            titulo = {item.nome}
            descricao = {item.descricao}
            preco = {item.preco}
            img = {item.imagem}
            />
        )) : (
                    <p>Carregando produto...</p>
                )}
       
      </div>

      <Paginacao />
    </>
  );
};

export default ListaProduto;
