'use client'

import { useAuth } from '@/shared/hooks/useAuth'
import { useError } from '@/shared/hooks/useError'
import { Button } from '@/components/ui/button'
import { usePathname, useRouter } from 'next/navigation'
import { createdFakeProducts } from '@/api/tyres/tyres.api'
import { FC } from 'react'

export const CreateFakeButtonClient:FC = () => {
  const { user } = useAuth()
  const { setError } = useError('')
  const router = useRouter()
  const pathname = usePathname()


  const handleClick = async () => {
    if (!user?.id) {
      router.push('/tyres')
      return
    }

    try {
      const res = await createdFakeProducts(user?.id, setError)

      if (!res?.message) {
        setError(res?.message || 'Ошибка при создании товаров')
        return
      }

      if (pathname !== '/tyres') {
        router.push('/tyres')
      }

      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Что-то пошло не так...')
    }
  }

  return (
    <div className='my-6 text-center'>
      <Button
        type='button'
        onClick={handleClick}
        disabled={!user}
        className={`px-12 py-6 bg-black text-white font-medium rounded-full transition-opacity ${
          !user
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-gray-800 cursor-pointer'
        }`}
      >
        {user?.id
          ? 'Создать фейковые продукты'
          : 'Вам нужно АВТОРИЗОВАТЬСЯ!'}
      </Button>
    </div>
  )
}
