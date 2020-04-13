const express = require('express');
const server = express();

server.use(express.json());

projects = [];

function projectExists(req, res, next) {
  const { id } = req.params;
  const projectID =  projects.find(project => project.id == id);
  if(!projectID){
    return res.send(400).json("ID não encontrado");
  }
  return next();
}

function countRequest(req, res, next) {
  console.count(`Counting`) // Não conhecia
  next();
}

//Lista todos os projetos
server.get("/projects", countRequest ,(req, res) =>{
  return res.json(projects)
})

// //Lista um único projeto
// server.get("/projects/:id", projectExists ,(req, res) =>{
//   const { id } = req.params;
//   return res.json(projects);
// })

//Cria um projeto
server.post("/projects",countRequest,(req, res) => {
  const { id, title } = req.body;
  const project =  { id, title, tasks: [] }
  projects.push(project);
  return res.json(`Usuário ID ${id} criado!`);
});

//Altera um projeto
server.put("/projects/:id", projectExists, countRequest, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project =  projects.find(project => project.id === id);
  project.title = title

  res.send(projects);
})

//Deleta Usuário
server.delete("/projects/:id", projectExists, countRequest, (req, res) => {
  const { id } = req.params;
  const project =  projects.findIndex(project => project.id === id); //Não conhecia
  projects.splice(project, 1);
  return res.send(200);
});

server.listen(3333); // Porta de Desafios