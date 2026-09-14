import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { imagekit } from "@/lib/imagekit";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: { code: "UNAUTHORIZED", message: "Unauthorized" } },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: { code: "BAD_REQUEST", message: "No file provided" } },
        { status: 400 }
      );
    }

    // Validation
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedMimeTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: { code: "VALIDATION_ERROR", message: "Invalid file type. Only JPG, PNG, and WEBP are allowed." } },
        { status: 400 }
      );
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: { code: "VALIDATION_ERROR", message: "File size exceeds 5MB limit." } },
        { status: 400 }
      );
    }

    // Prepare for upload
    const buffer = Buffer.from(await file.arrayBuffer());
    const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(7)}-${file.name.replace(/[^a-zA-Z0-9.]/g, "")}`;
    const folderPath = `/battery-services/${userId}/`;

    // Upload to ImageKit
    const uploadResponse = await new Promise((resolve, reject) => {
      imagekit.upload(
        {
          file: buffer,
          fileName: uniqueFileName,
          folder: folderPath,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
    });

    const result = uploadResponse as any;

    return NextResponse.json({
      success: true,
      data: {
        url: result.url,
        fileId: result.fileId,
        filePath: result.filePath,
      },
    });

  } catch (error: any) {
    console.error("Image upload error:", error);
    return NextResponse.json(
      { success: false, error: { code: "INTERNAL_SERVER_ERROR", message: "Failed to upload image" } },
      { status: 500 }
    );
  }
}
