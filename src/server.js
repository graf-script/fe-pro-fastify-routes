import fastify from './index';

server.post('/uppercase', (request, reply) => {
  if (request.body.toLowerCase().includes('fuck')) {
    reply.status(403).send('unresolved');
  } else {
    return request.body.toUpperCase();
  }
});

server.post('/lowercase', (request, reply) => {
  if (request.body.toLowerCase().includes('fuck')) {
    reply.status(403).send('unresolved');
  } else {
    return request.body.toLowerCase();
  }
});

server.get('/user/:id', (request, reply) => {
  const {id = 0} = request.params;

  if (id in users) {
    reply.send(users[id]);
  } else {
    reply.status(404).send('User not exist');
  }
});

server.get('/users', (request, reply) => {
  const {filter, value} = request.query;
  const result = Object.values(users).filter(({ value }) => {
    return filter && value;
  })

  reply.send(result);
});

(async () => {
  try {
    await fastify.listen(3000);
  } catch (err) {
    console.log(err);
  }
})();
