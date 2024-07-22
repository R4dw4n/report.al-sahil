import React from "react";
import DraggedDiv from "../Dragging/DraggedDiv";
import UploadModal from "../uploadModal/UploadModal";
import { useDispatch, useSelector } from "react-redux";
import ChangeStyleCard from "../ChangeStyleCard"
export const compareArrays = (arr1, arr2) => {
  if (arr1.length !== arr2.length)
    return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
};
const translate = {
  0: "",
  1: "transition-transform transition-delay-500 translate-y-[-0.5rem] scale-105",
};

function ReportHeader(props) {
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

  const dispatch = useDispatch();
  const { openStyle } = useSelector((state) => state.openField);

  return (
    <div className="flex gap-4 h-full" >
      {props.header[props.i].arr.map((item, index) => {
        return (
          <DraggedDiv
            className={
              compareArrays([props.i, index], props.swapOver)
                ? `@container flex flex-col shrink h-full w-64 justify-center items-center ${translate[props.hovering]
                } `
                : `@container flex flex-col shrink h-full w-64 justify-center items-center `
            }
            data={{ ...item, dropType: ["swap"], array: "header" + props.i }}
            key={index}
            onDragEnter={() => handleDragEnter(index)}
            onDragEnd={() => handleUnhovering()}
            index={[props.i, index]}
            setCurr={props.setCurr}
            onDoubleClick={(e) => {e.stopPropagation(); props.toggleInput([props.i, index]); props.toggleContentInput([-1,-1]), props.toggleFooterContentInput([-1,-1]) }}
          >
            {item.type === "text"
              && compareArrays(props.input, [props.i, index])
              ? (
                <div className="relative text-center w-full h-full">
                  <input
                    defaultValue={item?.value}
                    ref={props.inputRef}
                    style={openStyle}
                    className={`w-1/2 h-full  mx-auto block outline-0 px-[12px] border-solid border border-[#89979b] rounded text[#21313c] transition-[border-color] duration-150 ease-in-out hover:shadow-[#e7eeec_0_0_0_3px]`}
                    onBlur={(e) => {
                      e.stopPropagation();
                      props.handleShowInput(
                        e,
                        props.i,
                        index,
                        props.header,
                        props.setHeader
                      );
                    }
                    }
                  />
                  <ChangeStyleCard from="header" toggleInput={props.toggleInput} />
                </div>
              )
              : item.type === "text" || item.type === "date" ? (
                <h1 style={item?.style} className="h-full px-2 flex items-center justify-center text-center">{item.value}</h1>
              ) : item.type === "images" ? (
                <UploadModal
                  data={props.header}
                  setter={props.setHeader}
                  index={index}
                  i={props.i}
                />
              ) : (
                <p>NOTHING</p>
              )}
          </DraggedDiv>
        );
      })}

    </div>
  );
}

export default ReportHeader;
