import { useState, useRef, useEffect, ReactNode } from 'react';

interface DropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
  icon?: ReactNode;
  placeholder?: string;
}

export default function Dropdown({
  options,
  value,
  onChange,
  label,
  className = '',
  icon,
  placeholder,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {label && <span className="mr-2 min-w-max font-medium text-gray-600">{label}</span>}
      <button
        type="button"
        className="flex w-full items-center gap-2 rounded-3xl border border-gray-200 bg-transparent px-4 py-2 text-base shadow-none transition hover:border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-100"
        onClick={() => setOpen((v) => !v)}
        style={{ minHeight: 48 }}
      >
        {icon && <span className="text-xl text-gray-400">{icon}</span>}
        <span className={`truncate text-left ${!value ? 'text-gray-400' : ''}`}>
          {value || placeholder}
        </span>
        <svg
          className={`ml-2 h-4 w-4 transition-transform ${open ? 'rotate-180' : ''} text-gray-400`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <ul className="animate-fade-in absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-xl border border-gray-100 bg-white py-1 shadow-lg">
          {options.map((option) => (
            <li
              key={option}
              className={`cursor-pointer px-4 py-2 text-base transition hover:bg-blue-50 ${option === value ? 'font-semibold text-blue-700' : ''}`}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
