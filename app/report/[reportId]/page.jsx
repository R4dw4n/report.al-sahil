"use client"
import { reportServices } from '@/app/api/services/reportServices';
import Home from '@/app/components/Home/Home'
import { setContent } from '@/app/redux/slices/content';
import { setAllFooters } from '@/app/redux/slices/footer';
import { setAllHeaders } from '@/app/redux/slices/header';
import { setReportName, setSelectedTables } from '@/app/redux/slices/reportDesign';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

function Page({ params }) {
  const dispatch = useDispatch();
  useEffect(() => {
    reportServices.showReport(params.reportId)
    .then(res => {
      dispatch(setAllHeaders([...res.data.data.report.frontProperties.header]));
      dispatch(setContent([...res.data.data.report.frontProperties.content]));
      dispatch(setAllFooters([...res.data.data.report.frontProperties.footer]));
      dispatch(setReportName(res.data.data.report.name));
      dispatch(setSelectedTables([...res.data.data.report.tables_name]));
    })
    .catch(err => {
      console.log(err);
    })
  }, [])
  return (
    <Home updateFlag={true} id={params.reportId} />
  )
}

export default Page