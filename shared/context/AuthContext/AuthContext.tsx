'use client'

import { IProfile } from '@/api/profile/profile.api'
import { $api } from '@/lib/api.lib'
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
	const [isLoading, setIsLoading] = useState(true)
	const router = useRouter()

	const fetchMe = async () => {
		try {
			const { data } = await $api.get('/auth/authenticated')
			setUser(data)
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
		await $api.post('auth/login', {email: loginField, password})
		await fetchMe()
	}

	const register = async (registerField: string, password: string) => {
		await $api.post('/auth/register', { email: registerField, password })
		await fetchMe()
	}

	const logout = async () => {
		await $api.post('/auth/logout')
		setUser(null)
		setTimeout(() => {
			router.push('/')
		}, 500)
	}

	return <AuthContext.Provider value={{user, isLoading, login, register, logout}}>{children}</AuthContext.Provider>
}
