import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getBatteryServiceById, updateBatteryService, deleteBatteryService } from "@/lib/services/battery-service";
import { z } from "zod";

const updateServiceSchema = z.object({
  customer_name: z.string().min(1, "Customer name is required").optional(),
  phone_number: z.string().min(10, "Phone number must be at least 10 digits").optional(),
  address: z.string().min(1, "Address is required").optional(),
  battery_brand: z.string().min(1, "Battery brand is required").optional(),
  battery_type: z.string().min(1, "Battery type is required").optional(),
  battery_image_url: z.string().url().optional().nullable(),
  battery_image_file_id: z.string().optional().nullable(),
  battery_image_path: z.string().optional().nullable(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { success: false, error: { code: "UNAUTHORIZED", message: "Unauthorized" } },
        { status: 401 }
      );
    }
    
    // In Next.js 15+ we need to await params or deal with it carefully, assuming Next.js 15.
    const { id } = await params;

    const service = await getBatteryServiceById(id, userId);

    if (!service) {
      return NextResponse.json(
        { success: false, error: { code: "NOT_FOUND", message: "Battery service not found" } },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: service });

  } catch (error: any) {
    console.error("GET battery service by id error:", error);
    return NextResponse.json(
      { success: false, error: { code: "INTERNAL_SERVER_ERROR", message: "Failed to fetch battery service" } },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { success: false, error: { code: "UNAUTHORIZED", message: "Unauthorized" } },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await req.json();
    const validatedData = updateServiceSchema.parse(body);

    const updatedService = await updateBatteryService(id, userId, validatedData);

    if (!updatedService) {
      return NextResponse.json(
        { success: false, error: { code: "NOT_FOUND", message: "Battery service not found or access denied" } },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedService });

  } catch (error: any) {
    console.error("PATCH battery service error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: { code: "VALIDATION_ERROR", message: (error as any).errors[0].message } },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: { code: "INTERNAL_SERVER_ERROR", message: "Failed to update battery service" } },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { success: false, error: { code: "UNAUTHORIZED", message: "Unauthorized" } },
        { status: 401 }
      );
    }

    const { id } = await params;
    
    // Check if it exists before soft delete
    const service = await getBatteryServiceById(id, userId);
    if (!service) {
      return NextResponse.json(
        { success: false, error: { code: "NOT_FOUND", message: "Battery service not found or access denied" } },
        { status: 404 }
      );
    }

    // Using soft delete (cancelling the service) as requested instead of hard deleting
    const deleted = await deleteBatteryService(id, userId, false);
    
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: { code: "INTERNAL_SERVER_ERROR", message: "Failed to delete battery service" } },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: null });

  } catch (error: any) {
    console.error("DELETE battery service error:", error);
    return NextResponse.json(
      { success: false, error: { code: "INTERNAL_SERVER_ERROR", message: "Failed to delete battery service" } },
      { status: 500 }
    );
  }
}
