'use client'
import { usePaths } from '@/hooks/user-nav'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import React, { useMemo } from 'react'
import { useQueryRaffles } from '@/hooks/user-queries'
import CreateRaffle from '../create-raffle'
import { useMutationDataState } from '@/hooks/use-mutation-data'
import { RAFFLE_STATUS } from '@/constants/raffle'

type Props = {}

const RaffleList = (props: Props) => {
  const { data } = useQueryRaffles()

  const { latestVariable } = useMutationDataState(['create-raffle'])
  const { pathname } = usePaths()

  const optimisticUiData = useMemo(() => {
    if ((latestVariable && latestVariable?.variables && data)) {
      const test = [latestVariable.variables, ...data.data]
      return { data: test }
    }
    return data || { data: [] }
  }, [latestVariable, data])

  if (data?.status !== 200 || data.data.length <= 0) {
    return (
      <div className="h-[70vh] flex justify-center items-center flex-col gap-y-3">
        <h3 className="text-lg text-gray-400">Sem rifas</h3>
        <CreateRaffle />
      </div>
    )
  }

  console.log(optimisticUiData.data);


  return (
    <div className="flex flex-col gap-y-3">
      {optimisticUiData.data!.map((raffle) => (
        <Link
          href={`${pathname}/${raffle.id}`}
          key={raffle.id}
          className="bg-[#1D1D1D] hover:opacity-80 transition duration-100 rounded-xl p-5 border-[1px] radial--gradient--automations flex border-[#545454]"
        >
          <div className="flex flex-col flex-1 items-start">
            <h2 className="text-xl font-semibold">{raffle.name}</h2>
            <p className="text-[#9B9CA0] text-sm font-light mb-2">
              This is from the comment
            </p>

            <div className="rounded-full mt-3 bg-keyword-purple/15 px-3 py-1 border-2 border-keyword-purple">
              <p className="text-sm text-[#bfc0c3]">
                {raffle.purchases.reduce((acc: number, cur: any) => cur._count.raffleNumbers + acc, 0)} / {raffle.totalNumbers}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <p className="capitalize text-sm font-light text-[#9B9CA0]">
              {formatDate(raffle.drawDate)}
            </p>

            <div className="rounded-full mt-3 bg-keyword-purple/15 px-3 py-1 border-2 border-keyword-purple">
              <p className="text-sm text-[#bfc0c3]">
                {/* @ts-expect-error */}
                {RAFFLE_STATUS[raffle.status]}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default RaffleList
