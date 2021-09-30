const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const dotenv = require("dotenv");

dotenv.config();

const URL = process.env.MONGODB_URI;
mongoose
  .connect(URL, { useNewUrlParser: true })
  .then((connection) => console.log("connected to DB"))
  .catch((error) => console.error(error));

const peopleSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    minLength: 3,
  },
  number: {
    type: Number,
    required: true,
    min: 8,
  },
});
peopleSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
peopleSchema.plugin(uniqueValidator);
module.exports = mongoose.model("People", peopleSchema);
