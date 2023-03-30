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
    tokenId: { type: Number, require: true },
    type: { type: String },
    name: { type: String },
    shortName: { type: String },
    imageURL: { type: String },
    animationURL: { type: String },
    contractAddress: { type: String },
    contractType: { type: String },
    collectionSlug: { type: String },
    quantity: { type: Number },
    endDuration: { type: String },
    owned:{type : String},
    rank: { type: Number },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    packages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "EntryPackages",
      },
    ],
    isPublich: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

const itemModel = mongoose.model("Items", schema);
module.exports = itemModel;
