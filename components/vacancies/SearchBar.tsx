'use client';

import { useEffect, useState } from 'react';
import Dropdown from '@/components/ui/Dropdown';
import AutocompleteInput from '@/components/ui/AutocompleteInput';
import MultiAutocompleteInput from '@/components/ui/MultiAutocompleteInput';
import { FiSearch, FiMapPin, FiCpu, FiTool, FiStar } from 'react-icons/fi';
import Button from '../ui/Button';
import { getCities, getExperiences, getTypes, getSkills } from '@/services/autocompleteService';

interface Option {
  id: string | number;
  label: string;
}

interface Experience {
  id: number;
  experience: string;
}

interface SearchBarProps {
  initialQuery?: string;
  initialCity?: string;
  onSearch?: (filters: {
    searchQuery?: string;
    location?: string;
    jobType?: number;
    experience?: string;
    skillIds?: string[];
  }) => void;
}

export default function SearchBar({
  initialQuery = '',
  initialCity = '',
  onSearch,
}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [city, setCity] = useState(initialCity);
  const [experience, setExperience] = useState('');
  const [type, setType] = useState<number>();
  const [selectedSkills, setSelectedSkills] = useState<Option[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [cities, setCities] = useState<string[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [types, setTypes] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);

  useEffect(() => {
    setQuery(initialQuery);
    setCity(initialCity);
  }, [initialQuery, initialCity]);

  useEffect(() => {
    getCities().then(setCities);
    getExperiences().then((data) => setExperiences(data || []));
    getTypes().then((data) => setTypes(data || []));
    getSkills().then((data) => setSkills(data || []));
  }, []);

  const handleSearch = () => {
    if (!onSearch) return;

    const params = {
      searchQuery: query || undefined,
      location: city || undefined,
      jobType: type || undefined,
      experience: experience || undefined,
      skillIds: selectedSkills.length > 0 ? selectedSkills.map((s) => String(s.id)) : undefined,
    };

    // Удаляем все undefined значения
    Object.keys(params).forEach((key) => {
      if (params[key as keyof typeof params] === undefined) {
        delete params[key as keyof typeof params];
      }
    });

    onSearch(params);
  };

  return (
    <div className="flex w-full flex-col items-center">
      <h1 className="mb-8 text-center text-3xl font-bold">Пошук вакансій в Україні</h1>
      <form
        className="flex w-full max-w-4xl items-center gap-0 rounded-[40px] bg-white px-4 py-2 shadow-lg"
        style={{ boxShadow: '0 8px 32px 0 rgba(60, 60, 100, 0.07)' }}
      >
        <div className="flex flex-1 items-center">
          <FiSearch className="mr-3 text-2xl text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Професія"
            className="flex-1 border-none bg-transparent text-lg outline-none placeholder:text-gray-400"
            style={{ minWidth: 120 }}
          />
        </div>
        <div className="mx-4 h-8 w-px bg-gray-200" />
        <div className="flex min-w-[180px] items-center">
          <Dropdown
            options={cities}
            value={city}
            onChange={setCity}
            icon={<FiMapPin />}
            placeholder="Місто"
            className="min-w-0 border-none bg-transparent px-0 py-0 shadow-none"
          />
        </div>
        <Button
          type="button"
          variant="secondary"
          size="medium"
          className="ml-2 px-8"
          onClick={handleSearch}
          disabled={isLoading}
        >
          {isLoading ? 'Пошук...' : 'Пошук'}
        </Button>
      </form>
      <div className="mt-4 w-full max-w-4xl">
        <button
          type="button"
          className="mx-auto mb-4 flex items-center gap-2 text-lg font-semibold text-gray-700 hover:underline focus:outline-none"
          onClick={() => setShowAdvanced((v) => !v)}
        >
          Розширений пошук
          <svg
            className={`h-5 w-5 transition-transform duration-300 ${showAdvanced ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div
          className={`grid grid-cols-1 gap-4 transition-all duration-500 md:grid-cols-2 lg:grid-cols-3 ${showAdvanced ? 'max-h-[1000px] opacity-100' : 'pointer-events-none max-h-0 opacity-0'}`}
          style={{ gridAutoRows: 'minmax(0, 1fr)' }}
        >
          <AutocompleteInput
            options={experiences.map((e) => e.experience)}
            value={experiences.find((e) => String(e.id) === experience)?.experience || ''}
            onChange={(value) => {
              const exp = experiences.find((e) => e.experience === value);
              setExperience(exp ? String(exp.id) : '');
            }}
            icon={<FiStar />}
            placeholder="Досвід"
            className="mb-2"
          />
          <AutocompleteInput
            options={types.map((t) => t.name)}
            value={types.find((t) => Number(t.id) === type)?.name || ''}
            onChange={(value) => {
              const type = types.find((t) => t.name === value);
              setType(type ? Number(type.id) : 0);
            }}
            icon={<FiCpu />}
            placeholder="Тип"
            className="mb-2"
          />
          <MultiAutocompleteInput
            options={skills.map((s) => ({ id: s.id, label: s.name }))}
            value={selectedSkills}
            onChange={setSelectedSkills}
            icon={<FiTool />}
            placeholder="Скіли"
            className="mb-2"
          />
        </div>
      </div>
    </div>
  );
}
