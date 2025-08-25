import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  currentStep: number;
  steps: string[];
}

const ProgressIndicator = ({ currentStep, steps }: ProgressIndicatorProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto mb-12">
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-300">
          <div 
            className="h-full bg-red-500 transition-all duration-500 ease-out"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>
        
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          
          return (
            <div key={step} className="flex flex-col items-center relative z-10">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300",
                  "border-2",
                  {
                    "bg-red-500 border-red-500 text-white": isCompleted || isActive,
                    "bg-white border-gray-300 text-gray-400": !isActive && !isCompleted,
                  }
                )}
              >
                {isCompleted ? "✓" : stepNumber}
              </div>
              <span
                className={cn(
                  "mt-3 text-sm font-medium transition-colors duration-300",
                  {
                    "text-foreground": isActive || isCompleted,
                    "text-muted-foreground": !isActive && !isCompleted,
                  }
                )}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;