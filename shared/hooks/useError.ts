import { Dispatch, SetStateAction, useState } from "react"

export interface IHookError {
  error: string | null
  setError: Dispatch<SetStateAction<string | null>>
}

export const useError = (initialValue: string | null): IHookError  => {
  const [error, setError] = useState(initialValue)

  return {error, setError}
}
