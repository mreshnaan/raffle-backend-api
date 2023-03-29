const { mongoose } = require("../helper/imports");

const userSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      default: mongoose.Types.ObjectId,
      index: true,
      unique: true,
      required: true,
    },
    name: { type: String },
    nonce: { type: Number },
    email: { type: String, required: true },
    publicAddress: { type: String, required: true },
    isPublich: { type: Boolean },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Items",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
