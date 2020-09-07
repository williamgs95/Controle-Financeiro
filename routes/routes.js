const express = require('express');
const transactionRouter = express.Router();
const {
  create,
  findAll,
  findOne,
  update,
  remove,
  removeAll,
} = require('../controllers/controller.js');

const app = express();

app.get('/', async (req, res) => {
  res.send('OK');
});
app.post('/grade', create);
app.get('/grade', findAll);
app.get('/grade/:id', findOne);
app.put('/grade/:id', update);
app.delete('/grade/:id', remove);
app.delete('/grade', removeAll);

module.exports = { transactionRouter, app };
