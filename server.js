const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3500;

//cross origin resource sharing
app.use(cors());

//middleware to handle static files
app.use('/', express.static(path.join(__dirname, '/public')));

app.get('^/$|/home', (req, res) =>{
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));