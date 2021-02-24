import express from 'express';

const app = express();

app.get('/users', (request, response) => {
  return response.send("Hello, world!")
})

app.post('/', (request, response) => {
  return response.json({ mensagem: "Os dados foram salvos com sucesso" });
})

app.listen(3333, () => {
  console.log('Server is running');
})
