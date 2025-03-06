const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

/*
desabilitei o replicate e fiz um post manual porque a api free do replicate não é free de verdade :D
tu consegue a chave e a documentação free, mas pra conseguir usar de verdade tem que pagar :D
mas ta ai, se tu tiver a api real da pra dale, eu acho. Tive que recorrer a outras soluções.

deixarei assim a fim de testes, mas básicamente a melhor solução foi:
dar clone em uma versão de stable diffusion com mod de pixel-art, e passar um prompt só
pra gerar um spritesheet completo da imagem, de um bicho evoluindo e tals.
dai recortar a imagem depois em x partes, sendo x o numero de steps.
foi meio role fazer isso, não rodei o stable direto no projeto, por isso só subi o resultado
mas quem sabe futuramente eu atualizo com essa versão que deu certo.

Se tu tiver uma chave replicate ativa e testar me diz ai se deu bom kkkkkjj

const promptRoute = require('./ReplicateRoute');
app.use('/api', promptRoute);
*/

app.post("/api/gerar-imagens", (req, res) => {
    const { creature, background, steps } = req.body;
    console.log("Dados recebidos:", req.body);

    const individualImages = [
        "https://i.imgur.com/mcyS78U.png",
        "https://i.imgur.com/IeovGLE.png",
        "https://i.imgur.com/WIzvQLp.png",
        "https://i.imgur.com/eFicDyD.png"
    ];


    const selectedImages = individualImages.slice(0, steps);

    const spritesheet = "https://i.imgur.com/nRcZZyz.png";

    setTimeout(() => {
        res.json({
            individual: selectedImages,
            spritesheet: spritesheet
        });
    }, 1000);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
