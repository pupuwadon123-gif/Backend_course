import express from "express";
const app = express();
const PORT = 3000;

const equipment = [
  { id: "eq001", name: "Laptop", capacity: 'computer' },
  { id: "eq002", name: "Printer", capacity: 'printer' },
  { id: "eq003", name: "Keyboard", capacity: 'accessory' }
];

app.get("/apl/equipment/getNum", (req, res) => {
  res.status(200).json({number: equipment.length, message: "Equipment list retrieved successfully."});
});

app.get("/apl/equipment", (req, res) => {
  res.status(200).json(equipment);
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
} )

app.get("/health", (req, res) => {
  res.json({ status: "Health check passed!"
            ,message: "Server is running smoothly."
            });
});

app.get('/Myfriend', (req, res) => {
  const friendsList = [
    { id: "6612345607", name: "องศา" },
    { id: "6612345608", name: "เก้า" },
    { id: "6612345609", name: "ภัทร" },
    { id: "6612345610", name: "ฟรุ๊ด" },
    { id: "6612345611", name: "ธี" },
    { id: "6612345612", name: "ติม" },
    { id: "6612345613", name: "ข้าว" },
    { id: "6612345614", name: "ยูริ" },
    { id: "6612345615", name: "เท็น" },
    { id: "6612345618", name: "โมเดล" },
    { id: "6612345619", name: "ภูมิ" },
    { id: "6612345620", name: "ภู" },
    { id: "6612345622", name: "เป็ก" },
    { id: "6612345623", name: "นาย" },
  ];

  res.json(friendsList);
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});