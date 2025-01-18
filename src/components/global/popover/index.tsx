import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
  trigger: JSX.Element
  children: React.ReactNode
  className?: string
}

const PopOver = ({ children, trigger, className }: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className={cn('shadow-lg rounded-xl bg-gradient-to-br text-white from-[#6d60a3] via-[#9434E6] to-[#CC3BD4]', className)}>
        {children}
      </PopoverContent>
    </Popover>
  )
}

export default PopOver
