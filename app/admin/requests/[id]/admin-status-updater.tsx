"use client";

import { useState } from "react";
import { BatteryServiceStatus } from "@/types/battery-service";
import { updateAdminRequestStatus } from "@/app/admin/requests/[id]/actions";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export function AdminStatusUpdater({ 
  currentStatus, 
  requestId 
}: { 
  currentStatus: BatteryServiceStatus, 
  requestId: string 
}) {
  const [status, setStatus] = useState<BatteryServiceStatus>(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const handleUpdate = async () => {
    if (status === currentStatus) return;
    
    setIsUpdating(true);
    try {
      await updateAdminRequestStatus(requestId, status);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to update status");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <select 
        value={status}
        onChange={(e) => setStatus(e.target.value as BatteryServiceStatus)}
        disabled={isUpdating}
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
      >
        <option value="pending">Pending</option>
        <option value="processing">Processing</option>
        <option value="completed">Resolved (Completed)</option>
        <option value="cancelled">Cancelled</option>
      </select>
      
      <button
        onClick={handleUpdate}
        disabled={isUpdating || status === currentStatus}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500"
      >
        {isUpdating && <Loader2 className="h-4 w-4 animate-spin" />}
        {isUpdating ? "Updating..." : "Update Status"}
      </button>
    </div>
  );
}
