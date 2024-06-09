import React from "react";
import DraggedDiv from "../Dragging/DraggedDiv";
import UploadModal from "../uploadModal/UploadModal";
import { compareArrays } from "./ReportHeader";

const translate = {
  0: "",
  1: "transition-transform transition-delay-500 translate-y-[-0.5rem] scale-105",
};

function ReportFooter(props) {
  const handleDragEnter = (index) => {
    props.setSwapOver([props.i, index]);
    if (!compareArrays(props.curr, [-1, -1])) props.setHovering(1);
    console.log(props.curr, [props.i, index]);

    console.log("HOVERING", props.hovering)
  };
  const handleUnhovering = () => {
    props.setHovering(0);
    props.setCurr([-1, -1]);
    // console.log("unhover", props.hovering);
  };

  return (
    <>
      {props.footer[props.i].map((item, index) => {
        return (
          <DraggedDiv
            className={
              compareArrays([props.i, index], props.swapOver)
                ? `@container flex flex-col shrink h-full w-64 flex justify-center items-center ${
                    translate[props.hovering]
                  }`
                : `@container flex flex-col shrink h-full w-64 flex justify-center items-center`
            }
            data={{ ...item, dropType: ["swap"], array: 'footer' + props.i }}
            key={index}
            onDragEnter={() => handleDragEnter(index)}
            onDragEnd={() => handleUnhovering()}
            index={[props.i, index]}
            setCurr={props.setCurr}
            onDoubleClick={() => props.toggleInput([props.i, index])}
          >
            {item.type === "text" && compareArrays(props.input, [props.i, index]) ? (
              <input
                defaultValue={item?.value}
                ref={props.inputRef}
                className={`w-1/2 h-1/2 block outline-0 px-[12px] border-solid border border-[#89979b] rounded text[#21313c] transition-[border-color] duration-150 ease-in-out hover:shadow-[0_0_0_3px_#e7eeec]`}
                onBlur={(e) =>
                  props.handleShowInput(e, props.i, index, props.footer, props.setFooter)
                }
              />
            ) : (item.type === "text" || item.type === "date") ? (
              <h1 style={item?.style}>{item.value}</h1>
            ) : item.type === "images" ? (
              <UploadModal data={props.footer} setter={props.setFooter} i={props.i} index={index} />
            ) : <p>NOTHING</p>
            }
          </DraggedDiv>
        );
      })}
    </>
  );
}

export default ReportFooter;