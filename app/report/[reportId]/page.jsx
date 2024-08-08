'use client'
import { reportServices } from '@/app/api/services/reportServices';
import Home from '@/app/components/Home/Home'
import { setCellId, setContent, setGridId } from '@/app/redux/slices/content';
import { setAllFooters, setFooterId } from '@/app/redux/slices/footer';
import { setAllHeaders, setHeaderId } from '@/app/redux/slices/header';
import { setReportName, setSelectedTables } from '@/app/redux/slices/reportDesign';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

function Page({ params }) {
  const dispatch = useDispatch();
  useEffect(() => {
    reportServices.showReport(params.reportId)
    .then(res => {
      const headerFooter = res.data.data.report.headerFooterReportes;
      const gridsData = res.data.data.report.grids;
      dispatch(setAllHeaders([...res.data.data.report.frontProperties.header]));
      dispatch(setContent([...res.data.data.report.frontProperties.content]));
      dispatch(setAllFooters([...res.data.data.report.frontProperties.footer]));
      dispatch(setReportName(res.data.data.report.name));
      dispatch(setSelectedTables([...res.data.data.report.tables_name]));
      // from here and under maybe delete because we will have no more ids
      headerFooter.map((item) => {
        if(item.location == 1) {
          dispatch(setFooterId({
            i: 0,
            index: item.index,
            id: item?.id,
          }))
        } else {
          dispatch(setHeaderId({
            i: 0,
            index: item.index,
            id: item?.id,
          }))
        }
      });
      dispatch(setGridId({
        i: 0,
        id: gridsData[0].id,
      }));
      gridsData.map((cell) => {
        cell.celles.map((item, ind) => {
          dispatch(setCellId({
            i: 0,
            ind: ind,
            id: item.id,
          }))
        })
      });
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