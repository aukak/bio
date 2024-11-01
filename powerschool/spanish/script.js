document.getElementById('downloadBtn').addEventListener('click', async function () {
    const urlInput = document.getElementById('url');
    const url = urlInput.value.trim();
    const resultDiv = document.getElementById('result');

  
    resultDiv.innerHTML = '';

   
    if (!validateYouTubeUrl(url)) {
        resultDiv.innerHTML = "Please enter a valid YouTube URL.";
        return;
    }

    
    showLoading(resultDiv);

    try {
        
        const videoData = await fetchVideoData(url);

       
        await new Promise(resolve => setTimeout(resolve, 2000));

       
        displayDownloadOptions(resultDiv, videoData);
    } catch (error) {
        resultDiv.innerHTML = "Error: " + error.message;
    }
});


function validateYouTubeUrl(url) {
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    return regex.test(url);
}


function showLoading(container) {
    container.innerHTML = "Processing your download...";
    const loader = document.createElement('div');
    loader.classList.add('loader');
    container.appendChild(loader);
}


async function fetchVideoData(url) {

    const videoData = {
        title: "Download Ways:",
        formats: [
            { format: 'MP4', size: '20MB', url: 'video.mp4' },
            { format: 'MP3', size: '5MB', url: 'audio.mp3' }
        ]
    };
    return videoData;
}


function displayDownloadOptions(container, videoData) {
    container.innerHTML = `<h2>${videoData.title}</h2>`;
    videoData.formats.forEach(format => {
        const link = document.createElement('a');
        link.href = format.url;
        link.download = `${videoData.title}.${format.format.toLowerCase()}`;
        link.innerHTML = `Download ${format.format} (${format.size})`;
        link.classList.add('download-link');
        container.appendChild(link);
        container.appendChild(document.createElement('br'));
    });
}
