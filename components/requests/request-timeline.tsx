import { cn } from "@/lib/utils";
import { CheckCircle2, Circle, Clock, Check, Wrench } from "lucide-react";
import { BatteryServiceStatus, RequestStatusHistory } from "@/types/battery-service";

interface RequestTimelineProps {
  currentStatus: BatteryServiceStatus;
  history: RequestStatusHistory[];
  createdAt: string;
}

export function RequestTimeline({ currentStatus, history, createdAt }: RequestTimelineProps) {
  // Define the ordered steps
  const steps = [
    { id: "pending", label: "Submitted", icon: Clock, color: "text-blue-500", bg: "bg-blue-500", border: "border-blue-500" },
    { id: "processing", label: "Working", icon: Wrench, color: "text-orange-500", bg: "bg-orange-500", border: "border-orange-500" },
    { id: "completed", label: "Completed", icon: Check, color: "text-green-500", bg: "bg-green-500", border: "border-green-500" },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === currentStatus);
  const isCancelled = currentStatus === "cancelled";

  return (
    <div className="py-2 sm:py-6">
      <div className="relative">
        {/* Universal Horizontal Progress Bar (Background) */}
        <div className="absolute top-4 sm:top-5 left-4 sm:left-6 right-4 sm:right-6 h-1 bg-gray-100 rounded-full" />
        
        {/* Universal Horizontal Progress Bar (Active) */}
        {!isCancelled && currentStepIndex >= 0 && (
          <div 
            className="absolute top-4 sm:top-5 left-4 sm:left-6 h-1 bg-gradient-to-r from-emerald-400 to-green-500 transition-all duration-1000 ease-out rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"
            style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%`, maxWidth: 'calc(100% - 2rem)' }}
          >
            {/* Animated pulse effect on the active bar (stops when complete) */}
            {currentStepIndex < steps.length - 1 && (
              <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse" />
            )}
          </div>
        )}

        <div className="flex flex-row justify-between items-start gap-1 sm:gap-4 relative z-10 px-2 sm:px-0">
          {steps.map((step, index) => {
            const isCompleted = index <= currentStepIndex && !isCancelled;
            const isCurrent = index === currentStepIndex && !isCancelled;
            
            // For the first step, always use the main request createdAt. 
            // For others, look strictly in the history for that status update.
            const dateStr = index === 0 
              ? createdAt 
              : history.find(h => h.status === step.id)?.created_at;
            
            const Icon = step.icon;

            return (
              <div key={step.id} className="flex flex-col items-center gap-2 sm:gap-3 flex-1 text-center relative group">
                
                {/* Status Indicator */}
                <div className={cn(
                  "w-8 h-8 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shrink-0 border-2 transition-all duration-500 relative z-10 shadow-sm",
                  isCompleted 
                    ? cn(step.border, step.bg, "text-white scale-110 shadow-md") 
                    : "border-gray-200 bg-white text-gray-300",
                  isCurrent && currentStepIndex < steps.length - 1 && "ring-4 ring-opacity-30 animate-pulse",
                  isCurrent && currentStepIndex < steps.length - 1 && step.id === 'pending' ? 'ring-blue-500' : '',
                  isCurrent && currentStepIndex < steps.length - 1 && step.id === 'processing' ? 'ring-orange-500' : ''
                )}>
                  <Icon className={cn("w-3.5 h-3.5 sm:w-5 sm:h-5 transition-transform duration-500", isCompleted && "scale-110")} />
                </div>
                
                {/* Step Text & Subtext */}
                <div className="flex flex-col min-w-0 px-0.5 transform transition-all duration-500 translate-y-0 group-hover:-translate-y-1">
                  <h4 className={cn(
                    "text-[10px] sm:text-[15px] font-bold tracking-tight leading-tight transition-colors duration-300",
                    isCompleted ? "text-gray-900" : "text-gray-400"
                  )}>
                    {step.label}
                  </h4>
                  
                  {dateStr && isCompleted && (
                    <span className="text-[9px] sm:text-[12px] text-gray-500 font-medium mt-0.5 sm:mt-1 animate-in fade-in slide-in-from-top-1">
                      <span className="block">{new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      <span className="block text-gray-400">{new Date(dateStr).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span>
                    </span>
                  )}
                  
                  {!dateStr && !isCompleted && (
                    <span className="text-[9px] sm:text-[12px] text-gray-300 font-medium mt-0.5 sm:mt-1 hidden sm:block">
                      Upcoming
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {isCancelled && (
        <div className="mt-8 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
          <div className="p-1.5 bg-white rounded-full text-red-600 shrink-0 mt-0.5">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-red-900">Request Cancelled</h4>
            <p className="text-xs text-red-700 mt-1">This service request has been cancelled and will not be processed further.</p>
          </div>
        </div>
      )}
    </div>
  );
}
