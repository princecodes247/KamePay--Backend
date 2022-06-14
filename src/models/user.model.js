const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { BCRYPT_SALT } = require("./../config");
const Schema = mongoose.Schema;
const BlockchainService = require("./../services/blockchain.service");

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      trim: true,
      enum: ["user", "admin"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const hash = await bcrypt.hash(this.password, BCRYPT_SALT);
  this.password = hash;

  next();
});

userSchema.pre("save", async function (next) {
  // if (!this.isModified("ethAddress")) return next();
  const { address, privateKey } = await BlockchainService.createAddress();
  this.ethAddress = address;
  this.ethPrivateKey = privateKey;
  console.log(this.ethAddress);

  next();
});

module.exports = mongoose.model("users", userSchema);
