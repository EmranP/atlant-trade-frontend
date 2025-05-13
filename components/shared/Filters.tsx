'use client';

import { useState } from 'react';
import FilterSelect from '@/components/shared/filterSelect';
import { ITires } from '@/app/tyres/page';

interface FiltersProps {
  tires: ITires[];
}

export default function Filters({ tires }: FiltersProps) {
  const [filters, setFilters] = useState({
    width: 'all',
    height: 'all',
    diameter: 'all',
    axis: 'all',
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredTires = tires.filter((tire) => {
    const widthMatch = filters.width === 'all' || tire.size.includes(filters.width);
    const heightMatch = filters.height === 'all' || tire.size.includes(filters.height);
    const diameterMatch = filters.diameter === 'all' || tire.size.includes(filters.diameter);
    const axisMatch = filters.axis === 'all' || tire.axis.toLowerCase() === filters.axis;
    return widthMatch && heightMatch && diameterMatch && axisMatch;
  });

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-8'>
        <FilterSelect
          label='Ширина'
          options={[
            { label: 'Все', value: 'all' },
            { label: '295', value: '295' },
            { label: '315', value: '315' },
            { label: '385', value: '385' },
          ]}
          value={filters.width}
          onChange={(value) => handleFilterChange('width', value)}
        />

        <FilterSelect
          label='Высота'
          options={[
            { label: 'Все', value: 'all' },
            { label: '70', value: '70' },
            { label: '80', value: '80' },
            { label: '90', value: '90' },
          ]}
          value={filters.height}
          onChange={(value) => handleFilterChange('height', value)}
        />

        <FilterSelect
          label='Диаметр'
          options={[
            { label: 'Все', value: 'all' },
            { label: 'R22.5', value: 'r22.5' },
            { label: 'R19.5', value: 'r19.5' },
            { label: 'R17.5', value: 'r17.5' },
          ]}
          value={filters.diameter}
          onChange={(value) => handleFilterChange('diameter', value)}
        />

        <FilterSelect
          label='Ось'
          options={[
            { label: 'Все', value: 'all' },
            { label: 'Ведущая', value: 'drive' },
            { label: 'Рулевая', value: 'steer' },
            { label: 'Прицепная', value: 'trailer' },
          ]}
          value={filters.axis}
          onChange={(value) => handleFilterChange('axis', value)}
        />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {!filteredTires.length && (
          <p className='block text-center col-span-3 my-5 text-orange-500'>Нет шин, соответствующих фильтрам</p>
        )}
      </div>
    </>
  );
}
