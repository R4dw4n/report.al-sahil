"use client";
import { setOpenFieldContent, setStyleObj } from "@/app/redux/slices/openField";
import React, { useEffect, useRef, useState } from "react";
import DraggedDiv from "../Dragging/DraggedDiv";
import DropDiv from "../Dragging/DropDiv";
import { compareArrays } from "./ReportHeader";
import { useDispatch, useSelector } from "react-redux";
import ChangeStyleCard from "../ChangeStyleCard";
import { clearValidOpers, setValidOpers } from "../../redux/slices/main";
import { TiDelete } from "react-icons/ti";
import { deleteItemFromFooter } from "@/app/redux/slices/content";
import { editItemFromFooter } from "../../redux/slices/content";
import { TbBracketsAngle, TbMathMax, TbMathMin, TbSum } from "react-icons/tb";

const translate = {
  0: "",
  1: "transition-transform transition-delay-500 translate-y-[-0.5rem] scale-105",
};
const sectionMap = {
  0: "header",
  1: "value",
  2: "footer",
}
export const doNothing = (x) => { };

function ReportContent(props) {
  const dispatch = useDispatch();
  const handleDragEnter = (index) => {
    props.setSwapOver([props.i, index])
    if (!compareArrays(props.curr, [-1, -1])) props.setHovering(1);
  };
  const handleUnhovering = () => {
    props.setHovering(0);
    props.setCurr([-1, -1]);
    // console.log("unhover", props.hovering);
  };

  const [hoveringInd, setHoveringInd] = useState(-1)
  const handleShowInput = (e, i, index, key, ind) => {
    let tmp = props.content[i].grid[index];
    if (key === "footer") {
      dispatch(
        editItemFromFooter({ i: i, index: index, ind: ind, text: e.target.value })
      )
    }
    else {
      tmp = {
        ...tmp,
        insideContent: {
          ...tmp.insideContent, [key]: {
            ...tmp.insideContent[key],
            text: e.target.value
          }
        },
      };
      let newContent = props.content[i].grid.map((item, ind) => {
        if (ind === index) return tmp;
        return item;
      });
      dispatch(props.setGrid({ i: i, data: [...newContent] }));
    };
  }
  const inputRef = useRef(null);
  const footerInputRef = useRef(null);

  //GO BACK TO EDIT THE USE EFFECTS
  useEffect(() => {
    if (!compareArrays(props.contentInput, [-1, -1])) {
      if (inputRef.current) inputRef.current.focus();
      dispatch(setOpenFieldContent([...props.contentInput]))
      dispatch(setStyleObj({ ...props.content[props.contentInput[0]].grid[props.contentInput[1]].insideContent[sectionMap[props.contentInput[2]]]?.style }));
    }
  }, [props.contentInput]);
  useEffect(() => {
    if (!compareArrays(props.footerContentInput, [-1, -1])) {
      if (footerInputRef.current) footerInputRef.current.focus();
      dispatch(setOpenFieldContent([...props.footerContentInput]));
      dispatch(setStyleObj({ ...props.content[props.footerContentInput[0]].grid[props.footerContentInput[1]].insideContent[sectionMap[props.footerContentInput[2]]][props.footerContentInput[3]]?.style }));
    }
  }, [props.footerContentInput]);

  const { openStyle } = useSelector((state) => state.openField);
  const functionIcons = [
    {
      label: 'SUM',
      icon: <TbSum />,
    },
    {
      label: 'AVERAGE',
      icon: <TbBracketsAngle />,
    },
    {
      label: 'MAX',
      icon: <TbMathMax />,
    },
    {
      label: 'MIN',
      icon: <TbMathMin />,
    },
  ];
  const getFunctionIcon = (functionName) => {
    const match = functionIcons.find(item => functionName === item.label);
    if(match != undefined)
      return (match.icon);
    return <></>
  }

  return (
    <div className="h-full flex flex-wrap" >
      {props.content[props.i].grid.map((item, index) => {
      
        return (
          <DraggedDiv
            className={
              compareArrays(props.swapOver, [props.i, index])
                ? `@container flex flex-col shrink h-full w-[280px] flex-1  ${translate[props.hovering]
                }`
                : `@container flex flex-col shrink h-full w-[280px] flex-1`
            }
            data={{ ...item, dropType: ["swap"], array: "content" + props.i }}
            key={index}
            onDragEnter={() => handleDragEnter(index)}
            onDragEnd={() => handleUnhovering()}
            index={[props.i, index]}
            setCurr={props.setCurr}
          >
            
            <div className="h-full">
              <div
                onMouseEnter={() => {
                  dispatch(setValidOpers({ val: ["text"] }));
                }}
                onMouseLeave={() => dispatch(clearValidOpers())}
                className=" h-[33%] border-dotted border-2 border-[#ff0000]"
              >
                <DropDiv
                  i={props.i}
                  data={props.content}
                  setter={props.setGrid}
                  content={true}
                  index={index}
                  setVisibleBox={props.toggleContentInput}
                  accept={["text"]}
                  toggleTheOtherInput={props.toggleFooterContentInput}
                  toggleFooterInput={props.toggleFooterInput}
                  toggleHeaderInput={props.toggleHeaderInput}
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                    props.toggleFooterContentInput([-1, -1]);
                    props.toggleContentInput([props.i, index, 0]);
                    props.toggleFooterInput([-1, -1])
                    props.toggleHeaderInput([-1, -1])
                  }}
                  section={"header"}
                  array={"content" + props.i}   
                  className='h-full flex items-center justify-center relative'
                >
                  {item.insideContent?.header != undefined ? (
                    <>
                      {compareArrays(props.contentInput, [props.i, index, 0]) ? (
                        <div className="text-center w-full h-full relative  ">
                          <input
                            defaultValue={item.insideContent?.header?.text}
                            ref={inputRef}
                            className={`w-full h-full  m-auto block outline-0 px-[12px] border-solid border border-[#89979b] rounded text[#21313c] transition-[border-color] duration-150 ease-in-out hover:shadow-[#e7eeec_0_0_0_3px] background-transparent`}
                            style={item.insideContent?.header.style}
                            onBlur={(e) => {
                              e.stopPropagation();
                              handleShowInput(e, props.i, index, "header")
                            }}
                          />
                          <ChangeStyleCard from="content 1" section='header' toggleInput={props.toggleContentInput} toggleFooterInput={props.toggleFooterContentInput} />
                        </div>
                      ) : (
                        <h3 className={` h-full w-full flex justify-center items-center  text-center`} style={item?.insideContent?.header?.style}>{item.insideContent.header.text}</h3>
                      )
                      }
                    </>
                  ) : (
                    <p className="@[80px]:text-[16px] @[50px]:text-[12px] @[30px]:text-[8px] cursor-auto w-full h-full flex items-center  justify-center ">
                      COLUMN HEADER {index}
                    </p>
                  )}
                </DropDiv>
              </div>
              <div
                className="h-[33%] border-dotted border-2 border-[#ff0000]"
                onMouseEnter={() => {
                  dispatch(setValidOpers({ val: ["value"] }));
                }}
                onMouseLeave={() => dispatch(clearValidOpers())}
              >
                <DropDiv
                  i={props.i}
                  data={props.content}
                  setter={props.setGrid}
                  index={index}
                  content={true}
                  accept={["value"]}
                  setVisibleBox={props.toggleContentInput}
                  toggleFooterInput={props.toggleFooterInput}
                  toggleHeaderInput={props.toggleHeaderInput}
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                    props.toggleContentInput([props.i, index, 1]);
                    props.toggleFooterContentInput([-1, -1])
                    props.toggleFooterInput([-1, -1])
                    props.toggleHeaderInput([-1, -1])
                  }}
                  section={"value"}
                  array={"content" + props.i}
                  toggleTheOtherInput={props.toggleContentInput}
                  className="relative h-full flex items-center justify-center"
                >
                  {item.insideContent?.value != undefined ? (
                    <>
                      {compareArrays(props.contentInput, [props.i, index, 1]) &&
                        <>
                          <ChangeStyleCard from="content 2" section='value' toggleInput={props.toggleContentInput} toggleFooterInput={props.toggleFooterContentInput} />
                        </>
                      }
                      < h3 className={` h-full w-full flex justify-center items-center  text-center`} style={item?.insideContent?.value?.style}>{item.insideContent.value.text}</h3>
                    </>
                  ) : (
                    <p className="@[80px]:text-[16px] @[50px]:text-[12px] w-full h-full flex justify-center items-center @[30px]:text-[8px] cursor-auto">
                      COLUMN VALUE {index}
                    </p>
                  )}
                </DropDiv>
              </div>
              <div
                className="h-[33%] border-dotted border-2 border-[#ff0000]"
                onMouseEnter={() => {
                  dispatch(setValidOpers({ val: ["functions"] }));
                }}
                onMouseLeave={() => dispatch(clearValidOpers())}
              >
                < DropDiv
                  i={props.i}
                  data={props.content}
                  setter={props.setGrid}
                  index={index}
                  setVisibleBox={props.toggleFooterContentInput}
                  accept={["functions"]}
                  section={"footer"}
                  content={true}
                  array={"content" + props.i}
                  toggleFooterInput={props.toggleFooterInput}
                  toggleHeaderInput={props.toggleHeaderInput}
                  toggleTheOtherInput={props.toggleContentInput}
                  className='relative h-full w-full flex cursor-auto'
                >
                  {item.insideContent?.footer != undefined
                    ? (item.insideContent?.footer.map((foot, ind) => {
                      return (
                        <div key={ind} className=" border border-red-300 flex-1 cursor-pointer relative"
                          onDoubleClick={(e) => {
                            e.stopPropagation();
                            props.toggleContentInput([-1, -1])
                            props.toggleFooterContentInput([props.i, index, 2, ind])
                            props.toggleFooterInput([-1, -1])
                            props.toggleHeaderInput([-1, -1])
                          }}
                          onMouseEnter={() => {
                            setHoveringInd(ind)
                          }}
                          onMouseLeave={() => {
                            setHoveringInd(-1)
                          }}>
                          {(hoveringInd === ind) &&
                            <div className="absolute right-0 top-0 p-1 text-lg  cursor-pointer z-30"
                              style={{ color: foot.style.color ? foot.style.color : "#eee" }}
                              onClick={(e) => {
                                e.stopPropagation();
                                dispatch(
                                  deleteItemFromFooter({ ind: ind, i: props.i, index: index })
                                )
                              }} ><TiDelete /></div>}
                          <span className="w-full h-full text-5xl flex justify-center items-center text-gray-300 opacity-50 absolute bottom-0 left-0">{getFunctionIcon(foot?.function)}</span>
                          {compareArrays(props.footerContentInput, [props.i, index, 2, ind]) ? (
                            <div className="relative text-center w-full h-full">
                              <input
                                defaultValue={foot?.text}
                                ref={footerInputRef}
                                style={foot.style}
                                className={`w-full h-full m-auto block outline-0 px-[12px] border-solid border border-[#89979b] rounded text[#21313c] transition-[border-color] duration-150 ease-in-out hover:shadow-[#e7eeec_0_0_0_3px]`}
                                onBlur={(e) =>
                                  handleShowInput(e, props.i, index, "footer", ind)
                                }
                              />
                              <ChangeStyleCard from="content 3" ind={ind} toggleInput={props.toggleContentInput} toggleFooterInput={props.toggleFooterContentInput} small={1} maxFont={22} />
                            </div>
                          ) :
                            (<div className=" h-full text-center flex-col gap-1 justify-center items-center " style={foot?.style} >
                              <h3 className="pt-[8px] mb-[-5px]" >{foot?.text} </h3>
                              <span style={{ fontSize: foot?.style?.fontSize ? parseFloat(foot.style.fontSize) / 1.6 : 18 }}>
                                {foot?.function}
                              </span>
                            </div>
                            )}
                        </div>
                      )
                    }))
                    : <p className="@[80px]:text-[16px] @[50px]:text-[12px] w-full flex items-center justify-center @[30px]:text-[8px] cursor-auto">
                      COLUMN FOOTER {index}
                    </p>
                  }
                </DropDiv>
              </div>
            </div>
          </DraggedDiv>
        );
      })}
    </div>
  );
}

export default ReportContent;
