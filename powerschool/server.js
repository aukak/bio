const express = require('express');
const request = require('request');
const app = express();

app.use(express.static('public'));

app.get('/proxy', (req, res) => {
    const url = req.query.url;
    request(url).pipe(res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
