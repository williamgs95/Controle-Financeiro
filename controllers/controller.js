//const db = require('../models/index.js');
//const { logger } = require('../config/logger.js');

const TransactionModel = require('../models/TransactionModel');

const Grades = TransactionModel;

const create = async (req, res) => {
  const grade = new Grades({
    name: req.body.name,
    subject: req.body.subject,
    type: req.body.type,
    value: req.body.value,
  });
  try {
    const data = await grade.save();

    res.send({ message: 'Grade inserido com sucesso' });
    //logger.info(`POST /grade - ${JSON.stringify()}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    //logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  res.send('grade');
  /* const name = req.query.name;
  //condicao para o filtro no findAll
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};

  try {
    const data = await Grades.find(condition);

    res.send(data);
    logger.info(`GET /grade`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    //logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  } */
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Grades.findOne({ _id: id });

    if (!data) {
      res.status(404).send('Nenhum registro encontrado para o Id informado');
    } else {
      res.send(data);
    }
    //logger.info(`GET /grade - ${id}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
    //logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};
const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }
  const id = req.params.id;
  const update = req.body;

  try {
    const data = await Grades.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!data) {
      res
        .status(404)
        .send('Nenhum registro encontrado para o Id informado para atualizar');
    } else {
      res.send(data);
    }
    //logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    //logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Grades.findByIdAndRemove({ _id: id });

    if (!data) {
      res
        .status(404)
        .send('Nenhum registro encontrado para o Id informado para excluir');
    } else {
      res.send('Grade excluida com sucesso.');
    }
    //logger.info(`DELETE /grade - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    //logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  try {
    const data = await Grades.deleteMany({});
    if (!data) {
      res.status(404).send('Nenhum encontramos nenhum registro para excluir');
    } else {
      res.send('Registros excluidos com sucesso.');
    }
    //logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
    //logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

module.exports = {
  create,
  findAll,
  findOne,
  update,
  remove,
  removeAll,
};
