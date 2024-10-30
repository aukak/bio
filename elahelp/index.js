const { default: NiconicoDL } = require("niconico-dl.js/dist");

//変数s
const express = require("express"), app = express(), ytdl = require("ytdl-core"), cors = require('cors'), { Buffer } = require("buffer"), fs = require("fs")
app.use(cors())
app.use(express.raw({ type: "*/*" }))

//エラーハンドリング
process.on("uncaughtException", function(err) {
  console.log(err);
});

app.get("/", (req, res) => {
  res.send('<a href="/youtube/">youtube proxyはこちら</a><br><a href="/niconico/">ニコニコ動画 proxyはこちら</a>')
})
app.get("/youtube", (req, res) => {
  res.send(`<h1>YouTube Proxy</h1><form method="POST" autocomplete="off">
    <p>URL：<input type="text" name="url"></p>
    <p><input type="submit" value="GO"></p>
  </form>`)
});
app.get("/niconico", (req, res) => {
  res.send(`<h1>NicoVideo Proxy</h1><form method="POST" autocomplete="off">
    <p>URL：<input type="text" name="url"></p>
    <p><input type="submit" value="GO"></p>
  </form>`)
})
app.post("/youtube", async (req, res) => {


  console.log(Buffer.from(req.body).toString())
  res.redirect(`/youtube/${ytdl.getURLVideoID(decodeURIComponent(Buffer.from(req.body).toString()).split(";")[0].replace("url=", ""))}`)
})

app.post("/niconico", async (req, res) => {
let id = (await new NiconicoDL(decodeURIComponent(Buffer.from(req.body).toString()).split(";")[0].replace("url=", "")).getVideoInfo()).id;

  console.log(Buffer.from(req.body).toString())
  res.redirect(`/niconico/${id}`)
})

app.get("/youtube/:id", async (req, res) => {
  var r = { id: req.params.id }
  var stream = await ytdl.getBasicInfo(req.params.id);

  var title = stream.videoDetails.title
  r.title = title
  res.render("../views/video.ejs", r)


})
app.get("/yt/v/:id", (req, res) => {
  var URL = req.params.id;
  var stream = ytdl(URL);
  stream.on('info', (info) => {
    res.header('Content-Disposition', 'attachment; filename="video.mp4"');
    ytdl(URL, {
      quality: '18',
    }).pipe(res);
  });
});

app.get("/niconico/:id", async (req, res) => {
  var r = { id: req.params.id };
  r.title = (await new NiconicoDL(`https://nicovideo.jp/watch/${r.id}`).getVideoInfo()).title;
  
  res.render("../views/niconico.ejs", r)


})
app.get("/nico/v/:id", async (req, res) => {
  var URL = `https://nicovideo.jp/watch/${req.params.id}`;
  let nico = new NiconicoDL(URL);
  res.header('Content-Disposition', 'attachment; filename="video.mp4"');
  (await nico.download()).pipe(res);
});

app.listen(3000)