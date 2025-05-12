import { ITires } from '@/app/tyres/page'
import { FAVORITE_API_URL } from '@/constants/api'
import { $api } from '@/lib/api.lib'

export const addFavorite = async (productId: number | string, userId: number) => {
  const res = await $api.post(`${FAVORITE_API_URL}/${productId}`, {userId: userId})

  if (res.status === 500 || 400) throw new Error('Ошибка при добавлении в избранное')
  return res.data
}

export const removeFavorite = async (productId: number | string, userId: number) => {
  const res = await $api.delete(`${FAVORITE_API_URL}/${productId}?userId=${userId}`)

  if (![200, 201].includes(res.status)) {
    throw new Error('Ошибка при удалении из избранного');
  }

  return res.data
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

