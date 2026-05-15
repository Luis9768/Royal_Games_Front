import styles from "@/components/lista-produto/lista-produto.module.css";
import CardProduto from "../card-produto/card-produto";
import Paginacao from '@/components/paginacao/paginacao'
const ListaProduto = () => {
  return (
    <>
      <h2>Catálogo de jogos</h2>
      
      <div id={styles.filtros}>
        <div className={styles.campoPesquisa}>
          <label htmlFor="pesquisa"></label>
          <input 
            type="text" 
            name="pesquisa" 
            id="pesquisa" 
            placeholder="Pesquise..." 
          />
        </div>
        
        <select className={styles.botao} name="ordenacao" defaultValue="todos">
          <option value="todos">Todos os preços</option>
          <option value="menor_valor">Menor valor</option>
          <option value="maior_valor">Maior valor</option>
        </select>

        <select className={styles.botao} name="categoria" defaultValue="todas">
          <option value="todas">Todas as categorias</option>
          <option value="acao">Ação</option>
          <option value="corrida">Corrida</option>
          <option value="esports">E-Sports</option>
        </select>
      </div>

      <div className={styles.gridProdutos}>
        <CardProduto />
        <CardProduto />
        <CardProduto />
        <CardProduto />
        <CardProduto />
        <CardProduto />
      </div>

    <Paginacao />

    </>
  );
};

export default ListaProduto;