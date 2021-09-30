if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const People = require("./models/person");

app.use(express.json());
app.use(express.static("build"));

const requestLogger = morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
    JSON.stringify(req.body),
  ].join(" ");
});

//middelwares

app.use(requestLogger);
app.use(cors());


const getMax = () => {
  People.find({}).then((result) => {
    return Math.max(...result.map((n) => n.id));
  });
};
app.get("/api/persons", (req, res) => {
  // res.json(persons);
  People.find({}).then((result) => {
    res.json(result);
  });
});
app.post("/api/persons", (req, res, next) => {
  const person = req.body;
  if (!person.name || !person.number) {
    res.status(400).json({ error: "The name or number is missing" });
  }

  const newPerson = new People({
    name: person.name,
    number: person.number,
  });
  newPerson
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      next(err);
    });
});
app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  People.findById(id)
    .then((person) => {
      res.json(person);
    })
    .catch((err) => {
      res.status(404).end();
    });
});
app.get("/info", (req, res) => {
  const noOfEntries = getMax();
  const date = new Date();
  res.send(
    `<p>Phonebook has info for ${noOfEntries} people.</p><p>${date}</p>`
  );
});
app.put("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;

  const body = req.body;

  const people = {
    name: body.name,
    number: body.number,
  };

  People.findByIdAndUpdate(id, people, { new: true , runValidators: true})
    .then((updatedPeople) => {
      res.json(updatedPeople);
    })
    .catch((error) => next(error));
});
app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;

  People.findByIdAndDelete(id)
    .then(() => {
      res.status(204).end();
    })
    .catch((err) => {
      next(err);
    });
});
// const getRandomArbitrary = () => {
//   return Math.random() * (100000 - 0) + 0;
// };
const errorHandler = (error, req, res, next) => {
  // console.log(err);
  if (error.name === "CastError") {
    res.status(400).send({ error: "malformated id" });
  }
  if (error.name === "ValidationError") {
    res.status(400).send({ error: error.message });
  }

  next(error);
};
app.use(errorHandler);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
