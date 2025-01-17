'use client'

import { cn } from "@/lib/utils"
import { RaffleNumber } from "@prisma/client"

type Props = {
    raffleNumber: RaffleNumber
}

const RaffleBoardTile = ({ raffleNumber }: Props) => {
    return (
        <div
            className={cn('border border-gray-300 flex justify-center items-center bg-red-900')}
        >
            <span>{raffleNumber.number}</span>
        </div>
    )
}

export default RaffleBoardTile