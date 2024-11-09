require('dotenv').config();
const express = require('express');
const app = express();
const addressRoutes = require('./routes/address');
const cors = require('cors'); 

app.use(cors()); 

app.use(express.json());

app.use('/api/addresses', addressRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
