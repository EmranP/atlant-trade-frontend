'use client'

import {
  fetchProductsTyresById,
} from '@/api/tyres/tyres.api'
import TireOrderModal from '@/components/shared/tyreOrderModal'
import { Button } from '@/components/ui/button'
import { APPLICATION_API_URL, PRODUCTS_API_URL } from '@/constants/api'
import { ChevronLeft, Heart, Minus, Plus } from 'lucide-react'
import Image from 'next/image'
import { use, useEffect, useState } from 'react'
import { ITires } from '../page'
import { getOrders, IOrders } from '@/api/order/order.api'
import { addFavorite, getFavorite, removeFavorite } from '@/api/favorite/favorite.api'
import { useAuth } from '@/shared/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useError } from '@/shared/hooks/useError'

interface IPage {
  params: Promise<{
    id: string
  }>
}

export default function FavoriteTireProductDetail({ params }: IPage) {
  const [orderProductData, setOrderProductData] = useState<IOrders[]>([]);
  const [dataTireProduct, setDataTireProduct] = useState<ITires | undefined | null>(null);
  const [quantity, setQuantity] = useState<number>(1); // Инициализируем количеством 1
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = use(params);
  const { user } = useAuth();
  const router = useRouter();
  const { error, setError } = useError('');


  useEffect(() => {
    const getProduct = async () => {
      const data = await fetchProductsTyresById(PRODUCTS_API_URL, id, setError);

      if (data) {
        setDataTireProduct(data);
        setQuantity(data.amount || 1); // Устанавливаем количество из данных продукта или 1
      }

    };

    const getOrder = async () => {
      const orderData = await getOrders(user?.id, APPLICATION_API_URL, setError);

      if (orderData && typeof orderData !== 'string') {
        setOrderProductData(orderData);
      }
    };

    getProduct();
    getOrder();
  }, [id, user?.id, setError]);

  useEffect(() => {
    const checkIsFavorite = async () => {
      if (!user?.id || !id) return;

      try {
        const favorites = await getFavorite(user.id);
        if (Array.isArray(favorites)) {
          const isFav = favorites.some((item) => item.id === Number(id));
          setIsFavorite(isFav);
        }
      } catch (err) {
        console.error('Ошибка при проверке избранного:', err);
      }
    };

    checkIsFavorite();
  }, [user?.id, id]);


  const products = [
    { label: 'Размер', value: dataTireProduct?.size },
    { label: 'Индекс нагрузки', value: dataTireProduct?.load_index },
    { label: 'Индекс скорости', value: dataTireProduct?.speed_index },
    { label: 'Ось', value: dataTireProduct?.axis },
    { label: 'Слойность', value: dataTireProduct?.ply },
    { label: 'Глубина протектора', value: dataTireProduct?.tread_depth },
    { label: 'Сезонность', value: dataTireProduct?.seasonality },
    { label: 'Производитель', value: dataTireProduct?.manufacturer },
  ]

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };


  const toggleFavoriteHandler = async () => {
    if (!user?.id) return;

    try {
      if (isFavorite) {
        await removeFavorite(id, user.id);

      } else {
        await addFavorite(id, user.id);
      }
      window.location.reload()
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error('Ошибка при изменении избранного:', err);
      setError('Ошибка при изменении избранного');
    }
  };

  const handleAddToOrder = () => {
    if (!user?.id) {
      setError('Для добавления в заявку нужно авторизоваться');
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      <div className='mb-8'>
        <Button
          variant='ghost'
          className='flex items-center cursor-pointer text-black hover:bg-gray-100'
          onClick={() => router.back()}
        >
          <ChevronLeft className='mr-1 h-4 w-4' />
          Назад
        </Button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div className='flex flex-col gap-12 items-center justify-center'>
          <h1 className='text-3xl md:text-4xl font-bold'>
            {dataTireProduct?.name}
          </h1>
          <div className='w-full max-w-lg'>
            <Image
              width={100}
              height={100}
              src='/images/tyre1.png'
              alt='DRC D721 315/80 R22.5 Tire'
              className='w-full object-contain'
            />
          </div>
        </div>

        <div>
          <div className='flex justify-end items-center mb-6 w-full'>
            <Button
              variant='outline'
              className={`rounded-full cursor-pointer p-2 bg-gray-100`}
              onClick={toggleFavoriteHandler}
            >
              <Heart
                className={`h-6 w-6 ${
                  isFavorite ? 'fill-black stroke-black' : 'stroke-black'
                }`}
              />
              <span className=''>В Избранное</span>
            </Button>
          </div>

          <div className='mb-8'>
            <p className='text-4xl font-bold'>{dataTireProduct?.price} ₽</p>
          </div>
          {error && (<h1 className='text-2xl font-bold my-5 text-red-500'>{error}</h1>)}
          <div className='mb-8 max-w-lg'>
            {products.map((product, index) => (
              <div key={index} className='flex justify-between py-3'>
                <p className='text-gray-700'>{product.label}</p>
                <p className='font-medium'>{product.value}</p>
              </div>
            ))}
          </div>

          <div className='flex flex-col sm:flex-row items-center gap-4'>
            {user?.id ? (
              <>
                <Button
                  className='w-full rounded-full sm:w-auto bg-red-700 hover:bg-red-800 text-white font-medium py-6 px-16 cursor-pointer'
                  onClick={handleAddToOrder}
                >
                  ДОБАВИТЬ В ЗАЯВКУ
                </Button>
                <div className='flex items-center'>
                  <Button
                    variant='outline'
                    className='h-12 w-12 cursor-pointer rounded-full border-2 border-gray-300'
                    onClick={handleDecrease}
                  >
                    <Minus className='h-4 w-4' />
                  </Button>

                  <span className='mx-4 text-lg font-medium min-w-12 text-center'>{quantity}</span>

                  <Button
                    variant='outline'
                    className='h-12 w-12 cursor-pointer rounded-full border-2 border-gray-300'
                    onClick={handleIncrease}
                  >
                    <Plus className='h-4 w-4' />
                  </Button>

                  <span className='ml-4 text-lg'>шт</span>
                </div>
              </>
            ) : (
              <Button
                className='w-full rounded-full sm:w-auto bg-red-700 hover:bg-red-800 text-white font-medium py-6 px-16'
                disabled
              >
                ДЛЯ ДОБАВЛЕНИЯ В ЗАЯВКУ НУЖНО АВТОРИЗОВАТЬСЯ
              </Button>
            )}

          </div>
        </div>
      </div>
      {user?.id ? (
        <>
          <TireOrderModal
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
            initialTireId={Number(id)} // Передаем ID продукта
            initialQuantity={quantity} // Передаем количество
          />
          <div className='fixed bottom-8 right-8'>
            <Button
              className='bg-black hover:bg-gray-800 text-white rounded-full px-8 py-3 font-medium text-lg'
              onClick={() => setIsModalOpen(true)}
            >
              ЗАЯВКА
              {orderProductData.length > 0 && (
                <span className='ml-2 bg-red-600 w-4 h-4 rounded-full flex items-center justify-center text-xs'>
                  {orderProductData.length}
                </span>
              )}
            </Button>
          </div>
        </>
      ) : (
        <div className='fixed bottom-8 right-8'>
          <Button
            className='bg-black hover:bg-gray-800 text-white rounded-full px-8 py-3 font-medium text-lg'
            disabled
          >
            ДЛЯ ЗАЯВКИ НУЖНО АВТОРИЗОВАТЬСЯ
          </Button>
        </div>
      )}
    </div>
  )
}
