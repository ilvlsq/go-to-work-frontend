import { useState, useRef, useEffect, ReactNode } from 'react';

interface Option {
  id: string | number;
  label: string;
}

interface MultiAutocompleteInputProps {
  options: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
  icon?: ReactNode;
  placeholder?: string;
  className?: string;
}

export default function MultiAutocompleteInput({
  options,
  value,
  onChange,
  icon,
  placeholder,
  className = '',
}: MultiAutocompleteInputProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
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

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(inputValue.toLowerCase()),
  );

  const isSelected = (option: Option) => value.some((v) => v.id === option.id);

  const handleSelect = (option: Option) => {
    if (isSelected(option)) {
      onChange(value.filter((v) => v.id !== option.id));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <div ref={ref} className={`relative w-full ${className}`} style={{ overflow: 'visible' }}>
      <div
        className="flex min-h-[48px] items-center rounded-3xl border border-gray-200 bg-white px-4 py-2 text-base shadow-none transition focus-within:ring-2 focus-within:ring-blue-100 hover:border-blue-200"
        onClick={() => setOpen(true)}
        tabIndex={0}
        style={{ cursor: 'pointer' }}
      >
        {icon && <span className="mr-2 text-xl text-gray-400">{icon}</span>}
        <div className="flex flex-1 flex-wrap gap-1">
          {value.length > 0 ? (
            value.map((v) => (
              <span
                key={v.id}
                className="mb-1 mr-1 flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm text-blue-700 shadow-sm"
              >
                {v.label}
                <button
                  type="button"
                  className="ml-2 text-blue-400 hover:text-blue-700 focus:outline-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(value.filter((item) => item.id !== v.id));
                  }}
                  aria-label="Удалить скилл"
                >
                  ×
                </button>
              </span>
            ))
          ) : (
            <span className="select-none text-gray-400">{placeholder}</span>
          )}
        </div>
      </div>
      {open && (
        <div
          className="animate-fade-in absolute z-30 mt-2 max-h-80 w-full overflow-y-auto rounded-xl border border-gray-100 bg-white py-1 shadow-lg"
          style={{ maxHeight: 320, overflowY: 'auto' }}
        >
          <div className="px-3 pb-2">
            <input
              type="text"
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-base outline-none placeholder:text-gray-400"
              placeholder="Пошук..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              autoFocus
            />
          </div>
          <ul>
            {filteredOptions.length === 0 && (
              <li className="px-4 py-2 text-gray-400">Нічого не знайдено</li>
            )}
            {filteredOptions.map((option) => (
              <li
                key={option.id}
                className={`flex cursor-pointer items-center gap-2 px-4 py-2 text-base transition hover:bg-blue-50 ${isSelected(option) ? 'bg-blue-50 font-semibold text-blue-700' : ''}`}
                onClick={() => handleSelect(option)}
              >
                <input
                  type="checkbox"
                  checked={isSelected(option)}
                  readOnly
                  className="accent-blue-500"
                  tabIndex={-1}
                />
                <span>{option.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
