const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

mongoose.connect('mongodb://localhost:27017/pantryfy', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.error('MongoDB error:', err));

app.use(cors());
app.use(express.json());

// Auth Routes
const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});