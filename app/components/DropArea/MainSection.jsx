import DropDiv from "../Dragging/DropDiv";
import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import ReportHeader, { compareArrays } from "./ReportHeader";
import ReportContent, { doNothing } from "./ReportContent";
import ReportFooter from "./ReportFooter";
import { useDispatch, useSelector } from "react-redux";
import { pushHeader, setHeader, setAllHeadersStyle } from "@/app/redux/slices/header";
import { pushFooter, setFooter, setAllFootersStyle } from "@/app/redux/slices/footer";
import { pushContent, setGrid, setTitle } from "@/app/redux/slices/content";
import { setOpenFieldFooter, setOpenFieldHeader, setStyleObj } from "@/app/redux/slices/openField";
import { ColorPicker } from "antd";
import { FaCheck } from "react-icons/fa6";
import { clearValidOpers, setMainPageStyle, setValidOpers } from "../../redux/slices/main"
import { setGridStyle } from "../../redux/slices/content";
function MainSection() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { mainPage } = useSelector((state) => state.mainPage);
  const { header } = useSelector((state) => state.header);
  const { content } = useSelector((state) => state.content);
  const { footer } = useSelector((state) => state.footer);

  //  console.log(content[0]?.grid[0]?.insideContent?.footer)

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
    let tmpContent = [...data[i].arr],
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


  //CELL HEADER content INPUT
  const [contentInput, toggleContentInput] = useState([-1, -1]);
  //CELL FOOTER content INPUT
  const [footerContentInput, toggleFooterContentInput] = useState([-1, -1]);

  //HEADER INPUT SHOWING
  const [input, toggleInput] = useState([-1, -1]);
  const [title, toggleTitle] = useState(-1);
  const [footerInput, toggleFooterInput] = useState([-1, -1]);
  const handleShowInput = (e, i, index, data, setData) => {
    let tmp = data[i].arr[index];
    console.log(tmp)
    tmp = { ...tmp, value: e.target.value };
    let newContent = data[i].arr.map((item, ind) => {
      if (ind === index) return tmp;
      return item;
    });
    console.log([...newContent])
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
      dispatch(setOpenFieldHeader([...input]));
      if (input[1] == -1) {
        dispatch(setStyleObj({ ...header[input[0]].style }))
      }
      else {
        dispatch(setStyleObj({ ...header[input[0]].arr[input[1]].style }));
      }
    }
  }, [input]);
  useEffect(() => {
    if (!compareArrays(footerInput, [-1, -1])) {
      if (footerInputRef.current) footerInputRef.current.focus();
      dispatch(setOpenFieldFooter([...footerInput]));
      if (footerInput[1] === -1)
        dispatch(setStyleObj({ ...footer[footerInput[0]].style }));
      else
        dispatch(setStyleObj({ ...footer[footerInput[0]].arr[footerInput[1]].style }));
    }
  }, [footerInput]);

  const [changeStyle, setChangeStyle] = useState([-1, -1])
  return (
    <div className="flex-1  h-full flex-col justify-center items-center  m-auto p-2 pt-12" style={mainPage.style} >
      {header.map((oneHead, i) => {
        return (
          <div key={i} onDoubleClick={() => { setChangeStyle([i, -1]) }} onMouseEnter={() => {
            dispatch(setValidOpers({ val: ["images", "text", "date"] }));
          }}
            onMouseLeave={() => dispatch(clearValidOpers())}
            className="relative cursor-pointer" style={oneHead?.style} >
            <DropDiv
              data={header}
              setter={pushHeader}
              toggleContentInput={toggleContentInput}
              toggleFooterContentInput={toggleFooterContentInput}
               toggleFooterInput={toggleFooterInput}
              i={i}
              swapElements={() =>
                handleSwap(header, setHeader, headerCurr, headerSwapOver, i)
              }
              className="w-full h-[125px] border-dotted border-2 border-[#333] my-2 flex justify-center items-center mb-6  "
              accept={["images", "text", "date"]}
              setVisibleBox={toggleInput}
              array={"header" + i}
              key={i}
            >
              {header[i].arr.length === 0 ? (
                <h1 className="font-bold text-3xl">{t("header")}</h1>
              ) : (
                <ReportHeader
                  i={i}
                  header={header}
                  headers={true}
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
                  toggleContentInput={toggleContentInput}
                  toggleFooterContentInput={toggleFooterContentInput}
                />
              )}
            </DropDiv>
            {compareArrays(changeStyle, [i, -1]) &&
              <div className="flex gap-2 mt-2 justify-center absolute top-0 right-0">
                <div >
                  <ColorPicker
                    defaultValue="#00000000"
                    className=""
                    value={oneHead?.style.background}
                    onChange={(color) => {
                      dispatch(setAllHeadersStyle({ i: i, name: "background", value: color.toHexString() }));
                    }
                    }
                  />
                </div>
                <div className="p-1 m-1 bg-gray-50 border-black rounded-md">
                  <FaCheck
                    className="text-[#599AFF] cursor-pointer"
                    onClick={() => {
                      setChangeStyle([-1, -1]);
                    }
                    }
                  />
                </div>
              </div>
            }
          </div>
        );
      })}


      {content.map((oneGrid, i) => {
        return (
          <div key={i} onDoubleClick={() => { setChangeStyle([i, -2]) }} className="relative cursor-pointer" style={oneGrid?.style} >
            <div key={i} className="my-16">
              <div
                className="w-full text-center flex justify-center items-center  p-4 "
                onDoubleClick={(e) =>{ toggleTitle(i); e.stopPropagation()}}
              >
                {title === i ? (
                  <input
                    defaultValue={oneGrid?.title}
                    ref={titleRef}
                    className="w-full h-full p-2 text-center"
                    onBlur={(e) => handleSetTitle(e, i)}
                  />
                ) : (
                  <h1 className="text-3xl w-fit h-full p-2 border-b-[2px] border-b-[#808080]">
                    {oneGrid.title ? oneGrid.title : t("report_title")}
                  </h1>
                )}
              </div>
              <div className="border-t-[12px] border-t-transparent"
                onMouseEnter={() => {
                  dispatch(setValidOpers({ val: ["add_column"] }));
                }}
                onMouseLeave={() => dispatch(clearValidOpers())}

              >
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
                  className="w-full h-[245px] border-dotted border-2 border-[#333]  flex justify-center items-center overflow-y-visible"
                  accept={["add_column"]}
                  array={"content" + i}
                  toggleTheOtherInput={doNothing}
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
                      toggleHeaderInput={toggleInput}
                      toggleFooterInput={toggleFooterInput}
                      toggleContentInput={toggleContentInput}
                      toggleFooterContentInput={toggleFooterContentInput}
                      footerContentInput={footerContentInput}
                      contentInput={contentInput}

                    />
                  )}
                </DropDiv>
              </div>
            </div>
            {compareArrays(changeStyle, [i, -2]) &&
              <div className="flex gap-2 mt-2 justify-center absolute top-0 right-0">
                <div >
                  <ColorPicker
                    defaultValue="#00000000"
                    className=""
                    value={oneGrid?.style?.background}
                    onChange={(color) => {
                      dispatch(setGridStyle({ i: i, name: 'background', value: color.toHexString() }));
                    }
                    }
                  />
                </div>
                <div className="p-1 m-1 bg-gray-50 border-black rounded-md">
                  <FaCheck
                    className="text-[#599AFF] cursor-pointer"
                    onClick={() => {
                      setChangeStyle([-1, -1]);
                    }
                    }
                  />
                </div>
              </div>
            }
          </div>
        );
      })}

      {footer.map((oneFoot, i) => {
        return (
          <div key={i} onDoubleClick={() => { setChangeStyle([i, -3]) }}
            onMouseEnter={() => {
              dispatch(setValidOpers({ val: ["images", "text"] }));
            }}
            onMouseLeave={() => dispatch(clearValidOpers())}

            className="relative cursor-pointer" style={oneFoot?.style} >
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
              toggleContentInput={toggleContentInput}
              toggleFooterContentInput={toggleFooterContentInput}
                toggleInput={toggleInput}
              
            >
              {footer[i].arr.length === 0 ? (
                <h1 className="font-bold text-3xl">{t("footer")}</h1>
              ) : (
                <ReportFooter
                  i={i}
                  footers={true}
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
                  toggleContentInput={toggleContentInput}
                  toggleFooterContentInput={toggleFooterContentInput}
                />
              )}
            </DropDiv>
            {(compareArrays(changeStyle, [i, -3]) && compareArrays(input, [-1, -1])) &&
              <div className="flex gap-2 mt-2 justify-center absolute top-0 right-0">
                <div >
                  <ColorPicker
                    defaultValue="#00000000"
                    className=""
                    value={oneFoot?.style.background}
                    onChange={(color) => {
                      dispatch(setAllFootersStyle({ i: i, name: "background", value: color.toHexString() }));
                    }
                    }
                  />
                </div>
                <div className="p-1 m-1 bg-gray-50 border-black rounded-md">
                  <FaCheck
                    className="text-[#599AFF] cursor-pointer"
                    onClick={() => {
                      setChangeStyle([-1, -1]);
                    }
                    }
                  />
                </div>
              </div>
            }
          </div>
        );
      })}
    </div>


  );
}

export default MainSection;
