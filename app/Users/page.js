import React from 'react'
import FetchUser from '../components/FetchUser'
import { PageHeader } from '../components/DashboardWidgets'

export const dynamic = "force-dynamic";

const page = () => {
  return (
    <div className='space-y-6'>
      <PageHeader
        eyebrow="CRM feed"
        title="Users"
        description="Keep the contact list clean and watch for returning clients or warm leads worth prioritising."
      />

      <FetchUser/>
    </div>
  )
}

export default page