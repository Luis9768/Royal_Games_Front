import styles from "@/components/lista-produto/lista-produto.module.css";
import CardProduto from "../card-produto/card-produto";
import Paginacao from "@/components/paginacao/paginacao";
import { useEffect, useState } from "react";
// Importe a função que busca os gêneros do back-end
import { excluirJogo, listarJogo, listarGeneros } from "@/pages/api/jogoService"; 
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
  genero: string[]; // <-- Trocado de 'categorias' para 'generos'
}

// Interface de como o gênero vem do seu banco
interface Genero {
  id: number;
  nome: string; 
}

const ListaProduto = () => {
  const [jogos, setJogos] = useState<Jogo[]>([]);
  const [listaGeneros, setListaGeneros] = useState<Genero[]>([]); 
  
  const [ordem, setOrdem] = useState("todos");
  const [pesquisa, setPesquisa] = useState("");
  const [estaAutenticado, setEstaAutenticado] = useState(false);
  
  const [genero, setGenero] = useState("todos"); // <-- Trocado
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 6;

  async function listar() {
    try {
      const lista = await listarJogo();
      setJogos(lista);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function buscarGeneros() {
    try {
      const generosDoBanco = await listarGeneros();
      setListaGeneros(generosDoBanco);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  function confirmarExclusao(jogoId: number) {
    toastConfirmarExclusao(async () => {
      try {
        await excluirJogo(jogoId);
        setJogos((listaAtual) =>
          listaAtual.map((jogo) =>
            jogo.jogoID === jogoId ? { ...jogo, statusJogo: false } : jogo,
          ),
        );
        notificacao("Produto inativado chefe!");
        listar();
      } catch (error: any) {
        console.log(error.message);
      }
    });
  }

  useEffect(() => {
    setEstaAutenticado(verificarAutenticacao());
    listar();
    buscarGeneros();
  }, []);

  useEffect(() => {
    setPaginaAtual(1);
  }, [pesquisa, ordem, genero]); 

  let jogosProcessados = [...jogos];

  if (pesquisa !== "") {
    jogosProcessados = jogosProcessados.filter((jogo) =>
      jogo.nome.toLowerCase().includes(pesquisa.toLowerCase())
    );
  }

  if (genero !== "todos") {
    jogosProcessados = jogosProcessados.filter((jogo) =>
      jogo.genero?.some((g) => g.toLowerCase() === genero.toLowerCase())
    );
  }

  jogosProcessados.sort((a, b) => {
    if (ordem === "menor_valor") {
      return a.preco - b.preco;
    } else if (ordem === "maior_valor") {
      return b.preco - a.preco;
    }
    return a.jogoID - b.jogoID;
  });

  const totalPaginas = Math.ceil(jogosProcessados.length / itensPorPagina);
  const indexUltimoItem = paginaAtual * itensPorPagina;
  const indexPrimeiroItem = indexUltimoItem - itensPorPagina;
  
  const jogosPaginados = jogosProcessados.slice(
    indexPrimeiroItem,
    indexUltimoItem,
  );

  const lidarComMudancaPagina = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPaginaAtual(value);
  };

  return (
    <>
      <h2>Catálogo de jogos</h2>

      <div id={styles.filtros}>
        <div className={styles.campoPesquisa}>
          <input
            type="text"
            name="pesquisa"
            placeholder="Pesquise..."
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
          />
        </div>

        <select
          className={styles.botao}
          value={ordem}
          onChange={(e) => setOrdem(e.target.value)}
        >
          <option value="todos">Todos os preços</option>
          <option value="menor_valor">Menor valor</option>
          <option value="maior_valor">Maior valor</option>
        </select>

        {/* Select de Gêneros */}
        <select
          className={styles.botao}
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
        >
          <option value="todos">Todos os gêneros</option>
          
          {listaGeneros.map((gen) => (
            <option key={gen.id} value={gen.nome}>
              {gen.nome}
            </option>
          ))}

        </select>
      </div>

      <div className={styles.gridProdutos}>
        {jogosPaginados.length > 0 ? (
          jogosPaginados.map((item) => (
            <CardProduto
              key={item.jogoID}
              jogoID={item.jogoID}
              titulo={item.nome}
              descricao={item.descricao}
              preco={item.preco}
              img={item.imagem}
            />
          ))
        ) : (
          <p>Nenhum produto encontrado...</p>
        )}
      </div>

      {totalPaginas > 1 && (
        <Paginacao
          count={totalPaginas}
          page={paginaAtual}
          onChange={lidarComMudancaPagina}
        />
      )}
    </>
  );
};

export default ListaProduto;