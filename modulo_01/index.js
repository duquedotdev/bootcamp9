const express = require("express");

//Tudo se inicia criando uma variável
const server = express();

//Fala pro express que usaremos JSON no corpo da requisisão
server.use(express.json());

/**
 * Query params = ?teste=1
 * Route params = /user/1
 * Request Body = { payload com as informações }
 */

//http://localhost:3000/teste?nome=Felipe
//Response: {"message":"Olá, Felipe!"}

//http://localhost:3000/teste/1?nome=Felipe
//{"message":"Olá, Felipe!. Seu ID de usuário é 1"}

const users = ["Felipe", "Priscila", "Kalil"];

server.use((req, res, next) => {
  console.time('Request');
  console.log(`Método: ${req.method}, URL:${req.url}`)
  next();
  console.timeEnd('Request');
});

function checkUserExist(req, res, next){
  if(!req.body.name) {
    return res.status(400).json({ error: 'User name not found on request body'});
  }
  return next();
}

function checkUserInArray(req, res, next) {
  if(!users[req.params.id]) {
    return res.status(400).json({ error: 'User not found!'});
  }
  return next();
}

//Lista todos os usuários
server.get("/users/",(req, res) => {
  return res.json(users);
});

//Lista um único usuário
server.get("/users/:id", checkUserInArray , (req, res) => {
  const { id } = req.params;
  return res.json(users[id]);
});

//Cria um usuário
server.post("/users/", checkUserExist,(req, res) => {
  const { name } = req.body;
  users.push(name);
  return res.json("Usuário incluído com sucesso!");
});

//Altera usuário
server.put("/users/:id", checkUserExist, checkUserInArray, (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  users[id] = name;

  return res.json(
    `Usuário ${id} alterado! O nome foi motificado para ${users[id]}`
  );
});

//Deleta Usuário
server.delete("/users/:id", checkUserInArray,(req, res) => {
  const { id } = req.params;

  users.splice(id, 1);

  return res.json(`Usuário ${id} foi deletado!`);
});

server.listen(3000);
