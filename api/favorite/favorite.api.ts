import { ITires } from '@/app/tyres/page'
import { FAVORITE_API_URL } from '@/constants/api'
import { $api } from '@/lib/api.lib'
import { Dispatch, SetStateAction } from 'react'

export const addFavorite = async (productId: number | string, userId: number, setError: Dispatch<SetStateAction<string | null>>, setIsFavorite: Dispatch<SetStateAction<boolean>>) => {
  try {
  const res = await $api.post(`${FAVORITE_API_URL}/${productId}`, {userId: userId})

  if (res.status === 500 || 400) setError('Ошибка при добавлении в избранное')

  setIsFavorite(true)
  return res.data
  } catch (err) {
    setError('Something was wrong ((')
  }
}

export const removeFavorite = async (productId: number | string, userId: number, setError: Dispatch<SetStateAction<string | null>>, setIsFavorite: Dispatch<SetStateAction<boolean>>) => {
  try {
  const res = await $api.delete(`${FAVORITE_API_URL}/${productId}?userId=${userId}`)

  if (![200, 201].includes(res.status)) {
    setError('Ошибка при удалении из избранного');
  }

  setIsFavorite(false)
  return res.data
  } catch (err) {
    setError('Something was wrong from favorite ((')
  }
}

export const getFavorite = async (userId: number | undefined): Promise<ITires[] | string> => {
  try {
    const res = await $api.post<ITires[]>(FAVORITE_API_URL, { userId });

    if (res.status >= 400) {
      throw new Error('Ошибка при получении избранных товаров');
    }

    return res.data;
  } catch (err) {
    if (err instanceof Error) {
      return err.message;
    } else {
      return 'Что-то пошло не так...';
    }
  }
};

