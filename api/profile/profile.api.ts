import { PROFILE_API_URL, PROFILE_AVATAR_API_URL, PROFILE_PASS_API_URL } from "@/constants/api"
import { $api } from "@/lib/api.lib"
import { Dispatch, SetStateAction } from "react"

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
	oldPassword: string
	newPassword: string
	confirmPassword: string
	firstName: string
	lastName: string
	city: string
	tel: string
	ownerCompany: string
	avatar: string
}

export const fetchProfileGet = async (
	errorMessage: string
): Promise<IProfile | string | null> => {
	try {
		const response = await $api.get<IProfile>(PROFILE_API_URL)

		return response.data
	} catch (error) {
		if (error instanceof Error) {
			errorMessage = error.message
		} else {
			errorMessage = 'Something was wrong from fetch order ('
		}
		return errorMessage || null
	}
}

export const updatedProfile = async (
	userId: number | undefined,
	data: Partial<INewProfile>,
	setErrorMessage: Dispatch<SetStateAction<string | null>>
): Promise<Partial<INewProfile> | undefined> => {
	try {
		const response = await $api.put<IProfile>(`${PROFILE_API_URL}?userId=${userId}`, data)

		if (![200, 201].includes(response.status)) {
    	throw new Error('Ошибка при updated из избранного');
  	}


  	return response.data
	} catch (error) {
		if (error instanceof Error) {
			setErrorMessage(error.message)
		} else {
			setErrorMessage('Something was wrong from fetch order (')
		}
	}
}

export const updatedProfilePassword = async (
		userId: number | undefined,
		data: Partial<INewProfile>,
		setErrorMessage: Dispatch<SetStateAction<string | null>>
	):Promise<INewProfile | undefined> => {
	try {
		const response = await $api.put<INewProfile>(`${PROFILE_PASS_API_URL}?userId=${userId}`, data)

		if (response.status !== 200) {
			throw new Error('Ошибка при смене пароля')
		}

  	return response.data
	} catch (error) {
		if (error instanceof Error) {
			setErrorMessage(error.message)
		} else {
			setErrorMessage('Something was wrong from fetch profile (')
		}
	}
}

export const updatedProfileAvatar = async (
	userId: number | undefined,
	data: FormData,
	setErrorMessage: Dispatch<SetStateAction<string | null>>
):Promise<{url: string} | undefined> => {
	try {
		const response = await $api.post<{url: string}>(
			`${PROFILE_AVATAR_API_URL}?userId=${userId}`,
			data
		)

		if (response.status !== 201) {
			throw new Error('Ошибка при загрузке аватара')
		}

		return response.data
	} catch (error) {
		setErrorMessage(error instanceof Error ? error.message : 'Ошибка загрузки аватара')
	}
}

export const deleteProfileAvatar = async (
		userId: number | undefined,
		setError: Dispatch<SetStateAction<string | null>>
	) => {
  	try {
  	  await $api.delete(`${PROFILE_AVATAR_API_URL}?userId=${userId}`)
  	} catch (err: any) {
  	  setError(err?.response?.data?.message || 'Ошибка удаления аватара')
  	}
}
