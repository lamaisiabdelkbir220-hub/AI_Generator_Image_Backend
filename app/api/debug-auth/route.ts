import { userSchema } from "@/lib/validator";

export async function POST(req: Request) {
    try {
        const rawData = await req.json();
        console.log("Raw request data:", rawData);
        
        const validationResult = userSchema.safeParse(rawData);
        console.log("Validation result:", validationResult);
        
        if (!validationResult.success) {
            console.log("Validation errors:", validationResult.error.issues);
            return Response.json({
                message: "Validation failed",
                data: null,
                statusCode: 422,
                errors: validationResult.error.issues
            }, { status: 422 });
        }
        
        return Response.json({
            message: "Validation passed!",
            data: validationResult.data,
            statusCode: 200
        }, { status: 200 });
        
    } catch (error) {
        console.log("Error:", error);
        return Response.json({
            message: "Error processing request",
            data: null,
            statusCode: 500,
            error: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}