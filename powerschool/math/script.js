let intervalId;
let countdown;
let lastPrice;

document.getElementById('get-stock').addEventListener('click', async () => {
    const symbol = document.getElementById('stock-symbol').value.toUpperCase();
    if (!symbol) return;

    const apiKey = 'cshdtb1r01qu99bfutagcshdtb1r01qu99bfutb0';
    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            console.error('HTTP error:', response.status, response.statusText);
            document.getElementById('stock-info').innerText = 'Error fetching stock data';
            document.getElementById('chart-container').style.display = 'none';
            return;
        }
        
        const data = await response.json();

        if (data.error) {
            document.getElementById('stock-info').innerText = 'Stock not found';
            document.getElementById('chart-container').style.display = 'none';
            return;
        }

        lastPrice = data.c;

        document.getElementById('stock-info').innerHTML = `
            <h2>${symbol}</h2>
            <p>Current Price: $<span id="current-price">${data.c}</span></p>
            <p id="countdown-message">Next update in: <span id="countdown">5</span> seconds</p>
        `;

        document.getElementById('chart-container').style.display = 'block';
        const stockIframe = document.getElementById('stockIframe');
        stockIframe.src = `https://www.tradingview.com/widgetembed/?frameElementId=tradingview_e0304&symbol=NASDAQ%3A${symbol}&interval=D&hidesidetoolbar=1&theme=dark`;

        if (intervalId) clearInterval(intervalId);
        countdown = 5;
        document.getElementById('countdown').innerText = countdown;
        intervalId = setInterval(() => {
            countdown--;
            document.getElementById('countdown').innerText = countdown;

            if (countdown <= 0) {
                updateStockPrice(symbol);
                countdown = 5;
            }
        }, 1000);
    } catch (error) {
        console.error('Error fetching stock data:', error);
        document.getElementById('stock-info').innerText = 'Error fetching stock data';
        document.getElementById('chart-container').style.display = 'none';
    }
});

async function updateStockPrice(symbol) {
    const apiKey = 'cshdtb1r01qu99bfutagcshdtb1r01qu99bfutb0';
    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            document.getElementById('stock-info').innerText = 'Stock not found';
            return;
        }

        if (data.c !== lastPrice) {
            lastPrice = data.c;
            document.getElementById('current-price').innerText = data.c;
        }
    } catch (error) {
        console.error('Error fetching stock data:', error);
    }
}
