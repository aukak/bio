document.getElementById("fetchButton").addEventListener("click", async function() {
    const urlInput = document.getElementById("urlInput").value.trim();
    const resultDiv = document.getElementById("result");

    if (!urlInput) {
        resultDiv.textContent = "Please enter a URL.";
        resultDiv.classList.remove("hidden");
        return;
    }

    resultDiv.textContent = "Fetching data...";
    resultDiv.classList.remove("hidden");

    try {
        const response = await fetch(`http://localhost:3000/proxy?url=${encodeURIComponent(urlInput)}`);
        if (!response.ok) {
            throw new Error('Failed to fetch data from the provided URL.');
        }
        const data = await response.json();
        resultDiv.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        resultDiv.textContent = `Error: ${error.message}`;
    }
});
