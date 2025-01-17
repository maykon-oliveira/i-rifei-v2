import { createRaffles, updateRaffleName } from "@/actions/raffles"
import { useMutationData } from "./use-mutation-data"
import { useEffect, useRef, useState } from "react"

export const useCreateRaffle = (id: string) => {
  const { isPending, mutate } = useMutationData(
    ['create-raffle'],
    (data) => createRaffles({ id, ...data }),
    'user-raffles'
  )

  return { isPending, mutate }
}

export const useEditRaffle = (raffleId: string) => {
  const [edit, setEdit] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const enableEdit = () => setEdit(true)
  const disableEdit = () => setEdit(false)

  const { isPending, mutate } = useMutationData(
    ['update-raffle'],
    (data: { name: string }) =>
      updateRaffleName(raffleId, { name: data.name }),
    'raffle-info',
    disableEdit
  )

  useEffect(() => {
    function handleClickOutside(this: Document, event: MouseEvent) {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node | null)
      ) {
        if (inputRef.current.value !== '') {
          mutate({ name: inputRef.current.value })
        } else {
          disableEdit()
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return {
    edit,
    enableEdit,
    disableEdit,
    inputRef,
    isPending,
  }
}