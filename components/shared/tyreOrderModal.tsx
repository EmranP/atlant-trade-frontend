'use client'

import { fetchCreatedOrders, IOrders } from '@/api/tyres/order.api'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { APPLICATION_API_URL } from '@/constants/api'
import { errorMessage } from '@/constants/error.constatns'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const tires = [
	{
		id: 1,
		name: 'DRC D733 315/80 R22.5',
		image: '/images/tyre1.png',
	},
	{
		id: 2,
		name: 'DRC D733 315/80 R22.5',
		image: '/images/tyre1.png',
	},
	{
		id: 3,
		name: 'DRC D733 315/80 R22.5',
		image: '/images/tyre1.png',
	},
]

const StepIndicator = ({ currentStep }: { currentStep: number }) => {
	return (
		<div className='flex items-center justify-center gap-8 mb-8'>
			<div className='flex items-center'>
				<div
					className={`rounded-full w-8 h-8 flex items-center justify-center text-white ${
						currentStep >= 1 ? 'bg-black' : 'bg-gray-300'
					}`}
				>
					1
				</div>
				<div className='ml-2 text-sm'>Состав заказа</div>
			</div>
			<div className='h-px w-6 bg-gray-300'></div>
			<div className='flex items-center'>
				<div
					className={`rounded-full w-8 h-8 flex items-center justify-center text-white ${
						currentStep >= 2 ? 'bg-black' : 'bg-gray-300'
					}`}
				>
					2
				</div>
				<div className='ml-2 text-sm'>Контакты</div>
			</div>
			<div className='h-px w-6 bg-gray-300'></div>
			<div className='flex items-center'>
				<div
					className={`rounded-full w-8 h-8 flex items-center justify-center text-white ${
						currentStep >= 3 ? 'bg-black' : 'bg-gray-300'
					}`}
				>
					3
				</div>
				<div className='ml-2 text-sm'>Отправка</div>
			</div>
		</div>
	)
}

const QuantitySelector = ({
	quantity,
	setQuantity,
}: {
	quantity: number
	setQuantity: (qty: number) => void
}) => {
	return (
		<div className='flex items-center gap-2 mt-2'>
			<Button
				variant='outline'
				size='sm'
				className='h-8 w-8 p-0'
				onClick={() => setQuantity(Math.max(1, quantity - 1))}
			>
				-
			</Button>
			<div className='text-center min-w-8'>{quantity}</div>
			<Button
				variant='outline'
				size='sm'
				className='h-8 w-8 p-0'
				onClick={() => setQuantity(quantity + 1)}
			>
				+
			</Button>
		</div>
	)
}

const ProductCard = ({
	tire,
	selectedQuantities,
	setSelectedQuantities,
}: {
	tire: (typeof tires)[0]
	selectedQuantities: Record<number, number>
	setSelectedQuantities: React.Dispatch<
		React.SetStateAction<Record<number, number>>
	>
}) => {
	const quantity = selectedQuantities[tire.id] || 0

	const updateQuantity = (newQuantity: number) => {
		setSelectedQuantities(prev => ({
			...prev,
			[tire.id]: newQuantity,
		}))
	}

	return (
		<div className='bg-white rounded-xl p-4 shadow-sm border flex flex-col items-center'>
			<div className='w-24 h-24 relative mb-2'>
				<Image
					src={tire.image}
					alt={tire.name}
					fill
					className='object-contain'
				/>
			</div>
			<div className='text-xs text-center font-medium mb-1'>{tire.name}</div>
			<div className='text-xs text-center mb-2'>8шт</div>
			<QuantitySelector quantity={quantity} setQuantity={updateQuantity} />
		</div>
	)
}

export type TireOrderModalProps = {
	open: boolean
	onOpenChange: (open: boolean) => void
	initialTireId?: number
	initialQuantity?: number
}

export default function TireOrderModal({
	open,
	onOpenChange,
	initialTireId,
	initialQuantity = 1,
}: TireOrderModalProps) {
	const router = useRouter()
	const [step, setStep] = useState(1)
	const [selectedQuantities, setSelectedQuantities] = useState<
		Record<number, number>
	>({})
	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		email: '',
		region: '',
		message: '',
		city: 'Москва',
		workWithUs: '',
	})

	useEffect(() => {
		if (open && initialTireId) {
			setSelectedQuantities(prev => ({
				...prev,
				[initialTireId]: initialQuantity,
			}))
		}
	}, [open, initialTireId, initialQuantity])

	useEffect(() => {
		if (!open) {
			setStep(1)
		}
	}, [open])

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setFormData(prev => ({
			...prev,
			[name]: value,
		}))
	}

	const handleNextStep = async () => {
		if (step < 3) {
			setStep(step + 1)
		} else {
			console.log('Form submitted', { selectedQuantities, formData })
			const orderPayload: IOrders = {
				id: Date.now(),
				productIds: Object.keys(selectedQuantities).map(id => Number(id)),
				firstName: formData.name,
				tel: formData.phone,
				region: formData.region,
				email: formData.email,
				message: formData.message,
				type: formData.workWithUs,
				user: { id: 0, email: formData.email },
				createdAt: new Date().toISOString(),
			}
			const result = await fetchCreatedOrders(
				APPLICATION_API_URL,
				orderPayload,
				errorMessage
			)
			if (typeof result === 'string') {
				console.error('Order creation error:', errorMessage)
			} else {
				console.log('Order created:', result)
				onOpenChange(false)
				router.refresh()
			}
		}
	}

	const handlePrevStep = () => {
		if (step > 1) {
			setStep(step - 1)
		}
	}

	const selectedTires = Object.entries(selectedQuantities)
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		.filter(([_, qty]) => qty > 0)
		.map(([tireId, qty]) => {
			const tire = tires.find(t => t.id === parseInt(tireId))
			return { tire, quantity: qty }
		})

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className='sm:max-w-2xl'>
				<DialogHeader>
					<DialogTitle className='text-xl font-bold'>
						Оформление заявки
					</DialogTitle>
				</DialogHeader>

				<StepIndicator currentStep={step} />

				{step === 1 && (
					<div className='mt-4'>
						<div className='grid grid-cols-3 gap-4 mb-6'>
							{tires.map(tire => (
								<ProductCard
									key={tire.id}
									tire={tire}
									selectedQuantities={selectedQuantities}
									setSelectedQuantities={setSelectedQuantities}
								/>
							))}
						</div>
						<div className='flex justify-between mt-6'>
							<Button variant='outline' onClick={() => onOpenChange(false)}>
								ВЕРНУТЬСЯ К ТОВАРАМ
							</Button>
							<Button
								onClick={handleNextStep}
								className='bg-black text-white hover:bg-gray-800'
							>
								ПРОДОЛЖИТЬ
							</Button>
						</div>
					</div>
				)}

				{step === 2 && (
					<div className='mt-4'>
						<div className='grid grid-cols-1 gap-4 mb-6'>
							<Input
								name='name'
								value={formData.name}
								onChange={handleInputChange}
								placeholder='Имя'
							/>
							<Input
								name='region'
								value={formData.region}
								onChange={handleInputChange}
								placeholder='Регион'
							/>
							<Input
								name='phone'
								value={formData.phone}
								onChange={handleInputChange}
								placeholder='Телефон'
								type='tel'
							/>
							<Input
								name='email'
								value={formData.email}
								onChange={handleInputChange}
								placeholder='E-mail'
								type='email'
							/>
							<Textarea
								name='message'
								value={formData.message}
								onChange={handleInputChange}
								placeholder='Сообщение'
								className='resize-none h-28'
							/>
						</div>
						<div className='flex justify-between mt-6'>
							<Button variant='outline' onClick={handlePrevStep}>
								НАЗАД
							</Button>
							<Button
								onClick={handleNextStep}
								className='bg-black text-white hover:bg-gray-800'
							>
								ПРОДОЛЖИТЬ
							</Button>
						</div>
					</div>
				)}

				{step === 3 && (
					<div className='mt-4'>
						<div className='mb-6'>
							<h3 className='text-lg font-medium mb-4'>Продукты</h3>
							<div className='grid grid-cols-3 gap-4 mb-6'>
								{selectedTires.map(
									({ tire, quantity }) =>
										tire && (
											<div
												key={tire.id}
												className='bg-white rounded-xl p-4 shadow-sm border flex flex-col items-center'
											>
												<div className='w-24 h-24 relative mb-2'>
													<Image
														src={tire.image}
														alt={tire.name}
														fill
														className='object-contain'
													/>
												</div>
												<div className='text-xs text-center font-medium mb-1'>
													{tire.name}
												</div>
												<div className='text-xs text-center mb-2'>
													{quantity}шт
												</div>
											</div>
										)
								)}
							</div>

							<h3 className='text-lg font-medium mb-4'>
								Контактная информация
							</h3>
							<div className='border rounded-xl p-6'>
								<div className='grid grid-cols-2 gap-4'>
									<div>
										<p className='text-sm mb-2'>
											{formData.name || 'Геннадий'}
										</p>
										<p className='text-sm mb-2'>{formData.city}</p>
									</div>
									<div>
										<p className='text-sm mb-2'>
											{formData.phone || '+79999999999'}
										</p>
										<p className='text-sm'>
											{formData.email || 'gennadiy@mail.ru'}
										</p>
									</div>
								</div>
								<div className='mt-4'>
									<p className='text-sm mb-2'>Сообщение</p>
									<div className='border rounded p-4 h-20'>
										<p className='text-sm'>
											{formData.workWithUs || 'Работаете с нас?'}
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className='flex justify-between mt-6'>
							<Button variant='outline' onClick={handlePrevStep}>
								НАЗАД
							</Button>
							<Button
								onClick={handleNextStep}
								className='bg-black text-white hover:bg-gray-800'
							>
								ОТПРАВИТЬ
							</Button>
						</div>
					</div>
				)}
			</DialogContent>
		</Dialog>
	)
}
