'use client'

import { deleteProfileAvatar, INewProfile, updatedProfile, updatedProfileAvatar, updatedProfilePassword } from '@/api/profile/profile.api'
import { CreateFakeButtonClient } from '@/components/shared/CreateFakeButtonClient'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/shared/hooks/useAuth'
import { useError } from '@/shared/hooks/useError'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useRef, useState } from 'react'

export default function ProfileSettings() {
	const { user } = useAuth()
	const [formData, setFormData] = useState<INewProfile>({
		firstName: user?.firstName || '',
		lastName: user?.lastName || '',
		tel: user?.tel || '',
		email: user?.email || '',
		city: user?.city || '',
		ownerCompany: user?.ownerCompany || '',
		oldPassword: '',
		newPassword: '',
		confirmPassword: '',
		avatar: user?.avatar || '',
	})
	const {error, setError} = useError(null)
	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const fileInputRef = useRef<HTMLInputElement>(null)
	// const [showMessageImagePath, setShowMessageImagePath]  = useState<string | null>(null)
	const router = useRouter()

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
	}

	const updatedProfileData = {
		firstName: formData.firstName,
		lastName: formData.lastName,
		tel: formData.tel,
		email: formData.email,
		city: formData.city,
		ownerCompany: formData.ownerCompany,
	}

	const updatedProfilePasswordData = {
		oldPassword: formData.oldPassword,
		newPassword: formData.newPassword
	}

	const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			setSelectedFile(file)
		}
		// setShowMessageImagePath('Внимание для того чтобы avatar отображалось нужно положить картинку в директорию проекта в папку public/images')
	}

	const uploadClickHandler = () => {
		fileInputRef.current?.click()
	}

	const removeClickHandler = async () => {
		setSelectedFile(null)
    setFormData(prev => ({ ...prev, avatar: '' }))
		await deleteProfileAvatar(user?.id, setError)
	}

	const saveHandler = async () => {
	if (!user?.id) return;

	try {
		if (selectedFile) {
			localStorage.removeItem('urlAvatar')

			const formDataFile = new FormData();
			formDataFile.append('avatar', selectedFile);
			const avatarResponse = await updatedProfileAvatar(user.id, formDataFile, setError);

			if (avatarResponse?.url) {
  			setFormData(prev => ({ ...prev, avatar: `/images/${avatarResponse.url}` }));

  			setFormData(prev => ({ ...prev, avatar: avatarResponse?.url }))

  			localStorage.setItem('urlAvatar', avatarResponse.url)
			}


		}

		// Обновляем профиль
		await updatedProfile(user?.id, updatedProfileData, setError);

		// Обновляем пароль только если он указан
		if (formData.oldPassword && formData.newPassword && formData.confirmPassword) {
			if (formData.newPassword !== formData.confirmPassword) {
				setError('Пароли не совпадают');
				return;
			}
			await updatedProfilePassword(user?.id, updatedProfilePasswordData, setError);
		}

			router.refresh();
		} catch (err) {
			console.error('Ошибка при сохранении настроек:', err);
			setError('Произошла ошибка при обновлении профиля. Попробуйте снова.');
		}
	};

	return (
		<div className='max-w-5xl mx-auto px-4 py-8'>
			<h1 className='text-4xl font-bold mb-7'>Настройки профиля</h1>
			{error && (<h1 className='text-2xl font-bold my-5 text-red-500'>{error}</h1>)}

			<div className='flex flex-col md:flex-row gap-8'>
				<div className='flex flex-col items-center'>
					{(selectedFile || formData.avatar) && (
  			  	<div className='w-64 h-64 rounded-full mb-6 overflow-hidden relative'>
  			  	  <Image
  			  	    src={
  			  	      selectedFile
  			  	        ? URL.createObjectURL(selectedFile)
  			  	        : formData.avatar
  			  	    }
  			  	    alt='Аватар'
  			  	    width={256}
  			  	    height={256}
  			  	    className='object-cover w-full h-full'
  			  	  />
  			  	</div>
  				)}

  				{!selectedFile && !formData.avatar && (
  				  <div className='w-64 h-64 rounded-full bg-gray-300 mb-6'></div>
  				)}


					<Button
						onClick={uploadClickHandler}
						className='w-full mb-3 bg-black hover:bg-gray-800 text-white font-medium py-3'
					>
						ЗАГРУЗИТЬ ФОТО
					</Button>

					<input
  					type="file"
  					accept="image/*"
  					style={{ display: 'none' }}
  					ref={fileInputRef}
  					onChange={fileChangeHandler}
					/>

					<Button
						onClick={removeClickHandler}
						variant='destructive'
						className='w-full bg-red-700 hover:bg-red-800 text-white font-medium py-3'
					>
						УДАЛИТЬ ФОТО
					</Button>

  				{/*{showMessageImagePath && (
  					<h1 className='text-xl font-bold my-5 text-orange-500'>{showMessageImagePath}</h1>
  				)}*/}
				</div>

				<div className='flex-1'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
						<Input
							type='text'
							name='firstName'
							placeholder='Имя'
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
							type="tel"
							name='tel'
							placeholder='+7'
							value={formData.tel}
							onChange={handleChange}
							className='py-6 bg-gray-100 rounded-md'
						/>

						<Input
							type='email'
							name='email'
							placeholder='email@example.ru'
							value={formData.email}
							onChange={handleChange}
							className='py-6 bg-gray-100 rounded-md'
						/>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-12'>
						<Input
							type='text'
							name='city'
							placeholder='Город'
							value={formData.city}
							onChange={handleChange}
							className='py-6 bg-gray-100 rounded-md'
						/>

						<Input
							type='text'
							name='ownerCompany'
							placeholder='Название компании'
							value={formData.ownerCompany}
							onChange={handleChange}
							className='py-6 bg-gray-100 rounded-md'
						/>
					</div>

					<h2 className='text-2xl font-bold mb-4'>Сменить пароль</h2>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-12'>
						<div>
							<p className='block mb-2'>Старый пароль</p>
							<Input
								type='password'
								name='oldPassword'
								placeholder='Старый пароль'
								value={formData.oldPassword}
								onChange={handleChange}
								className='py-6 bg-gray-100 rounded-md'
							/>
						</div>

						<div>
							<p className='block mb-2'>Новый пароль</p>
							<Input
								type='password'
								name='newPassword'
								placeholder='Новый пароль'
								value={formData.newPassword}
								onChange={handleChange}
								className='py-6 bg-gray-100 rounded-md'
							/>
						</div>

						<div className='col-span-2'>
							<p className='block mb-2'>Повторите пароль</p>
							<Input
								type='password'
								name='confirmPassword'
								placeholder='Подтвердите пароль'
								value={formData.confirmPassword}
								onChange={handleChange}
								className='py-6 bg-gray-100 rounded-md'
							/>
						</div>
					</div>

					<div className='flex justify-end items-center gap-4'>
						<Button
							onClick={() => {}}
							variant='outline'
							className='px-12 py-6 border-2 border-gray-300 rounded-full font-medium'
						>
							ОТМЕНА
						</Button>

						<Button
							onClick={saveHandler}
							className='px-12 py-6 bg-black hover:bg-gray-800 text-white font-medium rounded-full'
						>
							СОХРАНИТЬ ИЗМЕНЕНИЯ
						</Button>
						<CreateFakeButtonClient />
					</div>
				</div>
			</div>
		</div>
	)
}
