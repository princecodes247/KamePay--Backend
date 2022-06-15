const Transaction = require("../models/transaction.model.js");
// const Transaction = require("./../models/transaction.model");
const BlockchainService = require("./blockchain.service");
const CustomError = require("./../utils/custom-error");

class TransactionService {
  async create(data) {
    return await new Transaction(data).save();
  }

  async getAll() {
    return await Transaction.find({}, { ethPrivateKey: 0, __v: 0 });
  }

  async getOne(transactionID) {
    const transaction = await Transaction.findOne(
      { _id: transactionID },
      { ethPrivateKey: 0, __v: 0 }
    );
    if (!transaction) throw new CustomError("Transaction does not exist");

    return transaction;
  }

  async closeTransaction(transactionID) {
    const transaction = await Transaction.findOne({ _id: transactionID });
    if (!transaction) throw new CustomError("Transaction does not exist");
    if (transaction.status === "success")
      throw new CustomError("Transaction is already closed");

    const transactionAmount = transaction.amount;
    const walletBalance = await BlockchainService.getBalance(
      transaction.ethAddress
    );
    if (walletBalance < transactionAmount)
      throw new CustomError("Insufficient balance");

    transaction.status = "success";
    await transaction.save();
  }

  async update(transactionID, data) {
    const transaction = await Transaction.findByIdAndUpdate(
      { _id: transactionID },
      { $set: data },
      { new: true }
    );

    if (!transaction) throw new CustomError("Transaction dosen't exist", 404);

    return transaction;
  }
  async updateStatus(transactionID, data) {
    const transaction = await Transaction.findByIdAndUpdate(
      { _id: transactionID },
      { $set: data },
      { new: true }
    );

    if (!transaction) throw new CustomError("Transaction dosen't exist", 404);

    return transaction;
  }

  async delete(transactionID) {
    const transaction = await Transaction.findOne({ _id: transactionID });
    transaction.remove();
    return transaction;
  }
}

module.exports = new TransactionService();
