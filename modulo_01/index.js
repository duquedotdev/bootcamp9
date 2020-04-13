const express = require('express');

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

 const users = ['Felipe', 'Priscila', 'Kalil'];

 //Lista todos os usuários
server.get('/users/', (req, res) => {
  return res.json(users);
})

//Lista um único usuário
server.get('/users/:id', (req, res) => {
  const { id } = req.params;
  return res.json(users[id]);
})

//Cria um usuário
server.post('/users/',(req, res) => {
  const { name } = req.body;
  users.push(name)
  return res.json("Usuário incluído com sucesso!")
})

//Altera usuário
server.put('/users/:id', (req, res) =>{
  const { id } = req.params;
  const { nome } = req.body;

  users[id] = nome;

  return res.json(`Usuário ${id} alterado! O nome foi motificado para ${users[id]}`);
})

//Deleta Usuário
server.delete('/users/:id', (req, res) =>{
  const { id } = req.params;

  users.splice(id, 1);

  return res.json(`Usuário ${id} foi deletado!`);
})

server.listen(3000);