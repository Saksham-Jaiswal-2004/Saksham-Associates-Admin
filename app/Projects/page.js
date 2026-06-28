import React from 'react'
import FetchProjects from '../components/FetchProjects'
import { PageHeader } from '../components/DashboardWidgets'

export const dynamic = "force-dynamic";

const page = () => {
  return (
    <div className='space-y-6'>
      <PageHeader
        eyebrow="Project pipeline"
        title="Projects"
        description="Track active interiors, approved concepts, and delivery timelines from a calmer, more readable board."
        actionHref="/AddProjects"
        actionLabel="Add project"
      />

      <FetchProjects />
    </div>
  )
}

export default page
