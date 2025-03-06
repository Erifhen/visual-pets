import React, { useState } from "react";
import axios from "axios";

interface FormProps {
  onSubmit: (images: { individual: string[]; spritesheet: string }) => void;
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [creature, setCreature] = useState("");
  const [background, setBackground] = useState("");
  const [steps, setSteps] = useState(1);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const information = { creature, background, steps };

    try {
      const response = await axios.post("http://localhost:5000/api/gerar-imagens", information);
      console.log("Resposta do server:", response.data);
      
      setTimeout(() => {
        onSubmit(response.data);
      }, 1000);
    } catch (error) {
      console.error("Erro ao enviar os dados", error);
    }
  };

  return (
    <div className="form container">
      <form onSubmit={handleSubmit}>

        <div className="field-container">
          <label>
            Descreva brevemente a criatura que deseja criar!
            <textarea
            value={creature}
            onChange={(e) => setCreature(e.target.value)}
            placeholder="Exemplo: uma onça coberta de diamantes"
            />
          </label>
        </div>
     
      <div className="field-container">
        <label>
          Descreva brevemente o cenário de fundo!
          <textarea
          value={background}
          onChange={(e) => setBackground(e.target.value)}
          placeholder="Exemplo: um deserto hostil..."
          />
      </label>
      </div>

      <div className="special-field-container">
        <label>Selecione a quantidade de evoluções:</label>
          <div className="steps-container">
            {[1, 2, 3, 4, 5].map((num) => (
              <button key={num} type="button" onClick={() => setSteps(num)}>
              {num}
              </button>
            ))}
          </div>
      </div>
      
      
      <button type="submit" className="create-button">Forjar</button>
    </form>
    </div>
    
  );
};

export default Form;
