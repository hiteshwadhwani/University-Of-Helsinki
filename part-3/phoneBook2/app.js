const express = require("express");
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const PORT = process.env.PORT || 3001;

app.use(express.json());

const requestLogger = morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
})


//middelwares

app.use(requestLogger);
app.use(cors());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
const getMax = () => {
  const max = Math.max(...persons.map((n) => n.id));
  return max;
};
app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((n) => n.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});
app.get("/info", (req, res) => {
  const noOfEntries = getMax();
  const date = new Date();
  res.send(
    `<p>Phonebook has info for ${noOfEntries} people.</p><p>${date}</p>`
  );
});
app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});
const getRandomArbitrary = () => {
  return Math.random() * (100000 - 0) + 0;
};
app.post("/api/persons", (req, res) => {
  const person = req.body;
if(!person.name || !person.number){
    res.status(400).json({error: 'The name or number is missing'});
}

  const newPerson = {
    id: getRandomArbitrary(),
    name: person.name,
    number: person.number,
  };
  persons = persons.concat(newPerson);
  res.json(newPerson);
});
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
