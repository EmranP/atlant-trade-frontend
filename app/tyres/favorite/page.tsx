'use client'

import { getFavorite } from '@/api/favorite/favorite.api'
import FilterSelect from '@/components/shared/filterSelect'
import TyreCard from '@/components/shared/tyreCard'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/shared/hooks/useAuth'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export interface ITires {
  id: number
  name: string
  description: string
  price: number
  size: string
  load_index: string
  speed_index: string
  axis: string
  ply: string
  tread_depth: string
  seasonality: string
  manufacturer: string
  amount: number
  image: string
}

export default  function FavoriteTiresPage() {
  const { user } = useAuth();
  const [favoriteTires, setFavoriteTires] = useState<ITires[] | null>(null);
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getFavoriteHandler = async () => {
      const result = await getFavorite(user?.id);

      if (typeof result === 'string') {
        setError(result);
      } else {
        setFavoriteTires(result);
      }
    };

    if (user?.id) {
      getFavoriteHandler();
    }
  }, [user?.id])


  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8'>Избранный</h1>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-8'>
        <FilterSelect
          label='Ширина'
          options={[
            { label: 'Все', value: 'all' },
            { label: '295', value: '295' },
            { label: '315', value: '315' },
            { label: '385', value: '385' },
          ]}
        />

        <FilterSelect
          label='Высота'
          options={[
            { label: 'Все', value: 'all' },
            { label: '70', value: '70' },
            { label: '80', value: '80' },
            { label: '90', value: '90' },
          ]}
        />

        <FilterSelect
          label='Диаметр'
          options={[
            { label: 'Все', value: 'all' },
            { label: 'R22.5', value: 'r22.5' },
            { label: 'R19.5', value: 'r19.5' },
            { label: 'R17.5', value: 'r17.5' },
          ]}
        />

        <FilterSelect
          label='Ось'
          options={[
            { label: 'Все', value: 'all' },
            { label: 'Ведущая', value: 'drive' },
            { label: 'Рулевая', value: 'steer' },
            { label: 'Прицепная', value: 'trailer' },
          ]}
        />
      </div>

      {error && (
        <div className="w-full text-center">
          <h1 className="text-red-500">{error}</h1>
        </div>
      )}

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {favoriteTires && favoriteTires?.length ?
        favoriteTires?.map(tire => (
          <Link key={tire.id} href={`/tyres/favorite/${tire.id}`}>
            <TyreCard model={tire} />
          </Link>
        )) : !error ? (
          <h1 className='w-full col-span-3 text-3xl mx-auto text-center'>Избранных пока нету...</h1>
        ): null}
      </div>

      <div className='fixed bottom-8 right-8'>
        <Button className='bg-black hover:bg-gray-800 text-white rounded-full px-6 py-3 font-medium'>
          ЗАЯВКА
          <Badge className='ml-2 bg-red-600 w-4 h-4 rounded-full p-0 flex items-center justify-center'>
            1
          </Badge>
        </Button>
      </div>
    </div>
  )
}
