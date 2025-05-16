import { ITires } from '@/app/tyres/page'
import { PRODUCTS_API_URL } from '@/constants/api'
import { $api } from '@/lib/api.lib'
import { Dispatch, SetStateAction } from 'react'

export const fetchProductsTyres = async (
	errorMessage: string | undefined
): Promise<ITires[] | string | null> => {
	try {
		const response = await $api.get<ITires[]>(PRODUCTS_API_URL)

		if (response.status !== 200) {
			throw new Error('Error response fetch products')
		}

		return response.data
	} catch (error) {
		if (error instanceof Error) {
			errorMessage = error.message
		} else {
			errorMessage = 'Something was wrong from fetch product ('
		}
		return errorMessage || null
	}
}

export const fetchProductsTyresById = async (
	id: string,
	setError: Dispatch<SetStateAction<string | null>>
): Promise<ITires | undefined> => {
	try {
		const response = await $api.get<ITires>(`/product/${id}`)

		if (response.status !== 200) {
			throw new Error('Error response fetch products')
		}

		return response.data
	} catch (error) {
		if (error instanceof Error) {
			setError(error.message)
		} else {
			setError('Something was wrong from fetch product (')
		}
	}
}


export const createdFakeProducts = async (userId: number | undefined, setError: Dispatch<SetStateAction<string | null>>):Promise<{message: string} | undefined> => {
	if (!userId) return

	try {
		const req = await $api.post<{message: string}>('/product')

		if (req.status !== 201) {
			throw new Error('Fake product not created')
		}

		return req.data
	} catch (err) {
		setError(err instanceof Error ? err.message : 'Something error from wrong')
	}
}
