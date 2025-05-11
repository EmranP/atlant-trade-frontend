export interface IProfile {
	id: number
	email: string
	password: string
	firstName: string
	lastName: string
	city: string
	tel: string
	ownerCompany: string
	avatar: string
}

export interface INewProfile {
	id?: number
	email: string
	confirmPassword: string
	newPassword: string
	firstName: string
	lastName: string
	city: string
	tel: string
	ownerCompany: string
	avatar: string
}

export const fetchProfileGet = async (
	url: string | undefined,
	errorMessage: string
): Promise<IProfile | string | null> => {
	try {
		if (!url) return null

		const response = await fetch(url)

		return response.json()
	} catch (error) {
		if (error instanceof Error) {
			errorMessage = error.message
		} else {
			errorMessage = 'Something was wrong from fetch order ('
		}
		return errorMessage || null
	}
}

export const fetchProfileUpdated = async (
	url: string | undefined,
	data: INewProfile,
	errorMessage: string
): Promise<void | string | null> => {
	try {
		if (!url) return null

		await fetch(url, {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(data),
		})
	} catch (error) {
		if (error instanceof Error) {
			errorMessage = error.message
		} else {
			errorMessage = 'Something was wrong from fetch order ('
		}
		return errorMessage || null
	}
}
