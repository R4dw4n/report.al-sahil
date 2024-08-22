import React from 'react'
import ReportIdComponent from './reportIdComponent';

export function generateStaticParams() {
  return [{ reportId: '1' }, { reportId: '2' }, { reportId: '3' }]
}

function Page({ params }) {
  return (
    <ReportIdComponent reportId={params.reportId} />
  )
}

export default Page