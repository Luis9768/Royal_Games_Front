import { api } from "./api";

type JogoFormulario = {
  nome: string;
  descricao: string;
  imagem: File | null;
  preco: string;
  statusJogo: boolean;
  plataformaIds: number[];
  generoIds: number[];
  classificacaoId: number;
};
interface JogoListagem {
  nome: string;
  descricao: string;
  preco: string;
  imagemUrl: string;
  statusJogo: boolean;
  plataformaIds: number[];
  generoIds: number[];
  classificacaoId: number;
}

export async function cadastrarJogo(dados: JogoFormulario) {
  
    try {
      const formData = new FormData();

      formData.append("nome", dados.nome);
      formData.append("descricao", dados.descricao);
      formData.append("preco", dados.preco);
      if (dados.imagem) {
        formData.append("imagem", dados.imagem);
      }
      dados.plataformaIds.forEach((id) => {
        formData.append("categoriaIds", id.toString());
      });
      dados.generoIds.forEach((id) => {
        formData.append("generoIds", id.toString());
      });
      if (dados.classificacaoId) {
        formData.append("classificacaoId", dados.classificacaoId.toString());
      }

      await api.post("Jogo",formData);


    } catch (error: any) {
      const mensagemErro =
        error.response?.data?.message ||
        error.message ||
        "Erro ao cadastrar jogo";
      throw new Error(mensagemErro);
    }
  }

  export async function listarJogo(){
        try{
            const response = await api.get("Jogo");

            const jogosAtivos = response.data.filter(
                (jogo : JogoListagem) => jogo.statusJogo ===true
            );

            const jogos = jogosAtivos.map((jogos: JogoListagem) => ({...jogos,
                imagemUrl: `${api.defaults.baseURL}${jogos.imagemUrl}`
            }));

            return jogos;

        }catch (error: any) {
      const mensagemErro =
        error.response?.data?.message ||
        error.message ||
        "Erro ao cadastrar jogo";
      throw new Error(mensagemErro);
    }
}
export async function listarPorId(id: number) {
    try{
        const response = await api.get("Jogo/"+id);
        
        const jogo = {
            ...response.data,
            imagemUrl: `${api.defaults.baseURL}${response.data.imagemUrl}`
        };

        return jogo;

    }  catch (error: any) {
        throw new Error(error.response.data);
    }  
}

export async function excluirJogo(jogoId: number) {
    try {
        await api.delete("Jogo/" + jogoId)
    } catch (error: any) {
        throw new Error(error.response.data)
    }
}
export async function listarGeneros() {
  try {
    const response = await api.get("Genero"); 
    return response.data; 
  } catch (error: any) {
    throw new Error(error.response?.data || error.message);
  }
}
export async function editarJogo(jogoId: number, dados: JogoFormulario) {
    try{
        const formData = new FormData();

        formData.append("nome", dados.nome);
        formData.append("descricao", dados.descricao);
        if (dados.imagem) {
            formData.append("imagem", dados.imagem);
        }
        formData.append("preco", dados.preco);
        dados.plataformaIds.forEach((id) => {
            formData.append("plataformaIds", id.toString())
        });
        dados.generoIds.forEach((id) => {
            formData.append("generoIds", id.toString())
        });
        formData.append("classificacaoId", dados.classificacaoId.toString());

        await api.put("Jogo/" + jogoId, formData);

    } catch (error: any) {
        throw new Error(error.response.data);
    } 
}



