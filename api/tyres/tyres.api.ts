import { ITires } from '@/app/tyres/page'
import { Dispatch, SetStateAction } from 'react'

export const fetchProductsTyres = async (
	url: string | undefined,
	errorMessage: string | undefined
): Promise<ITires[] | string | null> => {
	try {
		if (!url) return null

		const response = await fetch(url)

		if (!response.ok) {
			throw new Error('Error response fetch products')
		}

		const resultProducts: ITires[] = await response.json()

		return resultProducts
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
	url: string | undefined,
	id: string,
	setError: Dispatch<SetStateAction<string | null>>
): Promise<ITires | undefined> => {
	try {
		if (!url) return
		const response = await fetch(`${url}/${id}`)

		if (!response.ok) {
			throw new Error('Error response fetch products')
		}

		const result: ITires = await response.json()

		return result
	} catch (error) {
		if (error instanceof Error) {
			setError(error.message)
		} else {
			setError('Something was wrong from fetch product (')
		}
	}
}



