import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"

export interface IHookInput {
  value: string
  // setValue: Dispatch<SetStateAction<string>>
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const useInput = (initialValue: string):IHookInput => {
  const [value, setValue] = useState(initialValue || '')

  const onChange = (e:ChangeEvent<HTMLInputElement>) => setValue(e.target.value)

  return {value,  onChange}
}
