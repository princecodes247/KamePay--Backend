const mongoose = require("mongoose");
const shortid = require("shortid");
const Schema = mongoose.Schema;
const BlockchainService = require("./../services/blockchain.service");
const TransactionSchema = new Schema(
  {
    _id: {
      type: String,
      default: shortid.generate,
    },
    from: {
      type: String,
      required: [true, "Sender is required"],
    },
    to: {
      type: String,
      required: [true, "Receiver is required"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    status: {
      type: String,
      trim: true,
      enum: ["pending", "processing", "success", "failed"],
      default: "pending",
    },
    txHash: {
      type: String,
      trim: true,
      // required: [true, "Tx hash is required"],
    },
    ethAddress: {
      type: String,
      trim: true,
      // required: [true, "Eth address is required"],
    },
    ethPrivateKey: {
      type: String,
      trim: true,
      // required: [true, "Eth private key is required"],
    },
  },
  {
    timestamps: true,
  }
);

TransactionSchema.pre("save", async function (next) {
  const { address, privateKey } = await BlockchainService.createAddress();
  this.ethAddress = address;
  this.ethPrivateKey = privateKey;
  console.log(this.ethAddress);
  next();
});

module.exports = mongoose.model("Transaction", TransactionSchema);
