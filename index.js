const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let students = [
    { id: 1, name: 'Alice', course: 'React' },
    { id: 2, name: 'Bob', course: 'Node.js' }
];

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

app.get('/api/students', (req, res) => {
    res.json(students);
});

app.get('/api/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const student = students.find(s => s.id === studentId);

    if (!student) {
        return res.status(404).json({ error: 'Student not found' });
    }

    res.json(student);
});

app.post('/api/students', (req, res) => {
    const { name, course } = req.body;

    if (!name || !course) {
        return res.status(400).json({ error: 'Name and Course are required fields' });
    }

    const newStudent = {
        id: Date.now(),
        name, 
        course
    };

    students.push(newStudent);
    res.status(201).json(newStudent);
});

app.delete('/api/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const studentIndex = students.findIndex(s => s.id === studentId);

    if (studentIndex === -1) {
        return res.status(404).json({ error: 'Student not found' });
    }

    students.splice(studentIndex, 1);

    res.status(200).json({ message: `Student with ID ${studentId} deleted successfully` });
});

