"use client";
import React, { useEffect } from "react";
import ReportTable from "@/app/components/ReportTable/ReportTable";
import { reportServices } from "@/app/api/services/reportServices";
import { useDispatch, useSelector } from "react-redux";
import { setDataSource, setReportName } from "@/app/redux/slices/reportDesign";
import { setAllHeaders } from "@/app/redux/slices/header";
import { setContent } from "@/app/redux/slices/content";
import { setAllFooters } from "@/app/redux/slices/footer";
import { setDataFunctions } from "../../redux/slices/reportDesign";

function Page({ params }) {
  const dispatch = useDispatch();
  useEffect(() => {
    reportServices
      .previewReport(params.reportId)
      .then((res) => {
        console.log(res);
        dispatch(
          setAllHeaders([...res.data.data.report.frontProperties.header])
        );
        dispatch(setContent([...res.data.data.report.frontProperties.content]));
        dispatch(
          setAllFooters([...res.data.data.report.frontProperties.footer])
        );
        dispatch(setReportName(res.data.data.report.name));

        const dataReport = res.data.data.dataReport;
        const dataFunctions = res.data.data.functions;
        console.log(dataReport, dataFunctions, 'dataReport')
        console.log(dataFunctions, 'dataFunctions')
        const data = [
          ...dataReport.flatMap((item, ind) => {
            // console.log('item', item)
            return [
              ...item.flatMap((item) => {
                return { ...item };
              }),
            ];
          }),
        ];
        const dataFun = [
          ...dataFunctions.flatMap((item, ind) => {
            console.log('item', item)
            return { ...item };
          })
        ]
        console.log(data, 'ready data');
        dispatch(setDataSource([...data]));
        dispatch(setDataFunctions(
          dataFun))
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <ReportTable />
  );
}

// ...dataFunctions.flatMap((item, ind) => {
//   // console.log('item', item)
//   return { ...item };
// }),


export default Page;
