export default function ContactPage() {
	return (
		<div className='max-w-5xl mx-auto px-4 py-12'>
			<h1 className='text-4xl font-bold mb-8'>Контактная информация</h1>

			<div className='space-y-6 mb-12'>
				<div className='flex flex-col md:flex-row justify-between border-b pb-2'>
					<span className='font-bold text-xl'>Телефон</span>
					<div className='text-right space-y-1'>
						<p>+7 (495) 220-00-09</p>
						<p>+7 (985) 220-00-09</p>
					</div>
				</div>

				<div className='flex flex-col md:flex-row justify-between border-b pb-2'>
					<span className='font-bold text-xl'>Электронная почта</span>
					<span>info@atrade.ru</span>
				</div>

				<div className='flex flex-col md:flex-row justify-between border-b pb-2'>
					<span className='font-bold text-xl'>Адрес офиса</span>
					<span>Москва, Варшавское шоссе, 150к2</span>
				</div>

				<div className='flex flex-col md:flex-row justify-between border-b pb-2'>
					<span className='font-bold text-xl'>Адрес склада</span>
					<span>Московская обл., Домодедово, п. Артем</span>
				</div>
			</div>

			<h2 className='text-2xl font-bold mb-4'>Реквизиты</h2>
			<div className='space-y-4 text-sm'>
				<div className='flex justify-between border-b pb-1'>
					<span>ИНН</span>
					<span>7722823341</span>
				</div>
				<div className='flex justify-between border-b pb-1'>
					<span>КПП</span>
					<span>772201001</span>
				</div>
				<div className='flex justify-between border-b pb-1'>
					<span>ОГРН</span>
					<span>5137746003808</span>
				</div>
				<div className='flex justify-between border-b pb-1'>
					<span>ОКПО</span>
					<span>18910240</span>
				</div>
				<div className='flex justify-between border-b pb-1'>
					<span>ОКАТО</span>
					<span>45290564000</span>
				</div>
				<div className='flex justify-between border-b pb-1'>
					<span>ОКТМО</span>
					<span>4538800</span>
				</div>
				<div className='flex justify-between border-b pb-1'>
					<span>ОКВЭД</span>
					<span>46.90</span>
				</div>
				<div className='flex justify-between border-b pb-1'>
					<span>Юридический адрес</span>
					<span className='text-right'>
						111020 г. Москва ул. Сторожевая дом 18А пом.1п
					</span>
				</div>
			</div>
		</div>
	)
}
