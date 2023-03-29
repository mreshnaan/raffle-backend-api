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
    address: { type: String },
    type: { type: String },
    name: { type: String },
    description: { type: String },
    imageURL: { type: String },
    count: { type: Number },
    slug: { type: String },
    symbol: { type: String },
    rank: { type: Number },
    stats: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stats",
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Items",
      },
    ],
    isPublich: { type: Boolean },
  },

  {
    timestamps: true,
  }
);

const projectModel = mongoose.model("Project", schema);
module.exports = projectModel;
