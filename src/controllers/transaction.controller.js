const TransactionServ = require("./../services/transaction.service");
const response = require("./../utils/response");

class TransactionContoller {
  async create(req, res) {
    const result = await TransactionServ.create(req.body);
    res.status(200).send(response("Transaction created", result));
  }

  async getAll(req, res) {
    const result = await TransactionServ.getAll();
    res.status(200).send(response("All transactions", result));
  }

  async getOne(req, res) {
    const result = await TransactionServ.getOne(req.params.transactionId);
    res.status(200).send(response("Transaction data", result));
  }

  async closeTransaction(req, res) {
    const result = await TransactionServ.closeTransaction(
      req.params.transactionId
    );
    res.status(200).send(response("Transaction closed", result));
  }

  async update(req, res) {
    const result = await TransactionServ.update(
      req.params.transactionId,
      req.body
    );
    res.status(200).send(response("Transaction updated", result));
  }

  async delete(req, res) {
    const result = await TransactionServ.delete(req.params.transactionId);
    res.status(200).send(response("Transaction deleted", result));
  }
}

module.exports = new TransactionContoller();
