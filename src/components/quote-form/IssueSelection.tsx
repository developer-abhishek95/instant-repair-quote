import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import batteryIcon from "@/assets/battery-icon.png";
import dataRecoveryIcon from "@/assets/data-recovery-icon.png";
import diagnosticIcon from "@/assets/diagnostic-icon.png";
import powerIcon from "@/assets/power-icon.png";
import harddriveIcon from "@/assets/harddrive-icon.png";
import overheatIcon from "@/assets/overheat-icon.png";

interface IssueSelectionProps {
  selectedIssues: string[];
  onSelectionChange: (issues: string[]) => void;
  onContinue: () => void;
}

const REPAIR_ISSUES = [
  { id: "battery", name: "Battery", icon: batteryIcon },
  { id: "data-recovery", name: "Data Recovery", icon: dataRecoveryIcon },
  { id: "diagnostic", name: "Diagnostic", icon: diagnosticIcon },
  { id: "does-not-boot", name: "Does Not Boot", icon: powerIcon },
  { id: "hard-drive", name: "Hard Drive", icon: harddriveIcon },
  { id: "overheats", name: "Overheats", icon: overheatIcon },
];

const IssueSelection = ({ selectedIssues, onSelectionChange, onContinue }: IssueSelectionProps) => {
  const toggleIssue = (issueId: string) => {
    if (selectedIssues.includes(issueId)) {
      onSelectionChange(selectedIssues.filter(id => id !== issueId));
    } else {
      onSelectionChange([...selectedIssues, issueId]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <p className="text-lg text-muted-foreground mb-6">
          Select one or more repairs and then press the "continue" button
        </p>
        <Button 
          onClick={onContinue}
          disabled={selectedIssues.length === 0}
          className="mb-8 bg-red-500 hover:bg-red-600 text-white px-8 py-2 rounded-lg"
        >
          Continue →
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {REPAIR_ISSUES.map((issue) => (
          <button
            key={issue.id}
            onClick={() => toggleIssue(issue.id)}
            className={cn(
              "group relative bg-white rounded-2xl p-8 border-2 transition-all duration-300",
              "hover:shadow-lg hover:scale-105",
              "focus:outline-none focus:ring-4 focus:ring-primary/20",
              {
                "border-red-500 shadow-md": selectedIssues.includes(issue.id),
                "border-gray-200": !selectedIssues.includes(issue.id),
              }
            )}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 flex items-center justify-center">
                <img 
                  src={issue.icon} 
                  alt={issue.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-foreground text-center">{issue.name}</h3>
            </div>
            
            {selectedIssues.includes(issue.id) && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default IssueSelection;