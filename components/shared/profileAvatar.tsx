'use client'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { useAuth } from '@/shared/hooks/useAuth'
import { defaultAvatarUrl } from '@/constants/api'

interface IProfileAvatarProps {
	logoutHandler: () => Promise<void>
}

const ProfileAvatar = ({logoutHandler}: IProfileAvatarProps) => {
	const {user} = useAuth()

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild className='cursor-pointer'>
					<Avatar>
						{user?.avatar ? (
							<AvatarImage src={user?.avatar || defaultAvatarUrl} />
						): !user?.avatar || user?.avatar === '' ? (
							<AvatarFallback>CN</AvatarFallback>
						) : null}
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent className='w-56'>
					<DropdownMenuLabel className='font-bold'>
						{user?.firstName + ' ' + user?.lastName}
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<Link href={'/tyres/favorite'}>
						<DropdownMenuLabel>Избранное</DropdownMenuLabel>
					</Link>
					<DropdownMenuSeparator />
					<Link href={'/profile'}>
						<DropdownMenuLabel>Настройки профиля</DropdownMenuLabel>
					</Link>
					<DropdownMenuSeparator />
					<DropdownMenuLabel className='font-bold cursor-pointer' onClick={logoutHandler}>Выйти</DropdownMenuLabel>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	)
}

export default ProfileAvatar
