import Fastify from 'fastify';

import { users } from './users';

const fastify = Fastify({
  logger: true,
});

fastify.post('/uppercase', (request, reply) => {
  if (request.body.toLowerCase().includes('fuck')) {
    reply.status(403).send('unresolved');
  } else {
    return request.body.toUpperCase();
  }
});

fastify.post('/lowercase', (request, reply) => {
  if (request.body.toLowerCase().includes('fuck')) {
    reply.status(403).send('unresolved');
  } else {
    return request.body.toLowerCase();
  }
});

fastify.get('/user/:id', (request, reply) => {
  const {id = 0} = request.query;

  if (id in users) {
    reply.send(users[id]);
  } else {
    reply.status(400).send('User not exist');
  }
});

fastify.get('/users', (request, reply) => {
  const { filter, value } = request.query;
  const result = Object.values(users).filter((users) => {
    return users[filter] === +value || users[filter] === value;
  });
  if (+value === undefined || value === undefined) {
    return Object.values(users);
  }
  reply.send(result);
});


fastify.register(import('@fastify/cors'));
fastify.register(import('@fastify/multipart'), {
  addToBody: true,
});
fastify.register(import('@fastify/cookie'));

export default fastify;
