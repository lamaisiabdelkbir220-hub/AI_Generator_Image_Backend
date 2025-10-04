import { HEADSHOT_STYLES, HEADSHOT_ASPECT_RATIOS } from "@/lib/constants";

/**
 * Test endpoint to verify what the frontend should receive
 * This mimics the exact response structure
 */
export async function GET(req: Request) {
  try {
    // Simulate config response
    const configResponse = {
      message: 'Headshot configuration retrieved',
      data: {
        styles: HEADSHOT_STYLES.slice(0, 3).map(style => ({
          id: style.id,
          name: style.name,
          description: style.description,
          category: style.category,
          creditCost: style.creditCost,
          isPremium: style.isPremium
        })),
        aspectRatios: HEADSHOT_ASPECT_RATIOS,
      },
      statusCode: 200
    };

    return Response.json({
      message: "Test response for debugging frontend",
      backend_is_working: true,
      test_responses: {
        config: configResponse,
        generate_success: {
          message: "Headshot generated successfully",
          data: {
            url: "https://cdn.getimg.ai/generated/test-image.jpg",
            creditsUsed: 50,
            remainingCredits: 450,
            processingTime: 25,
            style: "Corporate Headshot"
          },
          statusCode: 200
        },
        generate_error_example: {
          message: "Headshot generation failed",
          data: {
            error: "parameter_invalid_base64"
          },
          statusCode: 400
        }
      },
      instructions: {
        1: "Check if your app can parse the 'config' response",
        2: "Verify you're reading data.styles correctly",
        3: "Verify you're reading data.aspectRatios correctly",
        4: "When generating, check if you're sending base64 correctly",
        5: "When receiving result, check if you're reading data.url correctly"
      },
      common_frontend_issues: {
        issue1: "Not checking response.data.statusCode === 200",
        issue2: "Not parsing response.data.styles as array",
        issue3: "Not sending image as base64 string with 'data:image/jpeg;base64,' prefix",
        issue4: "Not handling error responses (statusCode 400, 401, 402, 422, 500)",
        issue5: "Timeout issues - generation takes 20-60 seconds"
      },
      debugging_steps: [
        "1. Call this endpoint to verify backend is working",
        "2. Print the exact JSON response in your Flutter app",
        "3. Verify you can parse 'data.styles' array",
        "4. Convert image to base64 with proper prefix",
        "5. Send POST to /api/headshots/generate with Bearer token",
        "6. Wait at least 60 seconds for response",
        "7. Check if response.data.url exists"
      ]
    }, { status: 200 });

  } catch (error) {
    console.error("Test endpoint error:", error);
    return Response.json({
      error: "Test endpoint failed",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
