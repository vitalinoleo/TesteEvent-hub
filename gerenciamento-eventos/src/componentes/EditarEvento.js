import React, { useState, useEffect } from 'react'; // Importa o React e os hooks useState e useEffect
import axios from 'axios'; // Importa a biblioteca axios para fazer requisições HTTP
import { useParams, useNavigate } from 'react-router-dom'; // Importa useParams para obter parâmetros da URL e useNavigate para navegação programática


function EditarEvento() {
    // Obtém o parâmetro 'id' da URL usando useParams. Este 'id' é usado para buscar e atualizar o livro específico.
    const { id } = useParams();
   
    // Define os estados para os campos do formulário. Inicialmente, todos os valores são strings vazias.
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');


    // Hook useNavigate é usado para redirecionar programaticamente após a atualização do evento.
    const navigate = useNavigate();


    // useEffect é usado para buscar os dados do evento quando o componente é montado ou o 'id' muda.
    useEffect(() => {
        // Faz uma requisição GET para a API para buscar os detalhes do livro com o 'id' especificado.
        axios.get(`http://localhost:5000/eventos/${id}`)
            .then(response => {
                // Atualiza os estados com os dados do livro obtidos da API.
                setTitulo(response.data.titulo);
                setDescricao(response.data.descricao);
            })
            .catch(error => console.error('Erro ao buscar o evento:', error)); // Lida com erros durante a requisição
    }, [id]); // O efeito será executado sempre que o 'id' mudar


    // Função para atualizar o evento
    const atualizarEvento = (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário, que é recarregar a página


        // Faz uma requisição PUT para a API para atualizar o livro com o 'id' especificado com os dados do formulário.
        axios.put(`http://localhost:5000/eventos/${id}`, { titulo, descricao })
            .then(() => navigate('/')) // Se a requisição for bem-sucedida, navega para a página principal ('/')
            .catch(error => console.error('Erro ao atualizar evento:', error)); // Lida com qualquer erro que ocorra durante a requisição
    };


    return (
        <form onSubmit={atualizarEvento}> {/* Define que a função atualizarLivro será chamada quando o formulário for enviado */}
            <h1>Editar Evento</h1> {/* Título da página */}
           
            {/* Campo para o título do evento */}
            <input
                type="text"
                value={titulo}
                onChange={e => setTitulo(e.target.value)} // Atualiza o estado 'titulo' quando o valor do campo muda
                placeholder="Título"
                required // Torna este campo obrigatório
            />
           
            {/* Campo para a descricao do evento*/}
            <input
                type="text"
                value={descricao}
                onChange={e => setDescricao(e.target.value)} // Atualiza o estado 'autor' quando o valor do campo muda
                placeholder="descricao"
                required // Torna este campo obrigatório
            />
           
            {/* Botão para enviar o formulário */}
            <button type="submit">Atualizar</button>
        </form>
    );
}


export default EditarEvento; // Exporta o componente EditarLivro para que possa ser usado em outras partes da aplicação
