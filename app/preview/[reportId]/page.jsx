import React from "react";
import PreviewComp from "./PreviewComp";

export function generateStaticParams() {
  return [{ reportId: '1' }, { reportId: '2' }, { reportId: '3' }]
}

function Page({ params }) {
  return <PreviewComp reportId={params.reportId} />;
}

// ...dataFunctions.flatMap((item, ind) => {
//   // console.log('item', item)
//   return { ...item };
// }),


export default Page;
