import { Loader2 } from 'lucide-react';

const LoadingOverlay = ({ message = "Removing Background..." }) => {
    return (
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center rounded-2xl transition-all duration-300">
            <Loader2 className="h-12 w-12 text-indigo-600 animate-spin mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 animate-pulse">{message}</h3>
            <p className="text-gray-500 mt-2 text-sm">This usually takes just a few seconds.</p>
        </div>
    );
};

export default LoadingOverlay;
