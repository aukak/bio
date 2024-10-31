document.getElementById("fetchButton").addEventListener("click", async function() {
    const urlInput = document.getElementById("urlInput").value.trim();
    const resultFrame = document.getElementById("resultFrame");
    const resultDiv = document.getElementById("result");

    if (!urlInput) {
        resultDiv.textContent = "Please enter a URL.";
        resultDiv.classList.remove("hidden");
        return;
    }

    resultDiv.classList.add("hidden");
    resultFrame.classList.remove("hidden");

    try {
        const response = await fetch('/proxy', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: urlInput
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data from the proxy.');
        }

        const data = await response.text();
        const blob = new Blob([data], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        resultFrame.src = url;
    } catch (error) {
        resultDiv.textContent = `Error: ${error.message}`;
        resultDiv.classList.remove("hidden");
        resultFrame.classList.add("hidden");
    }
});
