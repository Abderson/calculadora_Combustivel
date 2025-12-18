// 📦 IMPORTAÇÕES - Trazendo coisas de fora para nosso código
import React from "react"; // Importa o React, que é nossa biblioteca para criar páginas interativas
import './index.css'; // Importa nossos estilos de CSS (cores, tamanhos, etc.)
import { useState , useEffect } from "react"; // Importa uma função especial do React que nos deixa guardar informações

import LogoImg from './assets/logo.png'; // Importa nossa imagem do logo

// 📝 EXPLICAÇÃO DA REGRA MATEMÁTICA:
// Para saber qual combustível é melhor, dividimos o preço do álcool pelo preço da gasolina
// Se o resultado for MENOR que 0.7 → Álcool é melhor (mais barato)
// Se o resultado for MAIOR que 0.7 → Gasolina é melhor (mais barata)

// 📋 MODELO DO HISTÓRICO - Como cada cálculo vai ser guardado
interface HistoricoCalculo {
  id: number;        // Um número único para identificar cada cálculo (como um RG)
  alcool: string;    // O preço do álcool que a pessoa digitou
  gasolina: string;  // O preço da gasolina que a pessoa digitou
  relacao: number;   // O resultado da divisão (álcool ÷ gasolina)
  resultado: string; // A frase dizendo qual é melhor
  data: string;      // Quando este cálculo foi feito (data e hora)
}

// 🎮 FUNÇÃO PRINCIPAL - Aqui é onde nossa calculadora "vive"
export const App: React.FC = () => {
  
  // 💾 VARIÁVEIS DE ESTADO - São como caixinhas onde guardamos informações
  // Toda vez que mudamos essas caixinhas, a página se atualiza sozinha!
  
  const [alcoolInput, setAlcoolInput] = useState('');     // Caixinha para guardar o que a pessoa digita no campo álcool
  const [gasolinaInput, setGasolinaInput] = useState(''); // Caixinha para guardar o que a pessoa digita no campo gasolina
  const [resultado, setResultado] = useState('');         // Caixinha para guardar a frase do resultado (qual é melhor)
  
  // 📊 CAIXINHAS PARA GUARDAR OS VALORES CALCULADOS
  const [alcoolCalculado, setAlcoolCalculado] = useState('');     // Preço do álcool que foi usado no cálculo
  const [gasolinaCalculado, setGasolinaCalculado] = useState(''); // Preço da gasolina que foi usado no cálculo
  const [relacaoCalculada, setRelacaoCalculada] = useState(0);    // O resultado da conta (álcool ÷ gasolina)
  
  // 📚 CAIXINHA PARA GUARDAR O HISTÓRICO - Carregar o histórico salvo no localStorage ao iniciar
  const [historico, setHistorico] = useState<HistoricoCalculo[]>(() => {
    const historicoSalvo = localStorage.getItem('historicoCalculos');
    return historicoSalvo ? JSON.parse(historicoSalvo) : [];
  });

  // 💾 SALVAR O HISTÓRICO NO LOCALSTORAGE - Sempre que o histórico mudar, atualiza o que está salvo
  useEffect(() => {
    localStorage.setItem('historicoCalculos', JSON.stringify(historico));
  }, [historico]);




  // 🧮 FUNÇÃO PARA FAZER O CÁLCULO - É chamada quando clicamos no botão "Calcular"
  function calcular(event: React.FormEvent) {
    event.preventDefault(); // Impede que a página recarregue quando enviarmos o formulário

    // 💾 SALVAR OS VALORES ANTES DE LIMPAR - Guardamos o que a pessoa digitou
    setAlcoolCalculado(alcoolInput);     // Salva o preço do álcool em uma caixinha especial
    setGasolinaCalculado(gasolinaInput); // Salva o preço da gasolina em uma caixinha especial

    // 🔢 FAZER A CONTA MATEMÁTICA
    let calculo = parseFloat(alcoolInput) / parseFloat(gasolinaInput); // Divide álcool por gasolina
    setRelacaoCalculada(calculo); // Guarda o resultado da divisão
    
    // 🤔 DESCOBRIR QUAL É MELHOR - Comparamos com 0.7
    let resulatadoTexto = '';
    if (calculo < 0.7) {
      resulatadoTexto = 'Álcool é mais vantajoso!'; // Se for menor que 0.7, álcool é melhor
    } else {
      resulatadoTexto = 'Gasolina é mais vantajosa!'; // Se for maior que 0.7, gasolina é melhor
    }
    setResultado(resulatadoTexto); // Guarda a frase na caixinha do resultado

    // 📝 ADICIONAR NO HISTÓRICO - Criar um novo registro para guardar
    const novoCalculo: HistoricoCalculo = {
      id: Date.now(),                     // Um número único baseado no timestamp atual
      alcool: alcoolInput,                // O preço do álcool que foi digitado
      gasolina: gasolinaInput,            // O preço da gasolina que foi digitado
      relacao: calculo,                   // O resultado da divisão
      resultado: resulatadoTexto,         // A frase dizendo qual é melhor
      data: new Date().toLocaleString('pt-BR'), // A data e hora de agora, no formato brasileiro
    };
    setHistorico([...historico, novoCalculo]); // Adiciona o novo cálculo na lista de histórico

    // 🧹 LIMPAR OS CAMPOS - Apagar o que está nos campos de input para um novo cálculo
    setAlcoolInput('');    // Limpa o campo do álcool
    setGasolinaInput('');  // Limpa o campo da gasolina
  }

  // 💰 FUNÇÃO PARA DEIXAR O DINHEIRO BONITO - Formata os números com duas casas decimais
  function formatarValor(valor: string) {
    if (!valor || isNaN(parseFloat(valor))) return '0,00'; // Se não tiver valor ou não for número, mostra 0,00
    return parseFloat(valor).toFixed(2); // Transforma em número e deixa só 2 casas após a vírgula (ex: 4.90)
  }

  // 🗑️ FUNÇÃO PARA APAGAR TODO O HISTÓRICO
  function limparHistorico() {
    setHistorico([]); // Deixa a lista do histórico vazia (como apagar tudo de um caderno)
  }

  // ❌ FUNÇÃO PARA REMOVER UM ITEM ESPECÍFICO DO HISTÓRICO
  function removerItem(id: number) {
    setHistorico(historico.filter(item => item.id !== id)); // Remove só o item com o ID específico
  }

  // 🖼️ PARTE VISUAL - O que aparece na tela (HTML dentro do JavaScript!)
  return (
    <div>
      {/* 📦 CONTAINER PRINCIPAL - A caixa que contém tudo */}
      <main className="container">
        
        {/* 🖼️ LOGO DA CALCULADORA */}
        <img src={LogoImg} alt="Logo" className="Logo" />
        
        {/* 📝 TÍTULO PRINCIPAL */}
        <h1 className="titulo">Qual combustível é mais vantajoso?</h1>

        {/* 📝 FORMULÁRIO - Onde a pessoa digita os preços */}
        <form action="" className="formulario" onSubmit={calcular}>
          
          {/* 🔥 CAMPO PARA PREÇO DO ÁLCOOL */}
          <label htmlFor="alcool">Álcool (preço por litro):</label>
          <input
            className="input"           // CSS que deixa o campo bonito
            type="number"               // Só aceita números
            id="alcool"                 // Nome único do campo
            name="alcool"               // Nome para o formulário
            placeholder="4,90"          // Exemplo que aparece quando vazio
            step="0.01"                 // Permite centavos (4.90, 4.91, etc.)
            required                    // Campo obrigatório (não pode ficar vazio)
            value={alcoolInput}         // O valor que está na caixinha alcoolInput
            onChange={e => setAlcoolInput(e.target.value)} // Toda vez que a pessoa digita, atualiza a caixinha
          />

          {/* ⛽ CAMPO PARA PREÇO DA GASOLINA */}
          <label htmlFor="gasolina">Gasolina (preço por litro):</label>
          <input
            className="input"           // CSS que deixa o campo bonito
            type="number"               // Só aceita números
            id="gasolina"               // Nome único do campo
            name="gasolina"             // Nome para o formulário
            placeholder="5,90"          // Exemplo que aparece quando vazio
            step="0.01"                 // Permite centavos (5.90, 5.91, etc.)
            required                    // Campo obrigatório (não pode ficar vazio)
            value={gasolinaInput}       // O valor que está na caixinha gasolinaInput
            onChange={e => setGasolinaInput(e.target.value)} // Toda vez que a pessoa digita, atualiza a caixinha
          />

          {/* 🔘 BOTÃO PARA FAZER O CÁLCULO */}
          <button type="submit" className="calcular">Calcular</button>
        </form>

        {/* 📊 CAIXINHA DO RESULTADO - Só aparece quando há um resultado para mostrar */}
        {resultado && (
          <div className="resultado">
            <h2>💡 Resultado:</h2>
            {/* 🔥 Mostra o preço do álcool formatado bonitinho */}
            <p><strong>🔥 Álcool:</strong> R$ {formatarValor(alcoolCalculado)}</p>
            
            {/* ⛽ Mostra o preço da gasolina formatado bonitinho */}
            <p><strong>⛽ Gasolina:</strong> R$ {formatarValor(gasolinaCalculado)}</p>
            
            {/* 📊 Mostra o resultado da divisão com 3 casas decimais */}
            <p><strong>📊 Relação:</strong> {relacaoCalculada.toFixed(3)}</p>
            
            {/* 🏆 A conclusão final - qual combustível é melhor */}
            <div className="conclusao">
              <h3>{resultado}</h3>
            </div>
          </div>
        )}

        {/* 📚 SEÇÃO DO HISTÓRICO - Só aparece se tiver pelo menos 1 cálculo salvo */}
        {historico.length > 0 && (
          <div className="historico">
            
            {/* 🎯 CABEÇALHO DO HISTÓRICO - Título e botão para limpar tudo */}
            <div className="historico-header">
              <h2>📋 Histórico de Cálculos</h2>
              {/* 🗑️ Botão para apagar todo o histórico */}
              <button onClick={limparHistorico} className="btn-limpar">
                🗑️ Limpar Histórico
              </button>
            </div>
            
            {/* 📝 LISTA DE TODOS OS CÁLCULOS SALVOS */}
            <div className="historico-lista">
              {/* 🔄 Para cada cálculo no histórico, cria um cartãozinho */}
              {historico.map((item) => (
                <div key={item.id} className="historico-item">
                  {/* 📊 INFORMAÇÕES DO CÁLCULO */}
                  <div className="historico-info">
                    {/* 🔥 Preço do álcool deste cálculo */}
                    <p><strong>🔥 Álcool:</strong> R$ {formatarValor(item.alcool)}</p>
                    
                    {/* ⛽ Preço da gasolina deste cálculo */}
                    <p><strong>⛽ Gasolina:</strong> R$ {formatarValor(item.gasolina)}</p>
                    
                    {/* 📊 Resultado da divisão deste cálculo */}
                    <p><strong>📊 Relação:</strong> {item.relacao.toFixed(3)}</p>
                    
                    {/* 🏆 Qual combustível foi melhor neste cálculo */}
                    <p className="resultado-historico"><strong>{item.resultado}</strong></p>
                    
                    {/* 📅 Quando este cálculo foi feito */}
                    <p className="data-historico">📅 {item.data}</p>
                  </div>
                  
                  {/* ❌ BOTÃO PARA REMOVER ESTE CÁLCULO ESPECÍFICO */}
                  <button 
                    onClick={() => removerItem(item.id)} // Chama a função para remover apenas este item
                    className="btn-remover"
                    title="Remover este cálculo" // Texto que aparece quando passa o mouse por cima
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>  {/* 📦 Fim do container principal */}
    </div>// {/* 📦 Fim da div principal */}
  ); // 🔚 Fim do return - fim da parte visual
} // 🔚 Fim da função App - fim da nossa calculadora!

