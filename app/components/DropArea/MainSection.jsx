import DropDiv from "../Dragging/DropDiv";
import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import ReportHeader, { compareArrays } from "./ReportHeader";
import ReportContent from "./ReportContent";
import ReportFooter from "./ReportFooter";
import { useDispatch, useSelector } from "react-redux";
import { pushHeader, setHeader } from "@/app/redux/slices/header";
import { pushFooter, setFooter } from "@/app/redux/slices/footer";
import { pushContent, setGrid, setTitle } from "@/app/redux/slices/content";
import { setOpenFieldFooter, setOpenFieldHeader, setStyleObj } from "@/app/redux/slices/openField";

function MainSection() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { header } = useSelector((state) => state.header);
  const { content } = useSelector((state) => state.content);
  const { footer } = useSelector((state) => state.footer);

  //REPORT HEADER STATES
  const [headerCurr, setHeaderCurr] = useState([-1, -1]);
  const [headerSwapOver, setHeaderSwapOver] = useState([-1, -1]);
  const [headerHovering, setHeaderHovering] = useState([-1, -1]);

  //REPORT CONTENT STATES
  const [contentCurr, setContentCurr] = useState([-1, -1]);
  const [contentSwapOver, setContentSwapOver] = useState([-1, -1]);
  const [contentHovering, setContentHovering] = useState(0);

  //REPORT FOOTER STATES
  const [footerCurr, setFooterCurr] = useState([-1, -1]);
  const [footerSwapOver, setFooterSwapOver] = useState([-1, -1]);
  const [footerHovering, setFooterHovering] = useState(0);

  const handleSwap = (data, setData, curr, swapOver, i) => {
    console.log("swapping...", curr, swapOver);
    let tmpContent = [...data[i]],
      x = { ...tmpContent[curr[1]] };

    tmpContent[curr[1]] = { ...tmpContent[swapOver[1]] };
    tmpContent[swapOver[1]] = { ...x };

    tmpContent[curr[1]] = { ...tmpContent[curr[1]], index: curr[1] };
    tmpContent[swapOver[1]] = {
      ...tmpContent[swapOver[1]],
      index: swapOver[1],
    };
    console.log('tmpContent', tmpContent);
    dispatch(setData({ i: i, data: [...tmpContent] }));
  };

  const handleGridSwap = (data, setData, curr, swapOver, i) => {
    console.log("swapping...", curr, swapOver);
    let tmpContent = [...data[i].grid],
      x = tmpContent[curr[1]];

    tmpContent[curr[1]] = { ...tmpContent[swapOver[1]] };
    tmpContent[swapOver[1]] = { ...x };

    tmpContent[curr[1]] = { ...tmpContent[curr[1]], index: curr[1] };
    tmpContent[swapOver[1]] = {
      ...tmpContent[swapOver[1]],
      index: swapOver[1],
    };

    dispatch(setData({ i: i, data: [...tmpContent] }));
  };

  //HEADER INPUT SHOWING
  const [input, toggleInput] = useState([-1, -1]);
  const [title, toggleTitle] = useState(-1);
  const [footerInput, toggleFooterInput] = useState([-1, -1]);
  
  const handleShowInput = (e, i, index, data, setData) => {
    console.log("showing input...");
    toggleInput([-1, -1]);
    toggleFooterInput([-1, -1]);
    let tmp = data[i][index];
    tmp = { ...tmp, value: e.target.value };
    let newContent = data[i].map((item, ind) => {
      if (ind === index) return tmp;
      return item;
    });
    dispatch(setData({ i: i, data: [...newContent] }));
  };

  const titleRef = useRef(null);
  const handleSetTitle = (e, i) => {
    dispatch(setTitle({ i: i, title: e.target.value }));
    toggleTitle(-1);
  };

  useEffect(() => {
    if (title !== -1) {
      if (titleRef.current) titleRef.current.focus();
    }
  }, [title]);

  const inputRef = useRef(null);
  const footerInputRef = useRef(null);
  useEffect(() => {
    if (!compareArrays(input, [-1, -1])) {
      if (inputRef.current) inputRef.current.focus();
      console.log(header[input[0]][input[1]], 'the open item')
      dispatch(setOpenFieldHeader([...input]));
      dispatch(setStyleObj({ ...header[input[0]][input[1]].style }));
    }
  }, [input]);
  useEffect(() => {
    if (!compareArrays(footerInput, [-1, -1])) {
      if (footerInputRef.current) footerInputRef.current.focus();
      dispatch(setOpenFieldFooter([...footerInput]));
      dispatch(setStyleObj({ ...footer[footerInput[0]][footerInput[1]].style }));
    }
  }, [footerInput]);

  return (
    <div className="flex-1 max-w-[1080px] p-2">
      {header.map((oneHead, i) => {
        return (
          <DropDiv
            data={header}
            setter={pushHeader}
            i={i}
            swapElements={() =>
              handleSwap(header, setHeader, headerCurr, headerSwapOver, i)
            }
            className="w-full h-[125px] border-dotted border-2 border-[#333] my-2 flex justify-center items-center mb-6"
            accept={["images", "text", "date"]}
            setVisibleBox={toggleInput}
            array={"header" + i}
            key={i}
          >
            {header[i].length === 0 ? (
              <h1 className="font-bold text-3xl">{t("header")}</h1>
            ) : (
              <ReportHeader
                i={i}
                header={header}
                setHeader={setHeader}
                curr={headerCurr}
                setCurr={setHeaderCurr}
                swapOver={headerSwapOver}
                setSwapOver={setHeaderSwapOver}
                hovering={headerHovering}
                setHovering={setHeaderHovering}
                input={input}
                inputRef={inputRef}
                handleShowInput={handleShowInput}
                toggleInput={toggleInput}
              />
            )}
          </DropDiv>
        );
      })}

      {content.map((oneGrid, i) => {
        return (
          <div key={i}>
            <div
              className="w-full h-[40px] text-center flex justify-center items-center"
              onDoubleClick={() => toggleTitle(i)}
            >
              {title === i ? (
                <input
                  defaultValue={oneGrid?.title}
                  ref={titleRef}
                  className="w-full h-full text-center"
                  onBlur={(e) => handleSetTitle(e, i)}
                />
              ) : (
                <h1 className="text-3xl w-fit h-full border-b-[2px] border-b-[#808080]">
                  {oneGrid.title ? oneGrid.title : t("report_title")}
                </h1>
              )}
            </div>
            <DropDiv
              swapElements={() =>
                handleGridSwap(
                  content,
                  setGrid,
                  contentCurr,
                  contentSwapOver,
                  i
                )
              }
              i={i}
              key={i}
              data={content}
              setter={pushContent}
              className="w-full h-[245px] border-dotted border-2 border-[#333] my-2 flex justify-center items-center overflow-y-visible"
              accept={["add_column"]}
              array={"content" + i}
            >
              {content[i].grid.length === 0 ? (
                <h1 className="font-bold text-3xl">{t("content")}</h1>
              ) : (
                <ReportContent
                  i={i}
                  content={content}
                  setGrid={setGrid}
                  curr={contentCurr}
                  setCurr={setContentCurr}
                  swapOver={contentSwapOver}
                  setSwapOver={setContentSwapOver}
                  hovering={contentHovering}
                  setHovering={setContentHovering}
                />
              )}
            </DropDiv>
          </div>
        );
      })}

      {footer.map((oneFoot, i) => {
        return (
          <DropDiv
            key={i}
            i={i}
            data={footer}
            setter={pushFooter}
            className="w-full h-[125px] border-dotted border-2 border-[#333] my-2 flex justify-center items-center mt-6"
            swapElements={() =>
              handleSwap(footer, setFooter, footerCurr, footerSwapOver, i)
            }
            accept={["images", "text"]}
            setVisibleBox={toggleFooterInput}
            array={"footer" + i}
          >
            {footer[i].length === 0 ? (
              <h1 className="font-bold text-3xl">{t("footer")}</h1>
            ) : (
              <ReportFooter
                i={i}
                footer={footer}
                setFooter={setFooter}
                curr={footerCurr}
                setCurr={setFooterCurr}
                swapOver={footerSwapOver}
                setSwapOver={setFooterSwapOver}
                hovering={footerHovering}
                setHovering={setFooterHovering}
                input={footerInput}
                inputRef={footerInputRef}
                handleShowInput={handleShowInput}
                toggleInput={toggleFooterInput}
              />
            )}
          </DropDiv>
        );
      })}
    </div>
  );
}

export default MainSection;
