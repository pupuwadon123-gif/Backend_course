import express from 'express';
const app = express();
const PORT = 1000;

app.use(express.json());

// ข้อมูลเริ่มต้น 3 รายการ และตัวนับ ID ใหม่ (ไม่ใช้ equipment.length + 1)
let nextId = 104;
const equipment = [
  { id: 101, name: 'Laptop', category: 'computer', quantity: 5 },
  { id: 102, name: 'Mouse', category: 'computer', quantity: 10 },
  { id: 103, name: 'Projector', category: 'av', quantity: 2 }
];

// 1. GET /api/equipment และ ?category= (4 คะแนน)
app.get('/api/equipment', (req, res) => {
  const { category } = req.query;

  // ตรวจ Query ก่อนนำไปใช้
  if (category !== undefined) {
    if (typeof category !== 'string' || category.trim() === '') {
      return res.status(400).json({ message: 'Query parameter category cannot be empty' });
    }
    const targetCategory = category.trim().toLowerCase();
    const filtered = equipment.filter(
      item => item.category.toLowerCase() === targetCategory
    );
    return res.status(200).json(filtered);
  }

  res.status(200).json(equipment);
});

// 2. GET /api/equipment/count (วางไว้ก่อน /:id เสมอ)
app.get('/api/equipment/count', (req, res) => {
  res.status(200).json({ total: equipment.length });
});

// 3. GET /api/equipment/:id (4 คะแนน)
app.get('/api/equipment/:id', (req, res) => {
  const rawId = req.params.id.trim();
  const id = Number(rawId);

  // ดัก ID ผิดรูปแบบ (ไม่ใช่จำนวนเต็มที่ปลอดภัย) ได้ 400
  if (rawId === '' || !Number.isSafeInteger(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  const item = equipment.find(e => e.id === id);
  if (!item) {
    return res.status(404).json({ message: 'Equipment not found' });
  }

  res.status(200).json(item);
});

// 4. POST /api/equipment พร้อม Validation ครบตามเงื่อนไข (6 คะแนน)
app.post('/api/equipment', (req, res) => {
  const { name, category, quantity } = req.body || {};

  // เงื่อนไข: name เป็น String ไม่ว่างหลัง trim()
  if (typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ message: 'name must be a non-empty string' });
  }

  // เงื่อนไข: category เป็น String ไม่ว่างหลัง trim()
  if (typeof category !== 'string' || category.trim() === '') {
    return res.status(400).json({ message: 'category must be a non-empty string' });
  }

  // เงื่อนไข: quantity เป็นจำนวนเต็มที่ปลอดภัย (Safe Integer) ตั้งแต่ 0 ขึ้นไป
  if (typeof quantity !== 'number' || !Number.isSafeInteger(quantity) || quantity < 0) {
    return res.status(400).json({ message: 'quantity must be a safe integer >= 0' });
  }

  const newItem = {
    id: nextId++,
    name: name.trim(),
    category: category.trim(),
    quantity
  };

  equipment.push(newItem);
  res.status(201).json(newItem);
});

// 5. Error Handler สำหรับ JSON รูปแบบผิด ได้ 400 ไม่ใช่ 500
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ message: 'Invalid JSON format' });
  }
  next(err);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});