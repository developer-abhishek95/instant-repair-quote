import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import ProgressIndicator from "./ProgressIndicator";
import StepContainer from "./StepContainer";
import DeviceCard from "./DeviceCard";

interface FormData {
  device: string;
  model: string;
  issue: string;
  location: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  quote: number;
}

const STEPS = ["Device", "Model", "Issue", "Location", "Quote"];

const DEVICES = [
  { id: "tablet", name: "Tablet", icon: "📱" },
  { id: "phone", name: "Phone", icon: "📞" },
  { id: "laptop", name: "Laptop", icon: "💻" },
  { id: "computer", name: "Computer", icon: "🖥️" },
];

const ISSUES = [
  "Screen Repair",
  "Battery Replacement", 
  "Water Damage",
  "Charging Port",
  "Software Issues",
  "Hardware Malfunction",
  "Other",
];

const QuoteForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    device: "",
    model: "",
    issue: "",
    location: "",
    name: "",
    email: "",
    phone: "",
    message: "",
    quote: 0,
  });
  
  const { toast } = useToast();

  const updateFormData = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateQuote = () => {
    // Simple quote calculation logic
    const basePrice = 50;
    const deviceMultiplier = {
      tablet: 1.2,
      phone: 1.0,
      laptop: 1.5,
      computer: 1.8,
    }[formData.device] || 1;
    
    const issueMultiplier = {
      "Screen Repair": 2.0,
      "Battery Replacement": 1.5,
      "Water Damage": 3.0,
      "Charging Port": 1.3,
      "Software Issues": 0.8,
      "Hardware Malfunction": 2.5,
      "Other": 1.0,
    }[formData.issue] || 1;

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
      case 3: return formData.issue !== "";
      case 4: return formData.location !== "";
      case 5: return formData.name && formData.email && formData.phone;
      default: return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepContainer title="Get Instant Price Quote" subtitle="Select your device">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
          <StepContainer title="Device Model" subtitle="Enter your device model">
            <div className="max-w-md mx-auto">
              <Label htmlFor="model">Model</Label>
              <Input
                id="model"
                value={formData.model}
                onChange={(e) => updateFormData("model", e.target.value)}
                placeholder="e.g., iPhone 13, iPad Pro, MacBook Air"
                className="mt-2"
              />
            </div>
          </StepContainer>
        );

      case 3:
        return (
          <StepContainer title="What's the Issue?" subtitle="Select the problem with your device">
            <div className="max-w-md mx-auto">
              <Label htmlFor="issue">Issue</Label>
              <Select value={formData.issue} onValueChange={(value) => updateFormData("issue", value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select an issue" />
                </SelectTrigger>
                <SelectContent>
                  {ISSUES.map((issue) => (
                    <SelectItem key={issue} value={issue}>
                      {issue}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
          <StepContainer title="Your Quote" subtitle="Enter your contact details to get the quote">
            <div className="max-w-md mx-auto space-y-6">
              <div className="bg-quote-background border border-quote-success/20 rounded-lg p-6 text-center">
                <h3 className="text-2xl font-bold text-quote-success mb-2">
                  Estimated Cost: ${formData.quote}
                </h3>
                <p className="text-sm text-muted-foreground">
                  For {formData.device} {formData.model} - {formData.issue}
                </p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => updateFormData("name", e.target.value)}
                    placeholder="Your full name"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    placeholder="your.email@example.com"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData("phone", e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="message">Additional Message (Optional)</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => updateFormData("message", e.target.value)}
                    placeholder="Any additional details about the issue..."
                    className="mt-1"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </StepContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <ProgressIndicator currentStep={currentStep} steps={STEPS} />
      
      {renderStep()}
      
      <div className="max-w-md mx-auto mt-12 flex gap-4">
        {currentStep > 1 && (
          <Button variant="outline" onClick={handleBack} className="flex-1">
            Back
          </Button>
        )}
        
        {currentStep < 5 ? (
          <Button 
            onClick={handleNext} 
            disabled={!canProceed()}
            className="flex-1"
          >
            Next
          </Button>
        ) : (
          <Button 
            onClick={handleSubmit}
            disabled={!canProceed()}
            className="flex-1"
          >
            Submit Quote Request
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuoteForm;