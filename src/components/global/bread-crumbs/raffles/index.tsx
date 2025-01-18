'use client'
import { ChevronRight, PencilIcon } from 'lucide-react'
import React from 'react'
import SwitchRaffleStatus from '../../switch-raffle-status'
import { useQueryRaffle } from '@/hooks/user-queries'
import { useEditRaffle } from '@/hooks/use-raffles'
import { useMutationDataState } from '@/hooks/use-mutation-data'
import { Input } from '@/components/ui/input'

type Props = {
  id: string
}

const RafflesBreadCrumb = ({ id }: Props) => {
  const { data } = useQueryRaffle(id)
  const { edit, enableEdit, inputRef, isPending } = useEditRaffle(id)

  const { latestVariable } = useMutationDataState(['update-raffle'])

  return (
    <div className="rounded-full w-full p-5 bg-[#18181B1A] flex items-center">
      <div className="flex items-center gap-x-3 min-w-0">
        <p className="text-[#9B9CA0] truncate">Rifas</p>
        <ChevronRight
          className="flex-shrink-0"
          color="#9B9CA0"
        />
        <span className="flex gap-x-3 items-center min-w-0">
          {edit ? (
            <Input
              ref={inputRef}
              placeholder={
                isPending ? latestVariable.variables : 'Digite o novo nome'
              }
              className="bg-transparent h-auto outline-none text-base border-none p-0"
            />
          ) : (
            <p className="text-[#9B9CA0] truncate">
              {latestVariable?.variables
                ? latestVariable?.variables.name
                : data?.data?.name}
            </p>
          )}
          {edit ? (
            <></>
          ) : (
            <span
              className="cursor-pointer hover:opacity-75 duration-100 transition flex-shrink-0 mr-4"
              onClick={enableEdit}
            >
              <PencilIcon size={14} />
            </span>
          )}
        </span>
      </div>

      <div className="flex items-center gap-x-5 ml-auto">
        <p className="hidden md:block text-text-secondary/60 text-sm truncate min-w-0">
          Os dados são salvos automaticamente
        </p>
      </div>
      <SwitchRaffleStatus id={id} />
    </div>
  )
}

export default RafflesBreadCrumb
