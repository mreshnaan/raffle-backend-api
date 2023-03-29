const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwtToken = require("jsonwebtoken");
const { recoverPersonalSignature } = require("eth-sig-util");
const { bufferToHex } = require("ethereumjs-util");
const configs = require("../configs/server");
const handler = require("./customHandler");
const mongoose = require("mongoose");

module.exports = {
  express,
  cors,
  dotenv,
  bcrypt,
  jwtToken,
  configs,
  mongoose,
  handler,
  recoverPersonalSignature,
  bufferToHex,
};
