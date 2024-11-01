document.getElementById('loadVideo').addEventListener('click', function() {
    const videoUrl = document.getElementById('videoUrl').value;
    const videoId = extractVideoId(videoUrl);
    if (videoId) {
        const videoPlayer = document.getElementById('videoPlayer');
        videoPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    } else {
        alert('Invalid YouTube URL');
    }
});

function extractVideoId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
}