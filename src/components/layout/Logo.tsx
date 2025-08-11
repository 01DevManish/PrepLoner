// src/components/layout/FinalMonogramLogo.tsx

export default function FinalMonogramLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="finalMonogramGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#4f46e5' }} /> {/* indigo-600 */}
          <stop offset="100%" style={{ stopColor: '#7c3aed' }} /> {/* violet-600 */}
        </linearGradient>
      </defs>
      
      {/* The background circle */}
      <circle cx="12" cy="12" r="11" fill="url(#finalMonogramGradient)" />
      
      {/* The letters 'P' and 'L' carved out with negative space */}
      <path
        d="M9.5 7V17H12M12 12H15.5C16.8807 12 18 10.8807 18 9.5C18 8.11929 16.8807 7 15.5 7H12"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}