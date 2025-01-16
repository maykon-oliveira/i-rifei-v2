import RaffleList from '@/components/global/raffle-list'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-5">
      <div className="lg:col-span-4">
        <RaffleList />
      </div>
    </div>
  )
}

export default Page
