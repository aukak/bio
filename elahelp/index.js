const express = require("express");
const ytdl = require("ytdl-core");
const cors = require("cors");
const { default: NiconicoDL } = require("niconico-dl.js/dist");

const app = express();
app.use(cors());
app.use(express.raw({ type: "*/*" }));


process.on("uncaughtException", (err) => {
    console.log("Error:", err);
});


app.get("/", (req, res) => {
    res.send('<a href="/youtube/">YouTube Proxyはこちら</a><br><a href="/niconico/">ニコニコ動画 Proxyはこちら</a>');
});


app.get("/youtube", (req, res) => {
    res.send(`<h1>YouTube Proxy</h1><form method="POST" autocomplete="off">
        <p>URL：<input type="text" name="url"></p>
        <p><input type="submit" value="GO"></p>
    </form>`);
});


app.get("/niconico", (req, res) => {
    res.send(`<h1>NicoVideo Proxy</h1><form method="POST" autocomplete="off">
        <p>URL：<input type="text" name="url"></p>
        <p><input type="submit" value="GO"></p>
    </form>`);
});


app.post("/youtube", async (req, res) => {
    const url = decodeURIComponent(Buffer.from(req.body).toString()).split(";")[0].replace("url=", "");
    const videoId = ytdl.getURLVideoID(url);
    res.redirect(`/youtube/${videoId}`);
});


app.post("/niconico", async (req, res) => {
    const url = decodeURIComponent(Buffer.from(req.body).toString()).split(";")[0].replace("url=", "");
    const videoInfo = await new NiconicoDL(url).getVideoInfo();
    res.redirect(`/niconico/${videoInfo.id}`);
});


app.get("/youtube/:id", async (req, res) => {
    const id = req.params.id;
    const info = await ytdl.getBasicInfo(id);
    res.render("../views/video.ejs", { id, title: info.videoDetails.title });
});


app.get("/yt/v/:id", (req, res) => {
    const id = req.params.id;
    res.header("Content-Disposition", 'attachment; filename="video.mp4"');
    ytdl(id, { quality: "18" }).pipe(res);
});


app.get("/niconico/:id", async (req, res) => {
    const id = req.params.id;
    const videoInfo = await new NiconicoDL(`https://nicovideo.jp/watch/${id}`).getVideoInfo();
    res.render("../views/niconico.ejs", { id, title: videoInfo.title });
});


app.get("/nico/v/:id", async (req, res) => {
    const id = req.params.id;
    const nicoDL = new NiconicoDL(`https://nicovideo.jp/watch/${id}`);
    res.header("Content-Disposition", 'attachment; filename="video.mp4"');
    (await nicoDL.download()).pipe(res);
});

app.listen(3000, () => console.log("Server is running on port 3000"));
