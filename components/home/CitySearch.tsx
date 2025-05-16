'use client';

import Button from '@/components/ui/Button';
import UkraineMap from '@/components/ui/UkraineMap';
import { useState, useRef } from 'react';

export default function CitySearch() {
  const [city, setCity] = useState('');
  const [tooltip, setTooltip] = useState<{ x: number; y: number; region: string } | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const handleRegionClick = (region: string) => {
    setCity(region);
  };

  const handleRegionHover = (x: number, y: number, region: string) => {
    const container = mapContainerRef.current;
    if (container) {
      const rect = container.getBoundingClientRect();
      x = x - rect.left;
      y = y - rect.top;
      setTooltip({ x, y, region });
    }
  };

  const handleRegionLeave = () => {
    setTooltip(null);
  };

  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 pb-0 pt-4 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-8 text-center">
          <p className="mb-2 text-lg text-[#8CA3A3]">Вибір за вами!</p>
          <h2 className="text-3xl font-bold sm:text-4xl">Знайдіть своє місто!</h2>
        </div>

        <div className="mx-auto max-w-3xl">
          <div className="mb-12 flex items-center rounded-[20px] bg-white p-1.5 shadow-lg">
            <div className="relative flex flex-1 items-center">
              <svg
                className="absolute left-4 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Професія"
                className="w-full bg-transparent py-1.5 pl-12 pr-4 text-sm text-gray-600 placeholder-gray-400 outline-none"
              />
            </div>
            <div className="mx-2 h-5 w-px bg-gray-200"></div>
            <div className="relative flex flex-1 items-center">
              <svg
                className="absolute left-4 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Місто"
                className="w-full bg-transparent py-1.5 pl-12 pr-4 text-sm text-gray-600 placeholder-gray-400 outline-none"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <Button variant="secondary" size="small" className="ml-2 px-6">
              Пошук
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between lg:flex-row">
          <div
            ref={mapContainerRef}
            className="relative mx-auto flex h-[500px] w-full items-center justify-center"
          >
            <UkraineMap
              onRegionHover={handleRegionHover}
              onRegionLeave={handleRegionLeave}
              onRegionClick={handleRegionClick}
            />
            {tooltip && (
              <div
                className="pointer-events-none absolute z-20 rounded border bg-white px-2 py-1 text-sm text-black shadow"
                style={{ top: tooltip.y + 12, left: tooltip.x + 12, whiteSpace: 'nowrap' }}
              >
                {tooltip.region}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
