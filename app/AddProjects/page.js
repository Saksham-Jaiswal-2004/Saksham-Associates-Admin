import React from 'react'
import Addproject from '../components/Addproject'
import { PageHeader } from '../components/DashboardWidgets'

export const dynamic = "force-dynamic";

const page = () => {
  return (
    <div className='space-y-6'>
      <PageHeader
        eyebrow="Capture scope"
        title="Add new project"
        description="Log a fresh interior project with room details, imagery, and the context the team needs to move fast."
      />

      <Addproject/>
    </div>
  )
}

export default page
