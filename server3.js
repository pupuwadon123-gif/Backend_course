import express from "express";
const app = express();
const PORT = 1000;

app.use(express.json());

let students = [
  { stdID: "69319010007", stdName: "นาย กฤษดา บุญเหลือ" },
  { stdID: "69319010008", stdName: "นาย ญาณวุฒิ จันเพ็ง" },
  { stdID: "69319010009", stdName: "นาย ณภัทร โสธรรมมงคล" },
  { stdID: "69319010010", stdName: "นาย ธนดล คล้ายรัศมี" },
  { stdID: "69319010011", stdName: "นาย ธีทัต จันทร์สว่าง" },
  { stdID: "69319010012", stdName: "นาย นัฐพนธ์ ใจเย็น" },
  { stdID: "69319010013", stdName: "นาย ปกรณ์เกียรติ อยู่พิทักษ์สกุล" },
  { stdID: "69319010014", stdName: "นาย ปฏิพล เรืองชัย" },
  { stdID: "69319010015", stdName: "นาย ปิยะพงษ์ เหล่าประชาวิทย์" },
  { stdID: "69319010018", stdName: "นางสาว ภัทราวรินทร์ ศรีน้อย  " },
  { stdID: "69319010019", stdName: "นาย ภูริพัฒน์ สุธรรมมา" },
  { stdID: "69319010020", stdName: "นาย ภูวดล พลจารย์" },
  { stdID: "69319010022", stdName: "นาย ศาศวัต แสงคําฉาย" },
  { stdID: "69319010023", stdName: "นาย อภิรักษ ศรีวัดทานัง" },
  { stdID: "69319010024", stdName: "นาย อัครพงษ์ ศรีสวัสดิ์" },
  { stdID: "69319010025", stdName: "นาย อัครพงษ์ ศรีสวัสดิ์" },
  { stdID: "69319010026", stdName: "นาย อัครพงษ์ ศรีสวัสดิ์" }
];

app.get('/api/students', (req, res) => {
  res.status(200).json(students);
});

app.get('/api/students/:stdID', (req, res) => {
  const { stdID } = req.params;
  const student = students.find(s => s.stdID === stdID);

  if (!student) {
    return res.status(404).json({ message: 'ไม่พบข้อมูลนักศึกษา' });
  }
  res.status(200).json(student);
});

app.post('/api/students', (req, res) => {
  const { stdID, stdName } = req.body;

  if (!stdID || !stdName) {
    return res.status(400).json({ message: 'กรุณาระบุ stdID และ stdName ให้ครบถ้วน' });
  }

  const isDuplicate = students.some(s => s.stdID === String(stdID).trim());
  if (isDuplicate) {
    return res.status(400).json({ message: 'รหัสนักศึกษานี้มีอยู่ในระบบแล้ว' });
  }

  const newStudent = {
    stdID: String(stdID).trim(),
    stdName: String(stdName).trim()
  };

  students.push(newStudent);
  res.status(201).json({
    message: 'เพิ่มข้อมูลนักศึกษาสำเร็จ',
    data: newStudent
  });
});


app.patch('/api/students/:stdID', (req, res) => {
  const { stdID } = req.params;
  const student = students.find(s => s.stdID === stdID);

  if (!student) {
    return res.status(404).json({ message: 'ไม่พบข้อมูลนักศึกษา' });
  }

  if (!req.body || !req.body.stdName) {
    return res.status(400).json({ message: 'กรุณาระบุ stdName ที่ต้องการแก้ไข' });
  }

  student.stdName = String(req.body.stdName).trim();
  res.status(200).json({
    message: 'แก้ไขข้อมูลนักศึกษาสำเร็จ',
    data: student
  });
});


app.delete('/api/students/:stdID', (req, res) => {
  const { stdID } = req.params;
  const index = students.findIndex(s => s.stdID === stdID);

  if (index === -1) {
    return res.status(404).json({ message: 'ไม่พบข้อมูลนักศึกษา' });
  }

  const [deletedStudent] = students.splice(index, 1);
  res.status(200).json({
    message: 'ลบข้อมูลนักศึกษาสำเร็จ',
    data: deletedStudent
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});