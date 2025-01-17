import { getRaffleInfo } from '@/actions/raffles'
import RafflesBreadCrumb from '@/components/global/bread-crumbs/raffles'
import RaffleBoard from '@/components/global/raffles/board'
import { PrefetchUserRaffle } from '@/react-query/prefetch'

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

import React from 'react'

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const info = await getRaffleInfo(params.id)
  return {
    title: info.data?.name,
  }
}

const Page = async ({ params }: Props) => {
  const query = new QueryClient()
  await PrefetchUserRaffle(query, params.id)  

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className=" flex flex-col items-center gap-y-20">
        <RafflesBreadCrumb id={params.id} />
        <RaffleBoard id={params.id}/>
      </div>
    </HydrationBoundary>
  )
}

export default Page
