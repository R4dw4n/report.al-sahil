'use client'
import React from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { useSelector, useState } from "react-redux";
import DropDiv from '../Dragging/DropDiv';
import MainSection from "../DropArea/MainSection";
import Sidebar from '../Sidebar/Sidebar';
import Toolbar from '../Toolbar/Toolbar';
import Table from "../Table/Table";
function Home({ updateFlag, id }) {
  const { isDragging } = useSelector(state => state.dragged);
  const { header } = useSelector(state => state.header);
  const { content } = useSelector(state => state.content);
  const { footer } = useSelector(state => state.footer);

  // const [dataFunctions, setDataFunctions] = useState([
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
  //   }
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

  return (
    <div className="overflow-x-hidden" >
      <Toolbar updateFlag={updateFlag} id={id} />
      <div className="flex pt-[84px]">
        <Sidebar />
        {/* MAKE A DYNAMIC TABLE WITH LABEL AND VALUE DROP AREA FOR EACH CELL */}
        <MainSection />
      </div>
      {/* <Table dataSource={dataSource} /> */}
      {isDragging &&
        <DropDiv
          className="fixed w-24 h-12 bg-[#ff0000] bottom-0 left-1/2 rounded-t-[40px] text-white flex justify-center items-center text-3xl opacity-70"
          accept={['deleting']}
          headerArray={header}
          contentArray={content}
          footerArray={footer}
        >
          <FaRegTrashCan />
        </DropDiv>
      }
    </div>
  );
}

export default Home