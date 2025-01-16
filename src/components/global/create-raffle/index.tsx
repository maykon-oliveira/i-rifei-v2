'use client'

import { Button } from '@/components/ui/button'
import React, { useMemo, useState } from 'react'
import Loader from '../loader'
import { TicketPlusIcon } from 'lucide-react'
import { useCreateRaffle } from '@/hooks/use-raffles'
import { v4 } from 'uuid'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type Props = {}

const CreateRaffle = (props: Props) => {
  // TODO: Close dialog after success
  // TODO: Form validation
  // TODO: Generate totalNumbers values
  const mutationId = useMemo(() => v4(), [])
  const { isPending, mutate } = useCreateRaffle(mutationId)
  const [data, setData] = useState({ name: '', totalNumbers: 25, drawDate: new Date().toISOString() })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="lg:px-10 py-6 bg-gradient-to-br hover:opacity-80 text-white rounded-full from-[#3352CC] font-medium to-[#1C2D70]"
        >
          <TicketPlusIcon />
          <p className="lg:inline hidden">Criar Rifa</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar nova rifa</DialogTitle>
          <DialogDescription>
            {/* TODO: Add description */}
            Make changes to your profile here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input onChange={e => setData({ ...data, [e.target.id]: e.target.value })} id="name" value={data.name} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Quantidade total de números
            </Label>
            <Select onValueChange={e => setData({ ...data, totalNumbers: Number(e) })}>
              <SelectTrigger value={data.totalNumbers} className="w-[250px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="25">25 Números</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="drawDate" className="text-right">
              Data do sorteio
            </Label>
            <Input type='datetime-local' onChange={e => setData({ ...data, [e.target.id]: e.target.value })} id="drawDate" value={data.drawDate} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={() =>
            mutate({
              id: mutationId,
              ...data
            })
          }>
            <Loader state={isPending}>Confirmar</Loader>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateRaffle
