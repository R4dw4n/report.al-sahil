'use client'
import React from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { useSelector } from "react-redux";
import DropDiv from '../Dragging/DropDiv';
import MainSection from "../DropArea/MainSection";
import Sidebar from '../Sidebar/Sidebar';
import Toolbar from '../Toolbar/Toolbar';

function Home({ updateFlag, id }) {
  const { isDragging } = useSelector(state => state.dragged);
  const { header } = useSelector(state => state.header);
  const { content } = useSelector(state => state.content);
  const { footer } = useSelector(state => state.footer);

  return (
    <div className="overflow-x-hidden">
      <Toolbar updateFlag={updateFlag} id={id} />
      <div className="flex pt-20">
        <Sidebar />
        {/* MAKE A DYNAMIC TABLE WITH LABEL AND VALUE DROP AREA FOR EACH CELL */}
        <MainSection />
      </div>
      {isDragging &&
        <DropDiv
          className="fixed w-24 h-12 bg-[#ff0000] bottom-0 left-1/2 rounded-t-[40px] text-white text-2xl flex justify-center items-center text-3xl opacity-70"
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