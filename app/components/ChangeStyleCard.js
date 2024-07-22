import React from 'react'
import { ColorPicker, InputNumber } from "antd";
import { FaCheck } from "react-icons/fa6";
import {
    setStyleProp,
    clearStyle,
    setOpenFieldHeader,
    setOpenFieldFooter,
    setOpenFieldContent
} from "@/app/redux/slices/openField";
import { setHeaderStyle } from "../redux/slices/header";
import { compareArrays } from './DropArea/ReportHeader';
import { useDispatch, useSelector } from 'react-redux';
import { setFooterStyle } from "@/app/redux/slices/footer";
import { setContentStyle } from "@/app/redux/slices/content";


const ChangeStyleCard = (props) => {
    const dispatch = useDispatch();
    const { openFieldHeader } = useSelector((state) => state.openField);
    const { openFieldFooter } = useSelector((state) => state.openField);
    const { openFieldContent } = useSelector((state) => state.openField);
    const { openStyle } = useSelector((state) => state.openField);
    const closeEditor = () => {
        if (props.from === "header" || props.from === "footer") {
            if (props.from === "header") {
                if (!compareArrays(openFieldHeader, [-1, -1])) {
                    console.log({ ...openStyle })
                    dispatch(
                        setHeaderStyle({
                            i: openFieldHeader[0],
                            index: openFieldHeader[1],
                            style: { ...openStyle },
                        })
                    );
                }
                dispatch(setOpenFieldHeader([-1, -1]));
            }
            else if (props.from === "footer") {
                if (!compareArrays(openFieldFooter, [-1, -1])) {
                    dispatch(
                        setFooterStyle({
                            i: openFieldFooter[0],
                            index: openFieldFooter[1],
                            style: { ...openStyle },
                        })
                    );
                }
                dispatch(setOpenFieldFooter([-1, -1]));
            }
            dispatch(clearStyle());
            props.toggleInput([-1, -1]);
        } else if (props.from === "content") {
            props.toggleInput([-1, -1]);
            props.toggleFooterInput([-1, -1]);
            if (!compareArrays(openFieldContent, [-1, -1])) {
                let sectionMap = {
                    0: 'header',
                    1: 'value',
                    2: 'footer',
                }
                dispatch(
                    setContentStyle({
                        ind: props.ind,
                        i: openFieldContent[0],
                        index: openFieldContent[1],
                        section: sectionMap[openFieldContent[2]],
                        style: { ...openStyle },
                    })
                );
            }
            dispatch(setOpenFieldContent([-1, -1]));
            dispatch(clearStyle());
        }
    };

    return (
        <div className=
            {(props.small)
                ? "flex-col p-1 gap-2 rounded-lg bg-gray-200 absolute left-[0] top-[70%] z-50 cursor-auto "
                : " flex-col  justify-center p-1 gap-3 rounded-lg bg-gray-200 absolute right-[0] cursor-auto top-[0] z-50 "}>
            {/* <div className=
                {(props.small)
                    // && "border-[20px] border-transparent border-l-gray-200 border-t-transparent absolute  top-[-10px]"
                    // : "border-[24px] border-transparent border-t-gray-200 border-b-transparent absolute  left-[-10px]"
                }></div> */}
            <div className='z-[50]'>
                <div className="flex h-[26px] bg-white rounded-md cursor-pointer">
                    <InputNumber
                        className=
                        {(props.small)
                            ? "w-[38px]  border-none  rounded-md "
                            : "w-12  border-none  rounded-md "}
                        min={4}
                        max={props.maxFont ? props.maxFont : 40}
                        defaultValue={16}
                        value={parseInt(
                            openStyle?.fontSize 
                        )}
                        onChange={(val) => {
                            dispatch(
                                setStyleProp({ prop: "fontSize", value: val + "px" }),
                            )
                        }
                        }
                    />
                    {(!props.small) &&
                        <span className="flex items-center cursor-auto px-1 bg-transparent border-l-[1px] border-gray-300">px</span>}
                    {(props.small) &&
                        <div className="p-1 cursor-pointer bg-gray-50 border-black rounded-md flex items-center justify-center">
                            <FaCheck
                                className="text-[#599AFF] cursor-pointer "
                                onClick={() => {
                                    closeEditor();
                                }
                                }
                            />
                        </div>}
                </div>
                <div className="flex gap-1 mt-2 justify-between ">
                    {(!props.small) &&
                        <div className="p-1 cursor-pointer bg-gray-50 border-black rounded-md flex items-center justify-center">
                            <FaCheck
                                className="text-[#599AFF] cursor-pointer "
                                onClick={() => {
                                    closeEditor();
                                }
                                }
                            />
                        </div>}
                    <div className="flex-col mt-[-3px] cursor-pointer" >
                        <h1 className="text-[8px] text-black">Text:</h1>
                        <ColorPicker
                            defaultValue={"#000"}
                            className=""
                            size="small"
                            value={openStyle?.color }
                            onChange={(color) => {
                                dispatch(
                                    setStyleProp({ prop: "color", value: color.toHexString() }),
                                );
                            }
                            }
                        />
                    </div>
                    <div className=" flex-col mt-[-3px] cursor-pointer " >
                        <h1 className="text-[8px] text-black">bg:</h1>
                        <ColorPicker
                            defaultValue={"#000000000"}
                            className=""
                            size='small'
                            value={openStyle?.background}
                            onChange={(bg) => {
                                dispatch(
                                    setStyleProp({ prop: "background", value: bg.toHexString() }),
                                );
                            }
                            }
                        />
                    </div>
                </div>
            </div>
        </div>)
}

export default ChangeStyleCard
