const express = require('express');
//const transactionRouter = express.Router();
const {
  create,
  findAllOfMonth,
  findOne,
  update,
  remove,
  removeAll,
} = require('../controllers/controller.js');

const app = express();

app.post('/newTransaction', create);
app.get('', findAllOfMonth);
app.get('/find/:id', findOne);
app.put('/update/:id', update);
app.delete('/delete/:id', remove);
app.delete('', removeAll);

module.exports = { app };
