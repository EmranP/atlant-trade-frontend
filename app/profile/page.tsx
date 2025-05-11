'use client'
import { fetchProfileUpdated, INewProfile } from '@/api/tyres/profile.api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PROFILE_API_URL } from '@/constants/api'
import { errorMessage } from '@/constants/error.constatns'
import { useState } from 'react'

export default function ProfileSettings() {
	const [formData, setFormData] = useState<INewProfile>({
		firstName: 'Геннадий',
		lastName: '',
		tel: '+79999999999',
		email: 'gennady@mail.ru',
		city: 'Москва',
		ownerCompany: '',
		newPassword: '',
		confirmPassword: '',
		avatar: '',
	})

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
	}

	const handleSave = async () => {
		await fetchProfileUpdated(PROFILE_API_URL, formData, errorMessage as string)
		console.log('Settings saved:', formData)
	}

	return (
		<div className='max-w-5xl mx-auto px-4 py-8'>
			<h1 className='text-4xl font-bold mb-10'>Настройки профиля</h1>

			<div className='flex flex-col md:flex-row gap-8'>
				<div className='flex flex-col items-center'>
					<div className='w-64 h-64 rounded-full bg-gray-300 mb-6 overflow-hidden'>
						<div className='w-full h-full'></div>
					</div>

					<Button
						onClick={() => console.log('Upload photo')}
						className='w-full mb-3 bg-black hover:bg-gray-800 text-white font-medium py-3'
					>
						ЗАГРУЗИТЬ ФОТО
					</Button>

					<Button
						onClick={() => console.log('Delete photo')}
						variant='destructive'
						className='w-full bg-red-700 hover:bg-red-800 text-white font-medium py-3'
					>
						УДАЛИТЬ ФОТО
					</Button>
				</div>

				<div className='flex-1'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
						<Input
							type='text'
							name='firstName'
							placeholder='Геннадий'
							value={formData.firstName}
							onChange={handleChange}
							className='py-6 bg-gray-100 rounded-md'
						/>

						<Input
							type='text'
							name='lastName'
							placeholder='Фамилия'
							value={formData.lastName}
							onChange={handleChange}
							className='py-6 bg-gray-100 rounded-md'
						/>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
						<Input
							type='tel'
							name='phone'
							placeholder='+79999999999'
							value={formData.tel}
							onChange={handleChange}
							className='py-6 bg-gray-100 rounded-md'
						/>

						<Input
							type='email'
							name='email'
							placeholder='gennady@mail.ru'
							value={formData.email}
							onChange={handleChange}
							className='py-6 bg-gray-100 rounded-md'
						/>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-12'>
						<Input
							type='text'
							name='city'
							placeholder='Москва'
							value={formData.city}
							onChange={handleChange}
							className='py-6 bg-gray-100 rounded-md'
						/>

						<Input
							type='text'
							name='company'
							placeholder='Название компании'
							value={formData.ownerCompany}
							onChange={handleChange}
							className='py-6 bg-gray-100 rounded-md'
						/>
					</div>

					<h2 className='text-2xl font-bold mb-4'>Сменить пароль</h2>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-12'>
						<div>
							<p className='block mb-2'>Новый пароль</p>
							<Input
								type='password'
								name='newPassword'
								placeholder='••••••••'
								value={formData.newPassword}
								onChange={handleChange}
								className='py-6 bg-gray-100 rounded-md'
							/>
						</div>

						<div>
							<p className='block mb-2'>Повторите пароль</p>
							<Input
								type='password'
								name='confirmPassword'
								placeholder='••••••••'
								value={formData.confirmPassword}
								onChange={handleChange}
								className='py-6 bg-gray-100 rounded-md'
							/>
						</div>
					</div>

					<div className='flex justify-end gap-4'>
						<Button
							onClick={() => console.log('Cancel')}
							variant='outline'
							className='px-12 py-6 border-2 border-gray-300 rounded-full font-medium'
						>
							ОТМЕНА
						</Button>

						<Button
							onClick={handleSave}
							className='px-12 py-6 bg-black hover:bg-gray-800 text-white font-medium rounded-full'
						>
							СОХРАНИТЬ ИЗМЕНЕНИЯ
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
