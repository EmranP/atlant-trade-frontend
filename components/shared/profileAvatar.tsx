import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'

interface IProfileAvatarProps {
	logoutHandler: () => Promise<void>
}

const ProfileAvatar = ({logoutHandler}: IProfileAvatarProps) => {
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Avatar>
						<AvatarImage src='https://github.com/shadcn.png' />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent className='w-56'>
					<DropdownMenuLabel className='font-bold'>
						Геннадий Тарханян
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
