export async function onRequest(context) {
    const { request } = context;
    const url = new URL(request.url);
    const targetUrl = url.searchParams.get('url');

    if (!targetUrl) {
        return new Response('URL parameter is required', { status: 400 });
    }

    try {
        const response = await fetch(targetUrl, {
            method: request.method,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
                ...Object.fromEntries(request.headers),
            },
            redirect: 'follow',
        });

        const data = await response.text(); 

        return new Response(data, {
            headers: {
                'Content-Type': response.headers.get('Content-Type') || 'text/html',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'no-cache',
            },
            status: response.status,
        });
    } catch (error) {
        console.error('Error fetching data:', error.message);
        return new Response('Failed to fetch data', { status: 500 });
    }
}
