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
    floorPrice: { type: String, required: true },
    owners: { type: Number, required: true },
    items: { type: Number, required: true },
    volume: { type: String, required: true },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    isPublich: { type: Boolean },
  },

  {
    timestamps: true,
  }
);

const projectModel = mongoose.model("Stats", schema);
module.exports = projectModel;
