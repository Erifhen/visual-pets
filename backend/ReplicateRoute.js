const express = require("express");
const router = express.Router();
const Replicate = require("replicate");
require("dotenv").config();


const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN
});

router.post("/gerar-imagem", async(req, res) =>{
    try{
        const { creature, background, steps} = req.body;

        if (!creature || !background || !steps){
            console.log("Erro no prompt mano");
            return res.status(400).json({error: "dados inválidos"});
        }
    
        let images = [];
        for (let i = 1; i <= steps; i++) {
            let description = `Pixel art of a ${creature} creature evolving, stage ${i}/5.
            The ${background} background also evolves to stage ${i}/5.
            Retro video game style, low resolution, limited color palette.`;
            
            try {
                const output = await replicate.run(
                    "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
                    { input: { prompt: description, scheduler: "K_EULER" } }
                );
                
               
                if (output && output[0]?.image_url) {
                    images.push(output[0].image_url);
                } else {
                    console.error("Erro: Resposta da API não contém uma imagem válida.");
                }
            } catch (err) {
                console.error(`Erro ao gerar a imagem do estágio ${i}:`, err);
            }
        }

        if (images.length === 0) {
            return res.status(500).json({ error: "Nenhuma imagem foi gerada." });
        }

        res.json({ images });
    
    } catch (err){
        console.error("Erro ao gerar imagens", err);
        res.status(500).json({ error: "Erro no servidor"});
    }
});

module.exports = router;