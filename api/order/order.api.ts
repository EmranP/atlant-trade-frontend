export interface IOrders {
	id: number
	productIds: number[]
	firstName: string
	tel: string
	region: string
	email: string
	message: string
	type: string
	user: {
		id: number
		email: string
	}
	createdAt: Date | string
}

export const fetchOrders = async (
	url: string | undefined,
	errorMessage: string | undefined
): Promise<IOrders[] | string | null> => {
	try {
		if (!url) return null

		const response = await fetch(url)

		if (!response.ok) {
			throw new Error('Error response fetch products')
		}

		const resultProducts: IOrders[] = await response.json()

		return resultProducts
	} catch (error) {
		if (error instanceof Error) {
			errorMessage = error.message
		} else {
			errorMessage = 'Something was wrong from fetch order ('
		}
		return errorMessage || null
	}
}

export const fetchCreatedOrders = async (
	url: string | undefined,
	data: IOrders,
	errorMessage: string | undefined
): Promise<IOrders | string | null> => {
	try {
		if (!url) return null

		const newOrderData = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(data),
		})

		const result: IOrders = await newOrderData.json()

		return result
	} catch (error) {
		if (error instanceof Error) {
			errorMessage = error.message
		} else {
			errorMessage = 'Something was wrong from fetch order ('
		}
		return errorMessage || null
	}
}
