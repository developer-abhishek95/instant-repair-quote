import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import ProgressIndicator from "./ProgressIndicator";
import StepContainer from "./StepContainer";
import DeviceCard from "./DeviceCard";
import ModelSelection from "./ModelSelection";
import IssueSelection from "./IssueSelection";
import QuoteStep from "./QuoteStep";
import tabletImage from "@/assets/tablet.png";
import phoneImage from "@/assets/phone.png";
import laptopImage from "@/assets/laptop.png";
import computerImage from "@/assets/computer.png";
import watchImage from "@/assets/watch.png";

interface FormData {
  device: string;
  model: string;
  issues: string[];
  location: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  quote: number;
}

const STEPS = ["Device", "Model", "Issue", "Location", "Quote"];

const DEVICES = [
  { id: "tablet", name: "Tablet", image: tabletImage },
  { id: "computer", name: "Computer", image: computerImage },
  { id: "watch", name: "Apple Watch", image: watchImage },
];

const QuoteForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    device: "",
    model: "",
    issues: [],
    location: "",
    name: "",
    email: "",
    phone: "",
    message: "",
    quote: 0,
  });
  
  const { toast } = useToast();

  const updateFormData = (field: keyof FormData, value: string | number | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateQuote = () => {
    // Simple quote calculation logic
    const basePrice = 50;
    const deviceMultiplier = {
      tablet: 1.2,
      computer: 1.8,
      watch: 1.3,
    }[formData.device] || 1;
    
    const issueMultiplier = formData.issues.length > 0 ? 
      formData.issues.reduce((total, issue) => {
        const multipliers = {
          "battery": 1.5,
          "data-recovery": 3.0,
          "diagnostic": 0.8,
          "does-not-boot": 2.5,
          "hard-drive": 2.0,
          "overheats": 1.3,
        };
        return total + (multipliers[issue as keyof typeof multipliers] || 1.0);
      }, 0) : 1;

    const quote = Math.round(basePrice * deviceMultiplier * issueMultiplier);
    updateFormData("quote", quote);
    return quote;
  };

  const handleNext = () => {
    if (currentStep === 4) {
      generateQuote();
    }
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleIssuesContinue = () => {
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleSubmit = async () => {
    // Here you would typically send data to your backend
    toast({
      title: "Quote Request Submitted!",
      description: "We'll contact you soon with more details.",
    });
    
    // Reset form or redirect
    console.log("Form submitted:", formData);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return formData.device !== "";
      case 2: return formData.model !== "";
      case 3: return formData.issues.length > 0;
      case 4: return formData.location !== "";
      case 5: return formData.name && formData.email && formData.phone;
      default: return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepContainer title="Select your device">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {DEVICES.map((device) => (
                <DeviceCard
                  key={device.id}
                  device={device}
                  isSelected={formData.device === device.id}
                  onSelect={(deviceId) => updateFormData("device", deviceId)}
                />
              ))}
            </div>
          </StepContainer>
        );

      case 2:
        return (
          <StepContainer title="Get Instant Price Quote" subtitle={`${formData.device} > Select your device category`}>
            <ModelSelection
              deviceType={formData.device}
              selectedModel={formData.model}
              onSelect={(model) => updateFormData("model", model)}
            />
          </StepContainer>
        );

      case 3:
        return (
          <StepContainer title="Get Instant Price Quote" subtitle="Select your repair issues">
            <IssueSelection
              selectedIssues={formData.issues}
              onSelectionChange={(issues) => updateFormData("issues", issues)}
              onContinue={handleIssuesContinue}
            />
          </StepContainer>
        );

      case 4:
        return (
          <StepContainer title="Your Location" subtitle="Enter your city or area">
            <div className="max-w-md mx-auto">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => updateFormData("location", e.target.value)}
                placeholder="e.g., New York, London, Sydney"
                className="mt-2"
              />
            </div>
          </StepContainer>
        );

      case 5:
        return (
          <QuoteStep
            formData={formData}
            onFormDataChange={(field, value) => updateFormData(field as keyof FormData, value)}
            onSubmit={handleSubmit}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <ProgressIndicator currentStep={currentStep} steps={STEPS} />
      
      {renderStep()}
      
      {currentStep < 5 && currentStep !== 3 && (
        <div className="max-w-md mx-auto mt-12 flex gap-4">
          {currentStep > 1 && (
            <Button variant="outline" onClick={handleBack} className="flex-1">
              Back
            </Button>
          )}
          
          <Button 
            onClick={handleNext} 
            disabled={!canProceed()}
            className="flex-1"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuoteForm;