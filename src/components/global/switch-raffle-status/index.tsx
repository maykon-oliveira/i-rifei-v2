import { Button } from '@/components/ui/button'
import { Loader2, PartyPopperIcon, RadioTowerIcon } from 'lucide-react'
import React from 'react'
import { useQueryRaffle } from '@/hooks/user-queries'
import { useMutationData } from '@/hooks/use-mutation-data'
import { updateRaffleStatus } from '@/actions/raffles'
import { RAFFLE_STATUS } from '@/constants/raffle'
import { Badge } from '@/components/ui/badge'

type Props = {
  id: string
}

const SwitchRaffleStatus = ({ id }: Props) => {
  const { data } = useQueryRaffle(id)
  const { mutate, isPending } = useMutationData(
    ['status-raffle'],
    (data) => updateRaffleStatus(id, data),
    'raffle-info'
  )

  if (data?.data?.status === 'DRAFT') {
    return (
      <Button
        disabled={isPending}
        onClick={() => mutate({ status: 'PUBLISHED' })}
        className="lg:px-10 bg-gradient-to-br hover:opacity-80 text-white rounded-full from-[#3352CC] font-medium to-[#1C2D70] ml-4"
      >
        {isPending ? <Loader2 className="animate-spin" /> : <PartyPopperIcon />}

        <p className="lg:inline hidden">
          Publicar
        </p>
      </Button>
    )
  }

  if (data?.data?.status === 'PUBLISHED') {
    return (
      <Button
        disabled={isPending}
        onClick={() => mutate({ status: 'DRAFT' })}
        variant="destructive"
        className="lg:px-10 rounded-full font-medium ml-4"
      >
        {isPending ? <Loader2 className="animate-spin" /> : <RadioTowerIcon />}

        <p className="lg:inline hidden">
          Cancelar
        </p>
      </Button>
    )
  }

  // @ts-expect-error no error
  return (<Badge className='lg:px-10 rounded-full font-medium ml-4 py-2'>{RAFFLE_STATUS[data?.data?.status]}</Badge>)
}

export default SwitchRaffleStatus
