'use client'

import {FormEvent} from 'react'
import { Input } from "@/components/ui/input"
import { useAuth } from "@/shared/hooks/useAuth"
import { useInput } from "@/shared/hooks/useInput"
import { useLoading } from '@/shared/hooks/useLoading'
import {useError} from '@/shared/hooks/useError'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'


export default function AuthLoginPage () {
  const loginInput = useInput('')
  const passInput = useInput('')
  const { login } = useAuth()
  const { loading, setLoading } = useLoading(false)
  const { error, setError } = useError(null)
  const router = useRouter()

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await login(loginInput.value, passInput.value)
      router.push('/')
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || 'Ошибка входа')
      }
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      <h1 className="text-2xl text-center font-semibold mb-5">Страница входа</h1>
      <form onSubmit={submitHandler}>
        <div className="max-w-3/12 mx-auto space-y-5">
          <Input type="text" placeholder="email" {...loginInput}/>
          <Input type="password" placeholder="password" {...passInput}/>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button
            type='submit'
            disabled={loading}
            className='w-full cursor-pointer px-12 py-6 bg-black hover:bg-gray-800 text-white font-medium rounded-full'
          >
            {loading ? 'Входим...' : 'Войти'}
          </Button>
        </div>
      </form>
    </div>
  )
}
