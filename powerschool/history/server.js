const express = require('express');
const request = require('request');
const app = express();

app.use(express.static('public'));

app.get('/proxy', (req, res) => {
    const url = req.query.url;
    if (!url) {
        return res.status(400).send('URL is required');
    }
    request
        .get(url)
        .on('error', (err) => {
            console.error(err);
            res.status(500).send('Error while proxying request');
        })
        .pipe(res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
