import { ReactNode } from "react";

interface StepContainerProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

const StepContainer = ({ title, subtitle, children }: StepContainerProps) => {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{title}</h1>
        {subtitle && (
          <p className="text-lg text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  );
};

export default StepContainer;