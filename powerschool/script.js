document.getElementById('loadVideo').addEventListener('click', async function() {
    const videoUrl = document.getElementById('videoUrl').value;
    const videoId = extractVideoId(videoUrl);
    if (videoId) {
        try {
            const response = await fetch(`/proxy?url=https://www.youtube.com/watch?v=${videoId}`);
            if (response.ok) {
                const blob = await response.blob();
                const videoPlayer = document.getElementById('videoPlayer');
                videoPlayer.src = URL.createObjectURL(blob);
            } else {
                alert('Error loading video');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error loading video');
        }
    } else {
        alert('Invalid YouTube URL');
    }
});

function extractVideoId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
}
