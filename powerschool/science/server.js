export async function onRequest(context) {
    const { request } = context;
    const url = new URL(request.url);
    const targetUrl = url.searchParams.get('url');

    if (!targetUrl) {
        return new Response('URL parameter is required', { status: 400 });
    }

    try {
        const response = await fetch(targetUrl);
        const data = await response.text();

        return new Response(data, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', 
            },
            status: response.status,
        });
    } catch (error) {
        return new Response('Failed to fetch data', { status: 500 });
    }
}
