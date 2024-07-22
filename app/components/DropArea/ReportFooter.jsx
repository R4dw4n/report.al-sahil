import React, { useEffect } from "react";
import DraggedDiv from "../Dragging/DraggedDiv";
import UploadModal from "../uploadModal/UploadModal";
import { compareArrays } from "./ReportHeader";
import { useDispatch, useSelector } from "react-redux";
import ChangeStyleCard from "../ChangeStyleCard";


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
  };

  const dispatch = useDispatch();
  const { openStyle } = useSelector((state) => state.openField);


  useEffect(() => {
    console.log('footer inout from footer component', props.input)
  }, [props.input])

  return (
    <>

      {props.footer[props.i].arr.map((item, index) => {
        return (
          <DraggedDiv
            className={
              compareArrays([props.i, index], props.swapOver)
                ? `@container flex flex-col shrink h-full w-64 justify-center items-center ${translate[props.hovering]
                }`
                : `@container flex flex-col shrink h-full w-64 justify-center items-center`
            }
            data={{ ...item, dropType: ["swap"], array: 'footer' + props.i }}
            key={index}
            onDragEnter={() => handleDragEnter(index)}
            onDragEnd={() => handleUnhovering()}
            index={[props.i, index]}
            setCurr={props.setCurr}
            onDoubleClick={(e) => { e.stopPropagation(); props.toggleInput([props.i, index]), props.toggleContentInput([-1, -1]), props.toggleFooterContentInput([-1, -1]) }}
          >
            {item.type === "text" && compareArrays(props.input, [props.i, index]) ? (
              <div className="relative text-center w-full h-full">
                <input
                  defaultValue={item?.value}
                  ref={props.inputRef}
                  className={`w-1/2 h-full  m-auto block outline-0 px-[12px] border-solid border border-[#89979b] rounded text[#21313c] transition-[border-color] duration-150 ease-in-out hover:shadow-[#e7eeec_0_0_0_3px]`}
                  style={openStyle}
                  onBlur={(e) => {
                    e.stopPropagation();
                    props.handleShowInput(e, props.i, index, props.footer, props.setFooter)
                  }
                  }
                />
                <ChangeStyleCard from="footer" toggleInput={props.toggleInput} />
              </div>
            ) : (item.type === "text" || item.type === "date") ? (
              <h1 style={item?.style} className=" px-2 h-full flex justify-center text-center items-center">{item.value}</h1>
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