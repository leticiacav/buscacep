//bloco de importações do código
import { useState } from "react";
import { FiSearch } from "react-icons/fi"; 
import './style.css'; //estilo da página
import api from "./services/api" //importando api

//Função que cria duas variaveis com comportamentos diferentes
function App() {

  const [input, setInput] = useState(''); //atribuindo nome e criando função para alterar o valor da variavel, nos parenteses indica o valor vazio 
  const [cep, setCEP] = useState({});  //objeto vazio 

  async function handleSearch (){  //tornar a página dinâmica, função assicrona, requisição via api, permitindo que o código continue carregando em segundo plano, pode ser qualquer nome

  
    if(input === ''){
      alert("Preencha algum CEP!") //verifica se o usuário preencheu o campo do cep, se for vazio vai dar um alerta, e é um se
      return;
    }
    
    //trabalham juntos
    try{
      const response = await api.get(`${input}/json`) //Executar o que quero que aconteça, vai receber o valor da api, recebe o que o usuário está digitando, guardando dentro de cep
      setCEP(response.data)
      setInput("")
    
    }catch{
      alert("Erro ao buscar CEP!") //Quando o try dar errado vai para o catch, zerando o input. 
      setInput("")
    }
  }
//retorna o que eu quero da minha requisição, retornando uma página em react, estilizando
return(
  <div className="container">
  <h1 className="title">Buscador CEP</h1>  
 

  <div className="containerInput">
    <input          
    type="text"
    placeholder="Digite seu CEP..." //Mensagem de comando para o usuário digitar o valor
    value={input}
    onChange={(e) => setInput(e.target.value)} //captura tudo que for digitado pelo usuário, set input altera para fazer a requisição que é o que o usuário está digitando
  />

  <button className="buttonSearch" onClick={handleSearch}> //chama a função ou seja o parametro
    <FiSearch size={25} color="#FFF"/>       //icone de pesquisa, chamando a função handleSearch 
  </button>
  </div>

//Verifica se tem alguma coisa no meu objeto cep, se tiver ele vai handerizar esse bloco
  {Object.keys(cep).length > 0 &&(
    <main className="main">
      <h2>CEP: {cep.cep}</h2>  //cep.cep é por conta das informações necessárias que estão dentro da variavel cep 
      <span>Rua: {cep.logradouro}</span>
      <span>Complemento: {cep.complemento}</span>
      <span>Bairro: {cep.bairro}</span>
      </main>
  )}
  </div>
);
}

export default App; //Se não exportar a aplicação não funciona, pois ela esta tornando a aplicação app pública, se quiser usar em outro local da aplicação é só importar