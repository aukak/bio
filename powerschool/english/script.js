const apiKey = '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';

async function generateResponse() {
    const question = document.getElementById("answerInput").value.trim();
    const chatDiv = document.getElementById("chat");

    if (!question) return;


    const userMessage = document.createElement("div");
    userMessage.className = "user";
    userMessage.textContent = question;
    chatDiv.appendChild(userMessage);

   
    document.getElementById("answerInput").value = "";


    try {
        const response = await fetch('', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({ prompt: question })
        });

        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        const botReply = data.response || "I'm not sure about that. Can you try asking differently?";

        // Display bot's response
        const botMessage = document.createElement("div");
        botMessage.className = "bot";
        botMessage.textContent = botReply;
        chatDiv.appendChild(botMessage);

    } catch (error) {
        console.error('Error fetching response:', error);
        const errorMessage = document.createElement("div");
        errorMessage.className = "bot";
        errorMessage.textContent = "Sorry, something went wrong. Please try again.";
        chatDiv.appendChild(errorMessage);
    }

    // Auto-scroll to the latest message
    chatDiv.scrollTop = chatDiv.scrollHeight;
}
