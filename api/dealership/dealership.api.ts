import { IDealership } from "@/app/dealership/page";
import { DEALRESHIP_API_URL } from "@/constants/api";
import { $api } from "@/lib/api.lib";
import { Dispatch, SetStateAction } from "react";

export const createDealership = async (
  data: IDealership,
  setError: Dispatch<SetStateAction<string | null>>
  ):Promise<IDealership | undefined> => {
  try {
    const response = await $api.post<{dealership: IDealership; message: string}>(DEALRESHIP_API_URL, data)

    if (response.status !== 201) {
      throw new Error('Error from created dealership')
    }

    return response.data.dealership
  } catch (error) {
    setError(error instanceof Error ? error.message : 'Ошибка удаления аватара')
  }
}
