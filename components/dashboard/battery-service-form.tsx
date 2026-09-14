"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from "@/components/dashboard/image-upload";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export function BatteryServiceForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [images, setImages] = useState<File[]>([]);
  const [batteryType, setBatteryType] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const customer_name = formData.get("name") as string;
    const phone_number = formData.get("phone") as string;
    const address = formData.get("address") as string;
    const battery_brand = formData.get("batteryName") as string;
    
    if (!batteryType) {
      toast.error("Please select a battery type.");
      setIsSubmitting(false);
      return;
    }

    try {
      let imageUrl = null;
      let imageFileId = null;
      let imagePath = null;

      // 1. Upload image if exists
      if (images.length > 0) {
        const imageFormData = new FormData();
        imageFormData.append("file", images[0]);
        
        const uploadRes = await fetch("/api/upload/battery-image", {
          method: "POST",
          body: imageFormData,
        });
        
        let uploadData;
        try {
          uploadData = await uploadRes.json();
        } catch (e) {
          throw new Error(`Server returned invalid response during upload (Status: ${uploadRes.status})`);
        }
        
        if (!uploadRes.ok) {
          throw new Error(uploadData?.error?.message || "Failed to upload image");
        }
        
        imageUrl = uploadData?.data?.url;
        imageFileId = uploadData?.data?.fileId;
        imagePath = uploadData?.data?.filePath;
      }

      // 2. Create service
      const createRes = await fetch("/api/battery-services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_name,
          phone_number,
          address,
          battery_brand,
          battery_type: batteryType,
          battery_image_url: imageUrl,
          battery_image_file_id: imageFileId,
          battery_image_path: imagePath,
        }),
      });

      let createData;
      try {
        createData = await createRes.json();
      } catch (e) {
        throw new Error(`Server returned invalid response during creation (Status: ${createRes.status})`);
      }
      
      if (!createRes.ok) {
        throw new Error(createData?.error?.message || "Failed to create service request");
      }

      toast.success("Service request submitted successfully!");
      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          
          {/* Left Column - Details */}
          <div className="flex-1 p-6 md:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Battery Details</h2>
            
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" placeholder="Enter your full name" required className="bg-gray-50/50" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
                    +91
                  </span>
                  <Input id="phone" name="phone" type="tel" placeholder="98765 43210" required className="pl-10 bg-gray-50/50" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea 
                  id="address" 
                  name="address"
                  placeholder="Enter complete pickup address" 
                  required 
                  className="min-h-[100px] resize-none bg-gray-50/50" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="batteryName">Battery Brand</Label>
                  <Input id="batteryName" name="batteryName" placeholder="e.g. Exide, Luminous" required className="bg-gray-50/50" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="batteryModel">Battery Type</Label>
                  <Select required onValueChange={(val: any) => setBatteryType(val || "")} value={batteryType}>
                    <SelectTrigger id="batteryModel" className="bg-gray-50/50">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lead-acid">Lead Acid (Tubular)</SelectItem>
                      <SelectItem value="lithium-ion">Lithium Ion</SelectItem>
                      <SelectItem value="gel">Gel Battery</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Images */}
          <div className="lg:w-[400px] xl:w-[480px] p-6 md:p-8 lg:p-10 bg-gray-50/30">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Battery Images</h2>
            <ImageUpload maxImages={1} onImagesChange={setImages} />
            <p className="text-xs text-gray-500 mt-4 text-center">
              Please upload at least 1 clear image of your battery.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-gray-100 bg-gray-50 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 text-center sm:text-left">
            Your information will only be used for this service request.
          </p>
          <div className="flex w-full sm:w-auto items-center gap-3">
            <button 
              type="button" 
              onClick={() => router.back()}
              className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="px-5 py-2.5 text-sm font-medium text-white bg-black border border-black rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-70 disabled:cursor-not-allowed w-full sm:w-auto flex items-center justify-center min-w-[140px]"
            >
              {isSubmitting ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                "Submit Request"
              )}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
