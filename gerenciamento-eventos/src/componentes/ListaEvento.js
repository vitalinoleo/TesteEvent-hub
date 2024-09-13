import React, { useState, useEffect } from 'react'; // Importa o React e os hooks useState e useEffect
import axios from 'axios'; // Importa a biblioteca axios para fazer requisições HTTP
import { Link } from 'react-router-dom'; // Importa o componente Link do react-router-dom para navegação entre páginas


function ListaEvento() {
    // Define o estado 'eventos' e a função 'setEventos' para atualizá-lo. Inicialmente, 'eventos' é um array vazio.
    const [eventos, setEventos] = useState([]);


    // O hook useEffect é usado para executar código após a renderização do componente. Neste caso, ele busca os livros da API quando o componente é montado.
    useEffect(() => {
        axios.get('http://localhost:5000/eventos') // Faz uma requisição GET para a API para buscar a lista de eventos
            .then(response => setEventos(response.data)) // Se a requisição for bem-sucedida, atualiza o estado 'eventos' com os dados recebidos
            .catch(error => console.error('Erro ao buscar os eventos:', error)); // Lida com qualquer erro que ocorra durante a requisição
    }, []); // O array vazio [] significa que este useEffect será executado apenas uma vez, quando o componente for montado


    // Função para deletar um evento. Recebe o 'id' do livro como parâmetro.
    const deletarEvento = (id) => {
        axios.delete(`http://localhost:5000/eventos/${id}`) // Faz uma requisição DELETE para a API para remover o livro com o ID especificado
            .then(() => setEventos(eventos.filter(evento => evento._id !== id))) // Atualiza o estado 'eventos' removendo o livro deletado da lista
            .catch(error => console.error('Erro ao deletar o evento:', error)); // Lida com qualquer erro que ocorra durante a requisição
    };


    return (
        <div>
            <h1>Lista de eventos</h1>
            {/* Link para a página de adição de um novo livro */}
            <Link to="/novo">Adicionar Novo evento</Link>
            <ul>
                {/* Mapeia o array de evento para gerar uma lista de itens */}
                {eventos.map(evento => (
                    <li key={evento._id}> {/* Cada item da lista tem uma chave única, o _id do evento */}
                        {evento.titulo} - {evento.descricao} {/* Exibe o título e a descricao do evento */}
                       
                        {/* Link para a página de edição do evento */}
                        <Link to={`/editar/${evento._id}`}>Editar</Link>
                       
                        {/* Botão para deletar o evento */}
                        <button onClick={() => deletarEvento(evento._id)}>Deletar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}


export default ListaEvento; // Exporta o componente ListaLivros para que possa ser usado em outras partes da aplicação
