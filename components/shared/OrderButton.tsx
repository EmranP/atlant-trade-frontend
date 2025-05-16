'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';
import TireOrderModal from '@/components/shared/tyreOrderModal';
import { useAuth } from '@/shared/hooks/useAuth';
import { getOrders, IOrders } from '@/api/order/order.api';
import { useError } from '@/shared/hooks/useError';

export default function OrderButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const [orders, setOrders] = useState<IOrders[]>([])
  const {error, setError} = useError('')

  useEffect(() => {
    if (!user?.id) {
      setError('User not auth')
      return
    }

    const loadOrders = async () => {
      try {
        const response = await getOrders(user.id, setError)

        if (!response?.length) {
          setError('Orders not have')
          return
        }

        setOrders(response)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something was wrong order button')
      }
    }

    loadOrders()
  }, [user?.id, setError])

  return (
    <div className='fixed bottom-8 right-8'>
      {user?.id ? (
        <>
          <TireOrderModal
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
          />
          <Button
            className='bg-black hover:bg-gray-800 cursor-pointer text-white rounded-full px-6 py-3 font-medium'
            onClick={() => setIsModalOpen(true)}
          >
            {!error ? 'ЗАЯВКА' : error}
            {orders.length > 0 && (
              <Badge className='ml-2 bg-red-600 w-4 h-4 rounded-full p-0 flex items-center justify-center'>
                {orders.length}
              </Badge>
            )}
          </Button>
          <TireOrderModal open={isModalOpen} onOpenChange={setIsModalOpen} />
        </>
      ) : (
        <Button
          className='bg-black hover:bg-gray-800 text-white rounded-full px-6 py-3 font-medium'
          disabled
        >
          ДЛЯ ЗАЯВКИ НУЖНО АВТОРИЗОВАТЬСЯ
        </Button>
      )}
    </div>
  );
}
