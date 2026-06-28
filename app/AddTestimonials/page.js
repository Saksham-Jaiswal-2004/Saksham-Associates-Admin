import React from 'react'
import AddTestimonial from '../components/AddTestimonial'
import { PageHeader } from '../components/DashboardWidgets'

export const dynamic = "force-dynamic";

const page = () => {
  return (
    <div className='space-y-6'>
      <PageHeader
        eyebrow="Social proof"
        title="Add new testimonial"
        description="Keep the review pipeline fresh by capturing client feedback while the project is still top of mind."
      />

      <AddTestimonial/>
    </div>
  )
}

export default page
