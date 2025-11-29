import React from "react";
import './index.css';
import { useState } from "react";

import LogoImg from './assets/logo.png';


// calculo de alcool ou gasolina
// se o resultado for maior que 0.7 gasolina é melhor
// se o resultado for menor que 0.7 alcool é melhor

export const App: React.FC = () => {
  const [alcoolInput, setAlcoolInput] = useState('');
  const [gasolinaInput, setGasolinaInput] = useState('');
  const [resultado, setResultado] = useState('');

  function calcular(event: React.FormEvent) {
    event.preventDefault();
    
    let calculo = parseFloat(alcoolInput) / parseFloat(gasolinaInput);
console.log(calculo);
    if (calculo < 0.7) {
      setResultado('Álcool é mais vantajoso!');
    } else {
      setResultado('Gasolina é mais vantajosa!');
    }





  }

  return (
    <div>
      <main className="container">
        <img src={LogoImg} alt="Logo" className="Logo" />
        <h1 className="titulo">Qual combustível é mais vantajoso?</h1>


        <form action="" className="formulario" onSubmit={calcular}>
          <label htmlFor="alcool">Álcool (preço por litro):</label>
          <input
          className="input"
            type="number"
            id="alcool"
            name="alcool"
            placeholder="4,90"
            step="0.01"
            required
            value={alcoolInput}
            onChange={e => setAlcoolInput(e.target.value)}
            />

          <label htmlFor="gasolina">Gasolina (preço por litro):</label>
          <input
          className="input"
            type="number"
            id="gasolina"
            name="gasolina"
            placeholder="5,90"
            step="0.01"
            required
            value={gasolinaInput}
            onChange={e => setGasolinaInput(e.target.value)}
            />

          <button type="submit" className="calcular">Calcular</button>
        </form>

        {resultado && (
          <div className="resultado">
            <h2>Resultado:</h2>
            <p>{resultado}</p>
          </div>
        )}

  
      </main>
    </div>
  );
}