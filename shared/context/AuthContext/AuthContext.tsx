'use client'

import { IProfile } from '@/api/profile/profile.api'
import { AUTH_AUTHENTICATED_API_URL, AUTH_LOGIN_API_URL, AUTH_LOGOUT_API_URL, AUTH_REG_API_URL, defaultAvatarUrl } from '@/constants/api'
import { $api } from '@/lib/api.lib'
import { isValidAvatar } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { createContext, PropsWithChildren, FC, useState, useEffect } from 'react'

export type AuthContextType = {
	user: IProfile | null
	isLoading: boolean
	login: (loginField: string, password: string) => Promise<void>
	register: (loginField: string, password: string) => Promise<void>
	logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const [user, setUser] = useState<IProfile | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const router = useRouter()

	const fetchMe = async () => {
		try {
			const { data } = await $api.get<IProfile>(AUTH_AUTHENTICATED_API_URL)

			const getUrlAvatar = localStorage.getItem('url-avatar')
			const avatarFromLocalStorage = getUrlAvatar ?? ''

			const finalAvatar = isValidAvatar(avatarFromLocalStorage)
				? avatarFromLocalStorage!
				: isValidAvatar(data.avatar)
				? data.avatar!
				: defaultAvatarUrl

			setUser({...data, avatar: finalAvatar})
		} catch {
			setUser(null)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		fetchMe()
	}, [])

	const login = async (loginField: string, password: string):Promise<void> => {
		await $api.post(AUTH_LOGIN_API_URL, {email: loginField, password})
		await fetchMe()
	}

	const register = async (registerField: string, password: string):Promise<void> => {
		const { data } = await $api.post<IProfile | null>(AUTH_REG_API_URL, { email: registerField, password })
		if (!data) return
		setUser(data)
	}

	const logout = async ():Promise<void> => {
		await $api.post(AUTH_LOGOUT_API_URL)
		setUser(null)
		setTimeout(() => {
			router.push('/')
		}, 500)
	}

	return <AuthContext.Provider value={{user, isLoading, login, register, logout}}>{children}</AuthContext.Provider>
}
