window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("loading").style.display = "none";
        document.getElementById("content").style.display = "flex";
    }, 2000);
});

function download(format) {
    const url = document.getElementById("videoUrl").value;
    if (!url) return alert("Please enter a YouTube URL.");
    window.location.href = `/download?url=${encodeURIComponent(url)}&format=${format}`;
}
