const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

connectDB(); 
app.use('/api/users', userRoutes); 

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});


