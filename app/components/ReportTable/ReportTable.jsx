'use client'
import { pushCol, emptyCols, addTableCols } from '@/app/redux/slices/reportDesign';
import { Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import HeaderItem from './HeaderItem';

// Fetch the specific report design (array of header content and footer) and showcase it then print it
function ReportTable() {
  const { header } = useSelector(state => state.header);
  const { footer } = useSelector(state => state.footer);
  const { content } = useSelector(state => state.content);
  const { reportCols } = useSelector(state => state.report);
  const dispatch = useDispatch();
  const [dataSource, setDataSource] = useState([
    {
      "id": 1001,
      "name": "MY NAME",
      "account": "MY ACCOUNT",
      "firstName": "Helmer",
      "lastName": "Stokes",
      "email": "Helmer.Stokes@dummyapis.com",
      "contactNumber": "4608297795",
      "age": 29,
      "dob": "02/10/1995",
      "salary": 1500,
      "address": "Address1"
    },
    {
      "id": 1002,
      "name": "MY NAME 2",
      "account": "MY ACCOUNT 2",
      "firstName": "Sherman",
      "lastName": "Armstrong",
      "email": "Sherman.Armstrong@dummyapis.com",
      "contactNumber": "4186490528",
      "age": 27,
      "dob": "17/11/1997",
      "salary": 2000,
      "address": "Address2"
    },
    {
      "id": 1003,
      "name": "MY NAME 3",
      "account": "MY ACCOUNT 3",
      "firstName": "Delphia",
      "lastName": "Schultz",
      "email": "Delphia.Schultz@dummyapis.com",
      "contactNumber": "4593198393",
      "age": 37,
      "dob": "24/01/1987",
      "salary": 3000,
      "address": "Address3"
    },
  ]);
  useEffect(() => {
    dispatch(emptyCols());
    content.forEach((oneGrid, i) => {
      dispatch(addTableCols());
      oneGrid.grid.forEach((item, ind) => {
        const col = item.insideContent;
        dispatch(pushCol({
          i: i,
          title: col.header,
          dataIndex: col.value,
          key: ind,
          render: (text, record) => {
            // Customize the cell color based on the value (e.g., > 50: red, otherwise: green)
            return {
                props: {
                    style: {...item?.style }
                },
                children: text,
            };
        },
        }));
      })
    })
  }, [content]);

  return (
    <div className='p-4 h-screen'>
      <div className='flex items-center justify-around mb-4 font-bold mt-24'>
        {header.map((oneHeader, i) => {
          console.log('oneHeader', oneHeader);
          return oneHeader.map((item, ind) => (
            <HeaderItem key={[i, ind]} item={item} />
          ))
        })}
      </div>
      {content.map((oneContent, i) => (
        <div className='w-full' key={i}>
          <h1 style={{fontSize: '64px'}}>{oneContent.title}</h1>
          <Table columns={reportCols[i]} dataSource={dataSource} pagination={false} style={{width: '100%'}}/>
        </div>
      ))}
      <div className='flex items-center justify-around p-4 font-bold'>
        {footer.map((oneFooter, i) => {
          return oneFooter.map((item, ind) => (
            <HeaderItem key={[i, ind]} item={item} />
          ))
        })}
      </div>
    </div>
  )
}

export default ReportTable