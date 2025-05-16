import { ITires } from "@/app/tyres/page"
import { APPLICATION_API_URL, PRODUCTS_API_URL } from "@/constants/api"
import { $api } from "@/lib/api.lib"
import { Dispatch, SetStateAction } from "react"

export interface IOrders {
	id?: number
	amounts: number[]
	productIds: number[]
	firstName: string
	tel: string
	region: string
	email: string
	message: string
	type: string
	user: {
		id: number | undefined
		email: string
	}
	createdAt?: Date | string
}

export const getOrders = async (
	userId: number | undefined,
	setError: Dispatch<SetStateAction<string | null>>
): Promise<IOrders[] | undefined> => {
	try {
		const response = await $api.get<IOrders[]>(`${APPLICATION_API_URL}?userId=${userId}`)

		if (response.status !== 200) {
			throw new Error('Error response fetch products')
		}

		return response.data
	} catch (error) {
		if (error instanceof Error) {
			setError(error.message)
		} else {
			setError('Something was wrong from fetch order (')
		}
	}
}

export const createdOrders = async (
	userId: number | undefined,
	data: IOrders,
	setError: Dispatch<SetStateAction<string | null>>
): Promise<IOrders | undefined> => {
	try {
		const newOrderData = await $api.post<IOrders>(`${APPLICATION_API_URL}?userId=${userId}`, data)

		if (newOrderData.status !== 201) {
			throw new Error('Error where created order')
		}

		return newOrderData.data
	} catch (error) {
		if (error instanceof Error) {
			setError( error.message)
		} else {
			setError('Something was wrong from fetch order (')
		}
	}
}

// New req getProducts

export const getProducts = async (setError: Dispatch<SetStateAction<string | null>>):Promise<ITires[] | undefined> => {
	try {
		const response = await $api.get<ITires[]>(PRODUCTS_API_URL)

		if (response.status !== 200) {
			throw new Error('Error form get order products')
		}

		return response.data
	} catch (error) {
		setError(error instanceof Error ? error.message : 'Something was wrong')
	}
}
