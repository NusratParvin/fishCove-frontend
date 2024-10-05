import { AlertTriangle } from "lucide-react";

const ErrorNewsfeed = () => {
  return (
    <div className="flex items-center justify-center h-28 mt-24 w-2/3 mx-auto p-4 bg-red-50 border border-red-400 text-red-700 rounded-lg shadow-md">
      <AlertTriangle className="w-6 h-6 text-red-700 mr-3" />
      <div>
        <h2 className="font-bold text-lg mb-1">Error Loading Data !!!</h2>
        <p className="text-sm">Something went wrong. Please try again later.</p>
      </div>
    </div>
  );
};

export default ErrorNewsfeed;
