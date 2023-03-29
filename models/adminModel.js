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
    name: { type: String },
    password: { type: String, select: true }, //You can change the default behavior at the schema definition level using the select attribute of the field
    email: { type: String },
    isPublich: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

const adminModel = mongoose.model("Admins", schema);
module.exports = adminModel;
