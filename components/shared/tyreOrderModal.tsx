'use client'


import { createdOrders, getOrders, getProducts, IOrders } from '@/api/order/order.api'

import { ITires } from '@/app/tyres/page'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { APPLICATION_API_URL, deafultImageUrl } from '@/constants/api'
import { useAuth } from '@/shared/hooks/useAuth'
import { useError } from '@/shared/hooks/useError'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Loader } from '../ui/Loader'


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
	tire: ITires
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
					src={tire.image || deafultImageUrl}
					alt={tire.name || 'order-image'}
					fill
					className='object-contain rounded-2xl'
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
	const {user} = useAuth()
	const router = useRouter()
	const [step, setStep] = useState(1)
	const [selectedQuantities, setSelectedQuantities] = useState<
		Record<number, number>
	>({})
	const [formData, setFormData] = useState({
		name: user?.firstName || '',
		phone: user?.tel || '',
		email: user?.email || '',
		region: '',
		message: '',
		city: user?.city || '',
		workWithUs: '',
	})
	const {error, setError} = useError('')
	const [products, setProducts] = useState<ITires[]>([])
	const [orders, setOrders] = useState<IOrders[]>([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      // Загрузка продуктов
      const productResult = await getProducts(setError);
      if (Array.isArray(productResult)) {
        setProducts(productResult);
      } else {
        setError(productResult || 'Ошибка загрузки продуктов');
      }

      // Загрузка заказов
      if (user?.id) {
        const orderResult = await getOrders(user.id, APPLICATION_API_URL, setError);
        if (Array.isArray(orderResult)) {
          setOrders(orderResult);
        } else {
          setError(orderResult || 'Ошибка загрузки заказов');
        }
      }

      setIsLoading(false);
    };

    if (open) {
      loadData();
    }
  }, [open, user?.id, setError])

  useEffect(() => {
  	const loadOrders = async () => {
      const result = await getOrders(user?.id, APPLICATION_API_URL, setError);
      if (Array.isArray(result)) {
        setOrders(result);
      } else {
        setError(result || 'Ошибка загрузки продуктов');
      }
    };

    if (open) {
      loadOrders();
    }
  }, [open, setError, user?.id])

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
      setStep(1);
      setSelectedQuantities({});
      setOrders([]);
      setProducts([]);
      setError('');
    }
  }, [open, setError])

	const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

	const handleNextStep = async () => {
		if (step === 1 && Object.values(selectedQuantities).every((qty) => qty === 0)) {
      setError('Выберите хотя бы один продукт');
      return;
    }

		if (step < 3) {
			setStep(step + 1)
		} else {
			const productIds = Object.keys(selectedQuantities)
        .filter((id) => selectedQuantities[Number(id)] > 0)
        .map((id) => Number(id));
      const amounts = Object.keys(selectedQuantities)
        .filter((id) => selectedQuantities[Number(id)] > 0)
        .map((id) => selectedQuantities[Number(id)]);

			const orderPayload: IOrders = {
        productIds,
        amounts,
        firstName: formData.name,
        tel: formData.phone,
        region: formData.region,
        email: formData.email,
        message: formData.message,
        type: formData.workWithUs,
        user: { id: user?.id, email: formData.email },
        createdAt: new Date().toISOString(),
      };

			if (!user?.id) {
        setError('Пользователь не авторизован');
        return;
      }

			const result = await createdOrders(
				user?.id,
				APPLICATION_API_URL,
				orderPayload,
				setError
			)

			if (result) {
        onOpenChange(false);
        router.refresh();
      }
			console.log('Form submitted', { selectedQuantities, formData })
		}
	}

	const handlePrevStep = () => {
		if (step > 1) {
			setStep(step - 1)
		}
	}

	const orderProductIds = orders.flatMap((order) => order.productIds); // Собираем все productIds из заказов
  const orderProducts = products
    .filter((product) => orderProductIds.includes(product.id))
    .map((product) => {
      // Для каждого продукта ищем количество из заказов
      const orderWithProduct = orders.find((order) =>
        order.productIds.includes(product.id)
      );
      const index = orderWithProduct?.productIds.indexOf(product.id);
      const quantity = index !== undefined && index >= 0 && orderWithProduct?.amounts
        ? orderWithProduct.amounts[index]
        : 1; // По умолчанию 1, если количество не указано
      return { tire: product, quantity };
    });

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className='sm:max-w-2xl'>
				<DialogHeader>
					<DialogTitle className='text-xl font-bold'>
						Оформление заявки
					</DialogTitle>
				</DialogHeader>

				{error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

				<StepIndicator currentStep={step} />

				{step === 1 && (
					<div className='mt-4'>
						<div className='grid grid-cols-3 gap-4 mb-6 max-h-[400px] overflow-y-auto'>
							{isLoading ? (
								<div className='col-span-3'>
                	<Loader size={30} />
								</div>
              ) : products.length > 0 ? (
                products.map((tire) => (
                  <ProductCard
                    key={tire.id}
                    tire={tire}
                    selectedQuantities={selectedQuantities}
                    setSelectedQuantities={setSelectedQuantities}
                  />
                ))
              ) : (
                <p className='text-center col-span-3'>Продукты отсутствуют</p>
              )}
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
								name='tel'
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
								{isLoading ? (
                  <Loader size={30} />
                ) : orderProducts.length > 0 ? (
                  orderProducts.map(({ tire, quantity }) => (
                    <div
                      key={tire.id}
                      className='bg-white rounded-xl p-4 shadow-sm border flex flex-col items-center'
                    >
                      <div className='w-24 h-24 relative mb-2'>
                        <Image
                          src={'/images/tyre1.png'}
                          alt={tire.name}
                          fill
                          className='object-contain'
                        />
                      </div>
                      <div className='text-xs text-center font-medium mb-1'>{tire.name}</div>
                      <div className='text-xs text-center mb-2'>{quantity}шт</div>
                    </div>
                  ))
                ) : (
                  <p className='text-center col-span-3'>Нет продуктов в заказах</p>
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
