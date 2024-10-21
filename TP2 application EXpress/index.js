const express = require('express');
const app = express();
const port = 3000;

// Permet à Express de traiter les requêtes JSON
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
let items = [];
 

// 5. Create a POST Endpoint: This will allow us to add items to a local variable.
app.post('/items', (req, res) => {
  const item = req.body;
  items.push(item);
  res.status(201).send(item);
});

// Create a GET Endpoint:  This will allow us to retrieve all items.
app.get('/items', (req, res) => {
  res.send(items);
});

//Create a GET Endpoint by ID: This will allow us to get a specific item.
app.get('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);

  if (item) {
    res.send(item);
  } else {
    res.status(404).send('Item not found');
  }
});
