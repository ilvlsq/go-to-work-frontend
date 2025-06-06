import { useState, useRef, useEffect, ReactNode } from 'react';

interface AutocompleteInputProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  icon?: ReactNode;
  placeholder?: string;
  className?: string;
}

export default function AutocompleteInput({
  options,
  value,
  onChange,
  icon,
  placeholder,
  className = '',
}: AutocompleteInputProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(inputValue.toLowerCase()),
  );

  return (
    <div ref={ref} className={`relative w-full ${className}`} style={{ overflow: 'visible' }}>
      <div
        className="flex items-center rounded-3xl border border-gray-200 bg-white px-4 py-2 text-base shadow-none transition focus-within:ring-2 focus-within:ring-blue-100 hover:border-blue-200"
        style={{ minHeight: 48 }}
      >
        {icon && <span className="mr-2 text-xl text-gray-400">{icon}</span>}
        <input
          type="text"
          className="flex-1 border-none bg-transparent text-base outline-none placeholder:text-gray-400"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
        />
        {inputValue && (
          <button
            type="button"
            className="ml-2 text-gray-400 hover:text-blue-600 focus:outline-none"
            onClick={() => {
              setInputValue('');
              onChange('');
            }}
            tabIndex={-1}
            aria-label="Сбросить"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
      {open && filteredOptions.length > 0 && (
        <ul
          className="animate-fade-in absolute z-30 mt-2 max-h-80 w-full overflow-y-auto rounded-xl border border-gray-100 bg-white py-1 shadow-lg"
          style={{ maxHeight: 320, overflowY: 'auto' }}
        >
          {filteredOptions.map((option) => (
            <li
              key={option}
              className={`cursor-pointer px-4 py-2 text-base transition hover:bg-blue-50 ${option === value ? 'font-semibold text-blue-700' : ''}`}
              onClick={() => {
                setInputValue(option);
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
