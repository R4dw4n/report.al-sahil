"use client";
import { setOpenFieldContent, setStyleObj } from "@/app/redux/slices/openField";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import DraggedDiv from "../Dragging/DraggedDiv";
import DropDiv from "../Dragging/DropDiv";
import { functions } from "../Toolbar/Toolbar";
import { compareArrays } from "./ReportHeader";

const translate = {
  0: "",
  1: "transition-transform transition-delay-500 translate-y-[-0.5rem] scale-105",
};

const sectionMap = {
  0: "header",
  1: "value",
  2: "footer",
}

function ReportContent(props) {
  const dispatch = useDispatch();

  const handleDragEnter = (index) => {
    props.setSwapOver([props.i, index]);
    if (!compareArrays(props.curr, [-1, -1])) props.setHovering(1);
    console.log(props.curr, [props.i, index]);

    console.log("HOVERING", props.hovering);
  };
  const handleUnhovering = () => {
    props.setHovering(0);
    props.setCurr([-1, -1]);
    // console.log("unhover", props.hovering);
  };

  //CELL HEADER INPUT
  const [input, toggleInput] = useState([-1, -1]);
  //CELL FOOTER INPUT
  const [footerInput, toggleFooterInput] = useState([-1, -1]);

  const handleShowInput = (e, i, index, key) => {
    console.log("showing input...");
    toggleInput([-1, -1]);
    toggleFooterInput([-1, -1]);
    let tmp = props.content[i].grid[index];
    tmp = {
      ...tmp,
      insideContent: { ...tmp.insideContent, [key]: {
        ...tmp.insideContent[key],
        text: e.target.value
      } },
    };
    let newContent = props.content[i].grid.map((item, ind) => {
      if (ind === index) return tmp;
      return item;
    });
    dispatch(props.setGrid({ i: i, data: [...newContent] }));
  };

  const inputRef = useRef(null);
  const footerInputRef = useRef(null);

  //GO BACK TO EDIT THE USE EFFECTS
  useEffect(() => {
    if (!compareArrays(input, [-1, -1])) {
      if (inputRef.current) inputRef.current.focus();
      dispatch(setOpenFieldContent([...input]))
      dispatch(setStyleObj({ ...props.content[input[0]].grid[input[1]].insideContent[sectionMap[input[2]]]?.style }));
    }
  }, [input]);

  useEffect(() => {
    if (!compareArrays(footerInput, [-1, -1])) {
      if (footerInputRef.current) footerInputRef.current.focus();
      dispatch(setOpenFieldContent([...footerInput]));
      dispatch(setStyleObj({ ...props.content[footerInput[0]].grid[footerInput[1]].insideContent[sectionMap[footerInput[2]]]?.style }));
    }
  }, [footerInput]);

  return (
    <>
      {props.content[props.i].grid.map((item, index) => {
        return (
          <DraggedDiv
            className={
              compareArrays(props.swapOver, [props.i, index])
                ? `@container flex flex-col shrink h-full w-64 ${
                    translate[props.hovering]
                  }`
                : `@container flex flex-col shrink h-full w-64`
            }
            data={{ ...item, dropType: ["swap"], array: "content" + props.i }}
            key={index}
            onDragEnter={() => handleDragEnter(index)}
            onDragEnd={() => handleUnhovering()}
            index={[props.i, index]}
            setCurr={props.setCurr}
          >
            <>
              <DropDiv
                i={props.i}
                data={props.content}
                setter={props.setGrid}
                index={index}
                setVisibleBox={toggleInput}
                className="flex items-center justify-center h-[33%] border-dotted border-2 border-[#ff0000] z-30"
                accept={["text"]}
                onDoubleClick={() => toggleInput([props.i, index, 0])}
                section={"header"}
                array={"content" + props.i}
              >
                {item.insideContent.header != undefined ? (
                  <>
                    {compareArrays(input, [props.i, index, 0]) ? (
                      <input
                        defaultValue={item.insideContent?.header?.text}
                        ref={inputRef}
                        className={`w-1/2 h-1/2 block outline-0 px-[12px] border-solid border border-[#89979b] rounded text[#21313c] transition-[border-color] duration-150 ease-in-out hover:shadow-[#e7eeec_0_0_0_3px]`}
                        onBlur={(e) =>
                          handleShowInput(e, props.i, index, "header")
                        }
                      />
                    ) : (
                      <h3 className={`block`} style={item?.insideContent?.header?.style}>{item.insideContent.header.text}</h3>
                    )}
                  </>
                ) : (
                  <p className="@[80px]:text-[16px] @[50px]:text-[12px] @[30px]:text-[8px]">
                    TEXT {index}
                  </p>
                )}
              </DropDiv>

              <DropDiv
                i={props.i}
                data={props.content}
                setter={props.setGrid}
                index={index}
                className="flex items-center justify-center h-[33%] border-dotted border-2 border-[#ff0000]"
                accept={["value"]}
                onDoubleClick={() => toggleInput([props.i, index, 1])}
                section={"value"}
                array={"content" + props.i}
              >
                {item.insideContent.value != undefined ? (
                  <h3 style={item?.insideContent?.value?.style}>{item.insideContent.value.text}</h3>
                ) : (
                  <p className="@[80px]:text-[16px] @[50px]:text-[12px] @[30px]:text-[8px]">
                    VALUES {index}
                  </p>
                )}
              </DropDiv>

              <DropDiv
                i={props.i}
                data={props.content}
                setter={props.setGrid}
                index={index}
                setVisibleBox={toggleFooterInput}
                className="flex items-center justify-center h-[33%] border-dotted border-2 border-[#ff0000]"
                accept={["text", "functions"]}
                onDoubleClick={() => toggleFooterInput([props.i, index, 2])}
                section={"footer"}
                array={"content"}
              >
                {item.insideContent.footer != undefined ? (
                  <>
                    {compareArrays(footerInput, [props.i, index, 2]) &&
                    !functions.some(
                      (func) => func === item.insideContent.footer?.text
                    ) ? (
                      <input
                        defaultValue={item.insideContent?.footer?.text}
                        ref={footerInputRef}
                        className={`w-1/2 h-1/2 block outline-0 px-[12px] border-solid border border-[#89979b] rounded text[#21313c] transition-[border-color] duration-150 ease-in-out hover:shadow-[#e7eeec_0_0_0_3px]`}
                        onBlur={(e) =>
                          handleShowInput(e, props.i, index, "footer")
                        }
                      />
                    ) : (
                      <h3 className={`block`} style={item?.insideContent?.footer?.style}>{item.insideContent?.footer?.text}</h3>
                    )}
                  </>
                ) : (
                  <p className="@[80px]:text-[16px] @[50px]:text-[12px] @[30px]:text-[8px]">
                    TEXT, FUNCTION {index}
                  </p>
                )}
              </DropDiv>
            </>
          </DraggedDiv>
        );
      })}
    </>
  );
}

export default ReportContent;
