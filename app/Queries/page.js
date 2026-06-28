import React from 'react'
import FetchData from '../components/FetchData'
import { PageHeader } from '../components/DashboardWidgets'

export const dynamic = "force-dynamic";

const page = () => {
  return (
    <div className='space-y-6'>
      <PageHeader
        eyebrow="Lead inbox"
        title="Queries"
        description="Review new enquiries, response time, and the conversations that need a quick follow-up."
      />

      <FetchData/>
    </div>
  )
}

export default page
