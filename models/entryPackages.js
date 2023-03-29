const { mongoose } = require("../helper/imports");

const schema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      default: mongoose.Types.ObjectId,
      index: true,
      unique: true,
      required: true,
    },
    type: { type: String },
    entryCount: { type: Number },
    price: { type: String },
    popular: { type: String },
    currencyType: { type: String },
    available: { type: Boolean },
    contractAddress: { type: String },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Items",
    },
    isPublich: { type: Boolean },
  },

  {
    timestamps: true,
  }
);

const projectModel = mongoose.model("EntryPackages", schema);
module.exports = projectModel;
