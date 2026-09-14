import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getBatteryServices, createBatteryService } from "@/lib/services/battery-service";
import { z } from "zod";

const createServiceSchema = z.object({
  customer_name: z.string().min(1, "Customer name is required"),
  phone_number: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(1, "Address is required"),
  battery_brand: z.string().min(1, "Battery brand is required"),
  battery_type: z.string().min(1, "Battery type is required"),
  battery_image_url: z.string().url().optional().nullable(),
  battery_image_file_id: z.string().optional().nullable(),
  battery_image_path: z.string().optional().nullable(),
});

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: { code: "UNAUTHORIZED", message: "Unauthorized" } },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const result = await getBatteryServices(userId, page, limit);

    return NextResponse.json({
      success: true,
      data: result.data,
      pagination: {
        page,
        limit,
        total: result.total,
      },
    });

  } catch (error: any) {
    console.error("GET battery services error:", error);
    return NextResponse.json(
      { success: false, error: { code: "INTERNAL_SERVER_ERROR", message: error?.message || "Failed to fetch battery services" } },
      { status: 500 }
    );
  }
}

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
    const validatedData = createServiceSchema.parse(body);

    const newService = await createBatteryService(userId, validatedData);

    return NextResponse.json(
      { success: true, data: newService },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("POST battery service error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: { code: "VALIDATION_ERROR", message: (error as any).errors[0].message } },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: { code: "INTERNAL_SERVER_ERROR", message: error?.message || "Failed to create battery service" } },
      { status: 500 }
    );
  }
}
