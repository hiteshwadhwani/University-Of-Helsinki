const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("please provide password to connect to database");
  process.exit(1);
}
const password = process.argv[2];

const URL = `mongodb+srv://FullStack:${password}@cluster0.xskip.mongodb.net/phonebook?retryWrites=true&w=majority`;
mongoose.connect(URL);

const peopleSchema = new mongoose.Schema({
  name: String,
  number: Number,
});
const People = mongoose.model("People", peopleSchema);

if (process.argv.length === 3) {
  People.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
  });
}
if (process.argv.length === 5) {
  const people = new People({
    name: process.argv[3],
    number: process.argv[4],
  });
  people.save().then((result) => {
    console.log(result);
    mongoose.connection.close();
  });
}
