import { fetchProductsTyres } from '@/api/tyres/tyres.api'
import { CreateFakeButtonClient } from '@/components/shared/CreateFakeButtonClient'
import Filters from '@/components/shared/Filters'
import OrderButton from '@/components/shared/OrderButton'
import TyreCard from '@/components/shared/tyreCard'
import { PRODUCTS_API_URL } from '@/constants/api'
import { errorMessage } from '@/constants/error.constatns'
import Link from 'next/link'

export interface ITires {
	id: number
	name: string
	description: string
	price: number
	size: string
	load_index: string
	speed_index: string
	axis: string
	ply: string
	tread_depth: string
	seasonality: string
	manufacturer: string
	amount: number
	image: string
}

export default async function TruckTiresPage() {
	const tires: ITires[] | null | string = await fetchProductsTyres(
		PRODUCTS_API_URL,
		errorMessage
	)


	if (!tires || typeof tires === 'string')
		return (
			<div className='text-center w-full'>
				<h1 className='text-red-500'>{errorMessage}</h1>
			</div>
		)

	return (
		<div className='max-w-7xl mx-auto px-4 py-8'>
			<h1 className='text-3xl font-bold mb-8'>Грузовые шины</h1>

			<Filters tires={tires} />

      {tires.length ? (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{tires?.map(tire => (
						<Link key={tire.id} href={`/tyres/${tire.id}`}>
							<TyreCard model={tire} />
						</Link>
					))}
				</div>
      ): (
      	<CreateFakeButtonClient />
      )}

			<OrderButton />
		</div>
	)
}
