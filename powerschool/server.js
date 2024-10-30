const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/proxy', async (req, res) => {
  const videoId = req.query.id;
  if (!videoId) return res.status(400).send('Video ID required');
  
  try {
    const response = await fetch(`https://www.youtube.com/get_video_info?video_id=${videoId}`);
    if (!response.ok) throw new Error('Network response was not ok');
    
    const text = await response.text();
    res.set('Content-Type', 'text/plain');
    res.send(text);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching video info');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
