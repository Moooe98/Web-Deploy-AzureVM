import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// In-memory data store
let students = [
    { ID: 1, Name: "Mohamed Essam", Email: "mo849026@gmail.com" },
    { ID: 2, Name: "Ali Khaled", Email: "ali2443@gmail.com" }
];

let nextId = 3;

app.get('/', (req, res) => {
    res.json(students);
});

app.post('/student', (req, res) => {
    const newStudent = {
        ID: nextId++,
        Name: req.body.name,
        Email: req.body.email
    };
    students.push(newStudent);
    res.json(newStudent);
});

app.get('/read/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.ID === id);
    if (student) {
        res.json([student]);
    } else {
        res.status(404).json({ Message: "Student not found" });
    }
});

app.put('/update/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = students.findIndex(s => s.ID === id);
    if (index !== -1) {
        students[index] = { ...students[index], Name: req.body.name, Email: req.body.email };
        res.json(students[index]);
    } else {
        res.status(404).json({ Message: "Student not found" });
    }
});

app.delete('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = students.length;
    students = students.filter(s => s.ID !== id);
    if (students.length < initialLength) {
        res.status(204).send();
    } else {
        res.status(404).json({ Message: "Student not found" });
    }
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});