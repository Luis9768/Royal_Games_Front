import Pagination from '@mui/material/Pagination';

const Paginacao = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
      <Pagination 
        count={5} // Quantidade total de páginas
        variant="outlined" // Deixa o botão vazado, só com borda
        shape="rounded" // Deixa quadradinho com cantos arredondados (igual sua imagem)
        
        // Aqui entra a mágica: o "CSS" do MUI
        sx={{
          '& .MuiPaginationItem-root': {
            color: '#ffffff', // Cor do texto dos números e setas
            borderColor: '#ff2759', // Borda rosa/vermelha
            fontSize: '1rem',
            fontWeight: 'bold',
            
            // Efeito quando passa o mouse
            '&:hover': {
              backgroundColor: 'rgba(255, 39, 89, 0.2)', // Fundo rosa meio transparente
            },
          },
          
          // Estilo EXCLUSIVO da página que está selecionada/ativa
          '& .Mui-selected': {
            backgroundColor: '#ff2759 !important', // Fundo rosa forte
            color: '#ffffff',
            borderColor: '#ff2759',
          },
          
          // Cor dos botões de setinha (Próximo/Anterior)
          '& .MuiPaginationItem-icon': {
            fill: '#ff2759', 
          }
        }}
      />
    </div>
  );
};

export default Paginacao;