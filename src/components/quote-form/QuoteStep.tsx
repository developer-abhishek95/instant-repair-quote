import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface QuoteStepProps {
  formData: {
    device: string;
    model: string;
    issues: string[];
    location: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    quote: number;
  };
  onFormDataChange: (field: string, value: string) => void;
  onSubmit: () => void;
}

const QuoteStep = ({ formData, onFormDataChange, onSubmit }: QuoteStepProps) => {
  const [contactMethod, setContactMethod] = useState("sms");

  const canSubmit = formData.name && formData.email && formData.phone;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left side - Contact Form */}
        <div>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Let us know where to send your instant quote!
            </h2>
          </div>

          <div className="space-y-6">
            {/* Contact Method Selection */}
            <div>
              <Label className="text-base font-medium mb-4 block">Contact Method</Label>
              <RadioGroup value={contactMethod} onValueChange={setContactMethod} className="flex space-x-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sms" id="sms" />
                  <label htmlFor="sms" className="text-sm font-medium">SMS Text (Instant)</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="email" id="email" />
                  <label htmlFor="email" className="text-sm font-medium">Email (Instant)</label>
                </div>
              </RadioGroup>
            </div>

            {/* Name */}
            <div>
              <Label htmlFor="name" className="text-base font-medium">Name*</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => onFormDataChange("name", e.target.value)}
                placeholder="Enter your name"
                className="mt-2"
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-base font-medium">Email*</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => onFormDataChange("email", e.target.value)}
                placeholder="Enter your email"
                className="mt-2"
              />
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone" className="text-base font-medium">Phone Number*</Label>
              <div className="flex mt-2">
                <div className="flex items-center px-3 bg-gray-100 border border-r-0 rounded-l-md">
                  <img src="/api/placeholder/20/15" alt="IN" className="w-5 h-3 mr-2" />
                  <span className="text-sm">+91</span>
                </div>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => onFormDataChange("phone", e.target.value)}
                  placeholder="98234 56789"
                  className="rounded-l-none"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <Label htmlFor="message" className="text-base font-medium">Message (Optional)</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => onFormDataChange("message", e.target.value)}
                placeholder="Enter your message"
                className="mt-2"
                rows={4}
              />
            </div>

            {/* Submit Button */}
            <Button 
              onClick={onSubmit}
              disabled={!canSubmit}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 text-lg font-medium"
            >
              Send me the quote →
            </Button>
          </div>
        </div>

        {/* Right side - Quote Information */}
        <div>
          <div className="bg-white rounded-lg border p-6 sticky top-8">
            <h3 className="text-xl font-bold text-foreground mb-6">Quote Information</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium text-muted-foreground">Device:</span>
                <span className="font-semibold">{formData.device}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-muted-foreground">Model:</span>
                <span className="font-semibold">{formData.model}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-muted-foreground">Problem:</span>
                <span className="font-semibold">{formData.issues.join(", ")}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-muted-foreground">Timeframe:</span>
                <span className="font-semibold">-</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-muted-foreground">Warranty:</span>
                <span className="font-semibold">-</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-muted-foreground">Problem:</span>
                <span className="font-semibold">Does Not Boot</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-muted-foreground">Timeframe:</span>
                <span className="font-semibold">-</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-muted-foreground">Warranty:</span>
                <span className="font-semibold">-</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-muted-foreground">Description:</span>
                <span className="font-semibold text-sm">Most computer repairs can be completed in 48 hours, but some may take longer depending on the part to required and diagnostic done. Let us have your computer and see what reliable turnaround time!</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t">
              <h4 className="font-bold text-lg mb-4">Selected Store</h4>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold">CV</span>
                </div>
                <h5 className="font-bold">Computer Village</h5>
                <p className="text-sm text-muted-foreground">
                  1140 South Dixie<br />
                  Highway, Coral<br />
                  Gables, FL USA<br />
                  305-667-7400
                </p>
                <Button variant="outline" size="sm" className="mt-3 text-red-500 border-red-500">
                  Change
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteStep;