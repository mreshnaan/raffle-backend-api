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
