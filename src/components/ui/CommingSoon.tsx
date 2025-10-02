import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import { Button } from './Button'; // Corrected casing
import { Input } from './Input';   // Corrected casing

interface ComingSoonProps {
  title: string;
  description: string;
}

export default function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="p-8 bg-white rounded-xl shadow-md border border-gray-200 max-w-lg">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <WrenchScrewdriverIcon className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">{title} - Coming Soon!</h1>
        <p className="mt-3 text-gray-600">
          {description}
        </p>
        <div className="mt-6">
          {/* THE FIX IS HERE */}
          <p className="text-sm font-medium text-gray-700 mb-2">Get notified when it&apos;s ready:</p>
          <div className="flex gap-2">
            <Input type="email" placeholder="Enter your email" className="flex-1" />
            <Button>Notify Me</Button>
          </div>
        </div>
      </div>
    </div>
  );
}