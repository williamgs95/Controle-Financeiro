const transactionModels = require('../models/TransactionModel.js');
//const { logger } = require('../config/logger.js');

const create = async (req, res) => {
  const grade = new transactionModels({
    description: req.body.description,
    value: req.body.value,
    category: req.body.category,
    year: req.body.year,
    month: req.body.month,
    day: req.body.day,
    yearMonth: req.body.yearMonth,
    yearMonthDay: req.body.yearMonthDay,
    type: req.body.type,
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

const findAllOfMonth = async (req, res) => {
  const searchDate = await req.query.period;
  if (!searchDate) {
    res.send(
      '"Error": "É necessário informar o parâmetro "period", cujo valor deve estar no formato yyyy-mm"'
    );
  } else {
    try {
      const data = await transactionModels.find({ yearMonth: searchDate });
      res.send(data);
      logger.info(`GET /transaction`);
    } catch (error) {
      res.status(500).send({
        message: error.message || 'Erro ao listar todos os documentos',
      });
      //logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
    }
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await transactionModels.findOne({ _id: id });

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
    const data = await transactionModels.findByIdAndUpdate(
      { _id: id },
      update,
      {
        new: true,
      }
    );
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
    const data = await transactionModels.findByIdAndRemove({ _id: id });

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
    const data = await transactionModels.deleteMany({});
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
  findAllOfMonth,
  findOne,
  update,
  remove,
  removeAll,
};
