const express = require('express');
const app = express();

// Question 4
app.use(express.static('./public'));

// Question 6
app.all('*', (req, res) => {
    res.status(404).send('<h1>404! The page you requested is not found!</h1>');
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000...');
});