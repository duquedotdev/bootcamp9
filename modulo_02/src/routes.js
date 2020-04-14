import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => {
  res.json('Hello, Felipe Duque!');
});

export default routes;
