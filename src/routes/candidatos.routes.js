import { Router } from "express";

const candidatosRoutes = Router()

let candidatos = [
    {
        id: Math.floor(Math.random() * 1000000),
        nome: "Capitã Lucimara",
        partido: "PSD",
        idade: "39",
        concorrente: true,  // Concorrente ao segundo mandato;
        propostas: [
            "Aumenta do salário mínimo",
            "Melhor festa do figo",
            "Melhoria do upa"
        ],
    },
   
]


candidatosRoutes.get("/", (req, res) => {
    return res .status(200)
    .send(candidatos)
})

candidatosRoutes.post("/", (req, res) => {
    const { nome, partido, idade, concorrente, propostas } = req.body;

    if (!nome || !partido) {
        return res.status(400).send({
            message: "O nome ou o partido não foi preenchido!"
        });
    }

    //Validação de idade
    if (idade < 18) {
        return res.status(400).send({
            message: "Idade insuficiente para a candidatura"
        });
    }

    
    const novoCandidato = {
        id: Math.floor(Math.random() * 1000000),
        nome: nome,
        partido: partido,
        idade: idade,
        concorrente: concorrente,
        propostas: propostas
    };

    candidatos.push(novoCandidato)
    return res.status(201).send({
        message: "Candidato cadastrado com sucesso!",
        novoCandidato,
    });
});

candidatosRoutes.get("/:id", (req, res)=> {
    const { id } = req.params;
    const candidatos = candidatos.find((politico) => politico.id == id);



if (!candidatos) {
    return res.status(404).send({
        message: "Candidato não encontrado!",
    });
}

candidatos = candidatos.filter((candidate) => candidate.id != id)

return res.status(200).send({
    message: "candidato deletado!",
    candidatos,
});
});
export default candidatosRoutes;