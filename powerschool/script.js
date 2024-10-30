document.getElementById('loadVideo').addEventListener('click', function() {
    const videoUrl = document.getElementById('videoUrl').value;
    const videoId = extractVideoId(videoUrl);
    const loadingScreen = document.getElementById('loading'); 

    if (videoId) {
        const videoPlayer = document.getElementById('videoPlayer');
        
      
        loadingScreen.style.display = 'flex'; 
        loadingScreen.classList.remove('hide-loading'); 
        
      
        videoPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        
      
        videoPlayer.onload = function() {
            loadingScreen.classList.add('hide-loading'); 
            setTimeout(() => {
                loadingScreen.style.display = 'none'; 
            }, 500); 
        };
    } else {
        alert('Invalid YouTube URL');
    }
});

function extractVideoId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
}
