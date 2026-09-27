import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createBusinessPlanRequest, getAllBusinessPlanRequests } from "@/lib/services/business-plan-service";
import { z } from "zod";

const createPlanSchema = z.object({
  plan_name: z.string().min(1, "Plan name is required"),
  business_name: z.string().min(1, "Business name is required"),
  reason: z.string().optional(),
  phone_number: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(1, "Address is required"),
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: { code: "UNAUTHORIZED", message: "Unauthorized" } },
        { status: 401 }
      );
    }

    const body = await req.json();
    const validatedData = createPlanSchema.parse(body);

    const newRequest = await createBusinessPlanRequest(userId, {
      ...validatedData,
      reason: validatedData.reason || "",
    });

    return NextResponse.json(
      { success: true, data: newRequest },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("POST business plan error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: { code: "VALIDATION_ERROR", message: (error as any).errors[0].message } },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: { code: "INTERNAL_SERVER_ERROR", message: error?.message || "Failed to submit plan request" } },
      { status: 500 }
    );
  }
}
