import { cn } from "@/lib/utils";
import macbookAir from "@/assets/macbook-air.png";
import macbookPro from "@/assets/macbook-pro.png";
import imac from "@/assets/imac.png";
import macMini from "@/assets/mac-mini.png";

interface ModelSelectionProps {
  deviceType: string;
  selectedModel: string;
  onSelect: (model: string) => void;
}

const DEVICE_MODELS = {
  tablet: [
    { id: "ipad-pro", name: "iPad Pro", image: imac },
    { id: "ipad-air", name: "iPad Air", image: macbookAir },
    { id: "ipad", name: "iPad", image: macbookPro },
    { id: "ipad-mini", name: "iPad Mini", image: macMini },
  ],
  phone: [
    { id: "iphone-15", name: "iPhone 15", image: imac },
    { id: "iphone-14", name: "iPhone 14", image: macbookAir },
    { id: "iphone-13", name: "iPhone 13", image: macbookPro },
    { id: "samsung-galaxy", name: "Samsung Galaxy", image: macMini },
  ],
  laptop: [
    { id: "macbook-air-15", name: "MacBook Air 15\"", image: macbookAir },
    { id: "macbook-air-13", name: "MacBook Air 13\"", image: macbookAir },
    { id: "macbook-pro-16", name: "MacBook Pro 16\"", image: macbookPro },
    { id: "macbook-pro-14", name: "MacBook Pro 14\"", image: macbookPro },
  ],
  computer: [
    { id: "imac", name: "iMac", image: imac },
    { id: "macbook-air", name: "MacBook Air", image: macbookAir },
    { id: "macbook-pro", name: "MacBook Pro", image: macbookPro },
    { id: "mac-mini", name: "Mac Mini", image: macMini },
  ],
  watch: [
    { id: "apple-watch-series-9", name: "Apple Watch Series 9", image: imac },
    { id: "apple-watch-se", name: "Apple Watch SE", image: macbookAir },
    { id: "apple-watch-ultra", name: "Apple Watch Ultra", image: macbookPro },
  ],
};

const ModelSelection = ({ deviceType, selectedModel, onSelect }: ModelSelectionProps) => {
  const models = DEVICE_MODELS[deviceType as keyof typeof DEVICE_MODELS] || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
      {models.map((model) => (
        <button
          key={model.id}
          onClick={() => onSelect(model.id)}
          className={cn(
            "group relative bg-white rounded-2xl p-6 border-2 transition-all duration-300",
            "hover:shadow-lg hover:scale-105",
            "focus:outline-none focus:ring-4 focus:ring-primary/20",
            {
              "border-primary shadow-md": selectedModel === model.id,
              "border-gray-200": selectedModel !== model.id,
            }
          )}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="w-24 h-24 flex items-center justify-center">
              <img 
                src={model.image} 
                alt={model.name}
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-lg font-semibold text-foreground text-center">{model.name}</h3>
          </div>
          
          {selectedModel === model.id && (
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
      ))}
    </div>
  );
};

export default ModelSelection;