import { cn } from "@/lib/utils";

interface DeviceCardProps {
  device: {
    id: string;
    name: string;
    image: string;
  };
  isSelected: boolean;
  onSelect: (deviceId: string) => void;
}

const DeviceCard = ({ device, isSelected, onSelect }: DeviceCardProps) => {
  return (
    <button
      onClick={() => onSelect(device.id)}
      className={cn(
        "group relative bg-white rounded-2xl p-8 border-2 transition-all duration-300",
        "hover:shadow-lg hover:scale-105",
        "focus:outline-none focus:ring-4 focus:ring-primary/20",
        {
          "border-primary shadow-md": isSelected,
          "border-gray-200": !isSelected,
        }
      )}
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="w-20 h-20 flex items-center justify-center">
          <img 
            src={device.image} 
            alt={device.name}
            className="w-full h-full object-contain"
          />
        </div>
        <h3 className="text-lg font-semibold text-foreground">{device.name}</h3>
      </div>
      
      {isSelected && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
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
  );
};

export default DeviceCard;