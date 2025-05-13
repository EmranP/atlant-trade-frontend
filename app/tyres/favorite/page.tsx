'use client'

import { getFavorite } from '@/api/favorite/favorite.api'
import Filters from '@/components/shared/Filters'
import OrderButton from '@/components/shared/OrderButton'
import TyreCard from '@/components/shared/tyreCard'
import { Button } from '@/components/ui/button'
import { Loader } from '@/components/ui/Loader'
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
  const [favoriteTires, setFavoriteTires] = useState<ITires[]>([]);
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getFavoriteHandler = async () => {
      try {
        setIsLoading(true)
      const result = await getFavorite(user?.id);

      if (typeof result === 'string') {
        setError(result);
      } else {
        setFavoriteTires(result);
      }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Bad Reqeust')
      } finally {
        setIsLoading(false)
      }
    };

    if (user?.id) {
      getFavoriteHandler();
    }
  }, [user?.id])


  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      {/* Увеличены отступы для лучшего восприятия */}
      <h1 className='text-3xl sm:text-4xl font-bold mb-8 text-gray-900'>
        Избранное
      </h1>

      {user?.id ? (
        <>
          <Filters tires={favoriteTires} />

          <div className='grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {isLoading ? (
              <div className='col-span-full flex justify-center items-center h-64'>
                <Loader size={40} />
              </div>
            ) : error ? (
              <div className='col-span-full text-center py-12'>
                <h2 className='text-xl text-red-500 font-medium'>{error}</h2>
              </div>
            ) : favoriteTires.length > 0 ? (
              favoriteTires.map((tire) => (
                <Link key={tire.id} href={`/tyres/favorite/${tire.id}`}>
                  <TyreCard model={tire} />
                </Link>
              ))
            ) : (
              <div className='col-span-full text-center py-12'>
                <h2 className='text-2xl text-gray-600 font-medium'>
                  Избранных шин пока нет
                </h2>
                <p className='text-gray-500 mt-2'>
                  Добавьте шины в избранное, чтобы они появились здесь.
                </p>
                <Link href='/tyres'>
                  <Button className='mt-4 bg-black text-white hover:bg-gray-800'>
                    Перейти к каталогу
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <OrderButton  />
        </>
      ) : (
        <div className='col-span-full text-center py-12'>
          <h2 className='text-2xl text-gray-600 font-medium'>
            Авторизуйтесь, чтобы увидеть избранное
          </h2>
        </div>
      )}
    </div>
  )
}
