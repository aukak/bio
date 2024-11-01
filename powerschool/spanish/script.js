window.addEventListener("load", () => {
    const loadingElement = document.getElementById("loading");
    const contentElement = document.getElementById("content");

    setTimeout(() => {
        loadingElement.style.opacity = "0"; 
        setTimeout(() => {
            loadingElement.style.display = "none"; 
            contentElement.style.display = "flex"; 
            contentElement.classList.add("show"); 
        }, 500); 
    }, 2000); 

function download(format) {
    const url = document.getElementById("videoUrl").value;
    if (!url) return alert("Please enter a YouTube URL.");

    
    
    const downloadUrl = `/download?url=${encodeURIComponent(url)}&format=${format}`;

    
    fetch(downloadUrl)
        .then(response => {
            if (response.ok) {
                return response.blob();
            } else {
                throw new Error('Network response was not ok.');
            }
        })
        .then(blob => {
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = `download.${format}`; 
            link.click();
        })
        .catch(error => alert(error.message));
}
