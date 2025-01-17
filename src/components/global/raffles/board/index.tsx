'use client'

import { useQueryRaffle } from "@/hooks/user-queries"
import { cn } from "@/lib/utils"
import RaffleBoardTile from "../board-tile"

type Props = {
    id: string
}

const RaffleBoard = ({ id }: Props) => {
    const { data } = useQueryRaffle(id)
    const totalNumbers = data?.data?.totalNumbers || 0
    const size = Math.sqrt(totalNumbers);
    const numbers = data?.data?.numbers

    return (
        // grid-cols-10 grid-cols-9 grid-cols-8 grid-cols-7 grid-cols-6 grid-cols-5 grid-cols-4 grid-cols-3 grid-cols-2
        <div className={cn('w-full lg:w-10/12 xl:w-6/12 p-5 aspect-square rounded-xl grid bg-[#1D1D1D]', `grid-cols-${size}`)}>
            {Array.from({ length: totalNumbers }).map((_, index) => {
                const found = numbers?.find(({ number }) => number == (index + 1))

                if (found) {
                    return <RaffleBoardTile key={index} raffleNumber={found} />
                }

                return (
                    <div key={index} className="border border-gray-300 flex justify-center items-center">
                        <span>{index + 1}</span>
                    </div>
                )
            })}
        </div>
    )
}

export default RaffleBoard