document.getElementById("fetchButton").addEventListener("click", async function() {
    const urlInput = document.getElementById("urlInput").value.trim();
    const resultDiv = document.getElementById("result");

    if (!urlInput) {
        resultDiv.textContent = "Please enter a URL.";
        resultDiv.classList.remove("hidden");
        return;
    }

    resultDiv.classList.add("hidden");

    try {
        const response = await fetch(`http://localhost:3000/proxy?url=${encodeURIComponent(urlInput)}`);
        if (!response.ok) {
            throw new Error('Failed to fetch data from the proxy.');
        }
        const data = await response.json();
        resultDiv.textContent = JSON.stringify(data, null, 2);
        resultDiv.classList.remove("hidden");
    } catch (error) {
        resultDiv.textContent = `Error: ${error.message}`;
        resultDiv.classList.remove("hidden");
    }
});
