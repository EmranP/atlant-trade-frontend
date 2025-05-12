import { Dispatch, SetStateAction, useState } from "react"

export interface IHookLoading {
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
}

export const useLoading = (initialValue: boolean):IHookLoading => {
  const [loading, setLoading] = useState(initialValue)

  return {loading, setLoading}
}
