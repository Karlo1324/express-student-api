const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174'] })); 
app.use(express.json());

// In-memory data store
let students = [
    { id: 1, name: 'Alice', course: 'React' },
    { id: 2, name: 'Bob', course: 'Node.js' }
];

// Routes`
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

// Mock user database for demo
const users = [
    { email: 'alice@student.edu', password: 'alice123', name: 'Alice Chen' },
    { email: 'bob@student.edu', password: 'bob123', name: 'Bob Smith' },
];

// Login endpoint for frontend auth
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user in mock database
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Mock user data (don't return password)
    const { password: _, ...safeUser } = user;
    const token = 'mock-jwt-token-' + Date.now();

    res.json({ token, user: safeUser });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});