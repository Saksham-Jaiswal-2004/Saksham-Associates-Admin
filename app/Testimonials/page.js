import React from 'react'
import FetchTestimonials from '../components/FetchTestimonials'
import { PageHeader } from '../components/DashboardWidgets'

export const dynamic = "force-dynamic";

const page = () => {
  return (
    <div className='space-y-6'>
      <PageHeader
        eyebrow="Client proof"
        title="Testimonials"
        description="Curate the strongest feedback and pair it with projects that show the finished result."
        actionHref="/AddTestimonials"
        actionLabel="Add testimonial"
      />

      <FetchTestimonials/>
    </div>
  )
}

export default page
