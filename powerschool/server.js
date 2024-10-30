const express = require("express");
const ytdl = require("ytdl-core");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});


app.get("/youtube", (req, res) => {
  res.send(`
    <h1>YouTube Proxy</h1>
    <form method="POST" action="/youtube">
      <p>URL: <input type="text" name="url" required></p>
      <p><input type="submit" value="GO"></p>
    </form>
  `);
});


app.post("/youtube", async (req, res) => {
  try {
    const url = req.body.url;
    if (!ytdl.validateURL(url)) return res.status(400).send("Invalid URL");

    const videoId = ytdl.getURLVideoID(url);
    res.redirect(`/youtube/${videoId}`); 
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing request");
  }
});


app.get("/youtube/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const info = await ytdl.getBasicInfo(id);

    res.render("video", { id, title: info.videoDetails.title });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching video info");
  }
});


app.get("/yt/v/:id", (req, res) => {
  const id = req.params.id;
  res.header("Content-Disposition", 'attachment; filename="video.mp4"');
  ytdl(id, { quality: "18" }).pipe(res);
});


app.listen(3000, () => console.log("Server is running on http://localhost:3000"));
