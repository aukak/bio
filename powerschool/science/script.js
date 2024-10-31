document.getElementById("fetchButton").addEventListener("click", async function() {
    const urlInput = document.getElementById("urlInput").value;
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
            throw new Error('Error fetching data');
        }
        const data = await response.json();
        resultDiv.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        resultDiv.textContent = `Error: ${error.message}`;
    }
});
