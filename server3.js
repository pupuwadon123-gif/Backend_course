import express from 'express';
const app = express();
const PORT = 1000;
app.use(express.json());

// ดักจับ JSON รูปแบบผิด ให้ได้ 400 ไม่ใช่ 500
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ message: 'Invalid JSON format' });
  }
  next();
});

// ข้อมูลเริ่มต้นใน RAM (3 รายการ, computer 2 รายการ)
let nextId = 104;
const equipment = [
  { id: 101, name: 'Laptop', category: 'computer', quantity: 5 },
  { id: 102, name: 'Mouse', category: 'computer', quantity: 10 },
  { id: 103, name: 'Projector', category: 'av', quantity: 2 }
];

// 1 & 2. GET ทั้งหมด หรือกรองตาม ?category=
app.get('/api/equipment', (req, res) => {
  const { category } = req.query;

  if (category !== undefined) {
    if (category.trim() === '') {
      return res.status(400).json({ message: 'Category cannot be empty' });
    }
    const filtered = equipment.filter(
      item => item.category.toLowerCase() === category.toLowerCase()
    );
    return res.status(200).json(filtered);
  }

  res.status(200).json(equipment);
});

// 3. GET /api/equipment/count (ต้องวางไว้ก่อน /:id เสมอ!)
app.get('/api/equipment/count', (req, res) => {
  res.status(200).json({ total: equipment.length });
});

// 4 & 5. GET /api/equipment/:id
app.get('/api/equipment/:id', (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: 'ID must be a valid number' });
  }

  const item = equipment.find(e => e.id === id);
  if (!item) {
    return res.status(404).json({ message: 'Equipment not found' });
  }

  res.status(200).json(item);
});

// 6 & 7. POST /api/equipment
app.post('/api/equipment', (req, res) => {
  const { name, category, quantity } = req.body || {};

  // 1. ดัก name ว่าง หรือไม่ได้ส่งมา
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ message: 'Name is required and cannot be empty' });
  }

  // 2. ดัก quantity เป็นข้อความ ("5") หรือติดลบ (-1) หรือไม่ได้ส่งมา
  if (typeof quantity !== 'number' || isNaN(quantity) || quantity < 0) {
    return res.status(400).json({ message: 'Quantity must be a non-negative number' });
  }

  const newItem = {
    id: nextId++,
    name: name.trim(),
    category: category ? String(category).trim() : 'general',
    quantity
  };

  equipment.push(newItem);
  res.status(201).json(newItem);
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});