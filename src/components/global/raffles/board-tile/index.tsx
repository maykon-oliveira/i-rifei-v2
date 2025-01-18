'use client'

import { RaffleNumber, User } from "@prisma/client"
import PopOver from "../../popover"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

type Props = {
    raffleNumber: RaffleNumber & { buyer: User, purchase: { _count: { payments: number } } }
}

const RaffleBoardTile = ({ raffleNumber }: Props) => {
    const { buyer, purchase } = raffleNumber
    const paid = purchase._count.payments > 0

    return (
        <PopOver
            className="w-[400px]"
            trigger={
                <div className={cn('border border-gray-300 cursor-pointer flex justify-center items-center', paid ? 'bg-green-700' : 'bg-destructive')}>
                    <span>{raffleNumber.number}</span>
                </div>
            }>
            <div className="flex flex-col space-y-4">
                <div className="flex flex-col justify-center space-y-2">
                    <p className="text-sm text-center text-gray-200">Número</p>
                    <h3 className="text-center text-3xl font-bold">{raffleNumber.number}</h3>
                </div>
                <div className="flex flex-col justify-center space-y-2">
                    <p className="text-sm text-center text-gray-200">Comprador</p>
                    <h3 className="text-center text-2xl font-bold">{buyer.firstname} {buyer.lastname}</h3>
                </div>
                <div className="flex flex-col justify-center">
                    <div className="flex justify-center">
                        {paid ? (<Badge variant='success'>PAGO</Badge>) : (<Badge variant='destructive'>NÃO PAGO</Badge>)}
                    </div>
                </div>
            </div>
        </PopOver>
    )
}

export default RaffleBoardTile