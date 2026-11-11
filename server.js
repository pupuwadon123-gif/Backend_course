import express from "express";
const app = express();
const PORT = 3000;

const equipment = [
  { id: "eq001", name: "Laptop", category: 'computer' },
  { id: "eq002", name: "Printer", category: 'printer' },
  { id: "eq003", name: "Keyboard", category: 'accessory' },
  { id: "eq004", name: "Projector", category: 'projector' }
];

app.get("/apl/equipment/getNum", (req, res) => {
  res.status(200).json({number: equipment.length, message: "Equipment list retrieved successfully."});
});

app.get("/apl/equipment/:id", (req, res) => {
  const id = Number(req.params.id);
  const result = equipment.find(e => e.id === id);
  if (result) {
    res.status(200).json(result)
  }else {
    res.status(404).json({message: "Equipment not found."})
  }
  
});

app.get("/apl/equipment", (req, res) => {
  const cat = req.query.category;
  const result = cat? equipment.filter(e=>e.category === cat) : equipment;
  res.status(200).json(result);
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
} );

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});