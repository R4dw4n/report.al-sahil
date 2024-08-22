'use client'
import { pushCol, emptyCols, addTableCols } from '@/app/redux/slices/reportDesign';
import { FloatButton } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import HeaderItem from './HeaderItem';
import { AiFillPrinter } from "react-icons/ai"
import { useTranslation } from 'react-i18next';
import Table from '../Table/Table';
// import {Table} from 'antd';
// Fetch the specific report design (array of header content and footer) and showcase it then print it
function ReportTable() {
  const { header } = useSelector(state => state.header);
  const { footer } = useSelector(state => state.footer);
  const { content } = useSelector(state => state.content);
  const { reportCols } = useSelector(state => state.report);
  const { dataSource } = useSelector(state => state.report);
  const { dataFunctions } = useSelector(state => state.report);
  const { reportName } = useSelector(state => state.report);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  // const [dataFunctions, setDataFunctions] = useState([{
  //   "id": 1001,
  //   "name": "MY NAME",
  //   "account": "MY ACCOUNT",
  //   "firstName": "Helmer",
  //   "lastName": "Stokes",
  //   "email": "Helmer.Stokes@dummyapis.com",
  //   "contactNumber": "4608297795",
  //   "age": 29,
  //   "dob": "02/10/1995",
  //   "salary": 1500,
  //   "address": "Address1"
  // },
  // {
  //   "id": 1002,
  //   "name": "MY NAME 2",
  //   "firstName": "Sherman",
  //   "lastName": "Armstrong",
  //   "email": "Sherman.Armstrong@dummyapis.com",
  //   "contactNumber": "4186490528",
  //   "age": 27,
  //   "dob": "17/11/1997",
  //   "salary": 2000,
  //   "address": "Address2"
  // },
  // {
  //   "id": 1002,
  //   "name": "MY NAME 2",
  //   "account": "MY ACCOUNT 2",
  //   "firstName": "Sherman",
  //   "lastName": "Armstrong",
  //   "email": "Sherman.Armstrong@dummyapis.com",
  //   "contactNumber": "4186490528",

  //   "dob": "17/11/1997",
  //   "salary": 2000,
  //   "address": "Address2"
  // },
  // {
  //   "id": 1002,
  //   "name": "MY NAME 2",
  //   "account": "MY ACCOUNT 2",
  //   "firstName": "Sherman",
  //   "lastName": "Armstrong",
  //   "email": "Sherman.Armstrong@dummyapis.com",
  //   "contactNumber": "4186490528",

  //   "dob": "17/11/1997",
  //   "salary": 2000,
  //   "address": "Address2"
  // },
  // ])
  // const [dataSource, setDataSource] = useState([
  //   {
  //     "id": 1001,
  //     "name": "MY NAME",
  //     "account": "MY ACCOUNT",
  //     "firstName": "Helmer",
  //     "lastName": "Stokes",
  //     "email": "Helmer.Stokes@dummyapis.com",
  //     "contactNumber": "4608297795",
  //     "age": 29,
  //     "dob": "02/10/1995",
  //     "salary": 1500,
  //     "address": "Address1"
  //   },
  //   {
  //     "id": 1002,
  //     "name": "MY NAME 2",
  //     "account": "MY ACCOUNT 2",
  //     "firstName": "Sherman",
  //     "lastName": "Armstrong",
  //     "email": "Sherman.Armstrong@dummyapis.com",
  //     "contactNumber": "4186490528",
  //     "age": 27,
  //     "dob": "17/11/1997",
  //     "salary": 2000,
  //     "address": "Address2"
  //   },
  //   {
  //     "id": 1003,
  //     "name": "MY NAME 3",
  //     "account": "MY ACCOUNT 3",
  //     "firstName": "Delphia",
  //     "lastName": "Schultz",
  //     "email": "Delphia.Schultz@dummyapis.com",
  //     "contactNumber": "4593198393",
  //     "age": 37,
  //     "dob": "24/01/1987",
  //     "salary": 3000,
  //     "address": "Address3"
  //   },
  // ]);
  useEffect(() => {
    dispatch(emptyCols());
    content.forEach((oneGrid, i) => {
      dispatch(addTableCols());
      oneGrid.grid.forEach((item, ind) => {
        const col = item.insideContent;
        dispatch(pushCol({
          i: i,
          title: col.header?.text,
          dataIndex: col.value?.fieldValue,
          key: [i, ind],
          render: (text, record) => {
            // Customize the cell color based on the value (e.g., > 50: red, otherwise: green)
            return {
              props: {
                style: { ...item?.insideContent?.header?.style }
              },
              children: text,
            };
          },
        }));
      })
    })
  }, [content]);

  const handlePrint = () => {
    window.print();
  }

  useEffect(() => { console.log(header); console.log(header.style) }, [header])
  useEffect(() => { console.log(footer) }, [footer])
  useEffect(() => { console.log(content) }, [content])
  useEffect(() => { console.log(reportCols) }, [reportCols])
  useEffect(() => { console.log(dataFunctions, "dataFunctions") }, [dataFunctions])
  // useEffect(() => { console.log(dataSource) }, [dataSource])

  return (
    <div className='p-10 '>
      <h1 className=' rounded-3xl  text-gray-700 m-auto mb-8 w-fit text-bold  text-5xl ' >{reportName}</h1>
      {header.map((oneHeader, i) => (
        <div className='flex items-center m-auto  justify-start mb-6 font-bold  p-4 flex-wrap gap-14' style={oneHeader.style} key={i}>
          {oneHeader.arr.map((item, ind) => (
            <div key={[i, ind]} className="min-w-24 h-20" >
              <HeaderItem item={item} />
            </div>
          ))}
        </div>
      ))}
      {content.map((oneContent, i) => {
        console.log(oneContent.style)
        return (
          <div className=' mb-4 py-2' style={oneContent.style} key={i}>
            <h1 className='text-3xl p-2 m-2 mt-6 text-center'>{oneContent.title}</h1>
            <Table data={oneContent} dataSource={dataSource} dataFunctions={dataFunctions} />
            {/* <Table columns={reportCols[i]} dataSource={dataSource} pagination={false} style={{width: '100%'}}/> */}
          </div>
        )
      })}

      {footer.map((oneFooter, i) => (
        <div className='flex items-center flex-wrap justify-start mb-4 font-bold mt-24 p-4 gap-14' style={oneFooter.style} key={i}>
          {oneFooter.arr.map((item, ind) => (
            <div key={[i, ind]} className="min-w-24 h-20" >
              <HeaderItem item={item} />
            </div>
          ))}
        </div>
      ))}
      <FloatButton
        onClick={handlePrint} className="print:hidden" type='primary'
        tooltip={<div className='print:hidden'>{t('print')}</div>}
        icon={<AiFillPrinter />}
      />
    </div>
  )
}

export default ReportTable