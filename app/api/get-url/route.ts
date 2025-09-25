export async function GET(req: Request) {
  try {
    const host = req.headers.get('host');
    const protocol = req.headers.get('x-forwarded-proto') || 'http';
    const currentUrl = `${protocol}://${host}`;

    return Response.json({
      message: "Current Deployment URL Info",
      data: {
        host: host,
        protocol: protocol,
        currentUrl: currentUrl,
        recommendedApiBaseUrl: `https://${host}`
      },
      statusCode: 200
    });
  } catch (error) {
    return Response.json({
      message: "Error getting URL info",
      data: { error: error instanceof Error ? error.message : String(error) },
      statusCode: 500
    }, { status: 500 });
  }
}