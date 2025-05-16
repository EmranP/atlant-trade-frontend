import { IProfile } from "@/api/profile/profile.api"
import { AUTH_AUTHENTICATED_API_URL } from "@/constants/api"
import { cookies } from "next/headers"

export async function getServerAuthUser(): Promise<IProfile | null> {
  try {
    const cookieStore = await cookies()

    const token = cookieStore.get('token')?.value
    if (!token) return null

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${AUTH_AUTHENTICATED_API_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    })

    if (!res.ok) return null

    const data: IProfile = await res.json()
    return data
  } catch {
    return null
  }
}
