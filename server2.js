import express from "express";
const app = express();
const PORT = 2000;

app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Server is running normally'
    });
});

app.get('/api/formula1', (req, res) => {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);
con

    if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) {
        return res.status(400).json({ 
            error: 'กรุณาส่งพารามิเตอร์ query a และ b เป็นตัวเลขที่มากกว่า 0' 
        });
    }

    const result = Math.PI * (3 * (a + b) - Math.sqrt((3 * a + b) * (a + 3 * b)));

    res.json({
        formula: "Ramanujan's Ellipse Perimeter (ความยาวเส้นรอบวงรี)",
        semiMajorAxis_a: a,
        semiMinorAxis_b: b,
        result: Number(result.toFixed(4))
    });
});

app.get('/api/formula2/:R/:r', (req, res) => {
    const R = parseFloat(req.params.R);
    const r = parseFloat(req.params.r);

    if (isNaN(R) || isNaN(r) || R <= 0 || r <= 0) {
        return res.status(400).json({ 
            error: 'กรุณาส่งพารามิเตอร์ path R และ r เป็นตัวเลขที่มากกว่า 0' 
        });
    }

    const result = 4 * Math.pow(Math.PI, 2) * R * r;

    res.json({
        formula: 'Torus Surface Area (พื้นที่ผิวทรงโดนัท)',
        majorRadius_R: R,
        minorRadius_r: r,
        result: Number(result.toFixed(4))
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});