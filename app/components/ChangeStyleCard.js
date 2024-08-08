import React, { useEffect, useState } from 'react'
import { ColorPicker, InputNumber } from "antd";
import { IoIosClose } from "react-icons/io";
import {
    setOpenFieldHeader,
    setOpenFieldFooter,
    setOpenFieldContent,
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
    const { content } = useSelector(state => state.content)
    const { footer } = useSelector(state => state.footer)
    const { header } = useSelector(state => state.header)
    const closeEditor = () => {
        if (props.from === "header" || props.from === "footer") {
            if (props.from === "header") {
                dispatch(setOpenFieldHeader([-1, -1]));
            }
            else if (props.from === "footer") {
                dispatch(setOpenFieldFooter([-1, -1]));
            }
            props.toggleInput([-1, -1]);
        } else if (props.from.startsWith("content")) {
            props.toggleInput([-1, -1]);
            props.toggleFooterInput([-1, -1]);
            dispatch(setOpenFieldContent([-1, -1]));
        }
    };

    const [editStyle, setEditStyle] = useState({})
    useEffect(() => {
        let sectionMap = {
            0: 'header',
            1: 'value',
            2: 'footer',
        }
        if (props.from === 'header' && !compareArrays(openFieldHeader, [-1, -1])) {
            console.log(props.from)
            dispatch(
                setHeaderStyle({
                    i: openFieldHeader[0],
                    index: openFieldHeader[1],
                    style: { ...header[openFieldHeader[0]]?.arr[openFieldHeader[1]].style, ...editStyle },
                })
            );
            console.log(header[openFieldHeader[0]].arr[openFieldHeader[1]].style)
        }
        else if (props.from === "footer" && !compareArrays(openFieldFooter, [-1, -1]))
            dispatch(
                setFooterStyle({
                    i: openFieldFooter[0],
                    index: openFieldFooter[1],
                    style: { ...footer[openFieldFooter[0]].arr[openFieldFooter[1]].style, ...editStyle },
                })
            );
        else if (!compareArrays(openFieldContent, [-1, -1])) {
            if (props.from === 'content 3')
                dispatch(
                    // setStyleProp({ prop: "background", value: bg.toHexString() }),
                    setContentStyle({
                        ind: props.ind,
                        i: openFieldContent[0],
                        index: openFieldContent[1],
                        section: sectionMap[openFieldContent[2]],
                        style: { ...content[openFieldContent[0]].grid[openFieldContent[1]]?.insideContent?.footer[props.ind]?.style, ...editStyle },
                    })
                );
            else {
                if (props.from === 'content 1') {
                    dispatch(
                        // setStyleProp({ prop: "background", value: bg.toHexString() }),
                        setContentStyle({
                            i: openFieldContent[0],
                            index: openFieldContent[1],
                            section: sectionMap[openFieldContent[2]],
                            style: { ...content[openFieldContent[0]].grid[openFieldContent[1]]?.insideContent?.header?.style, ...editStyle },
                        })
                    );
                }
                else
                    dispatch(
                        // setStyleProp({ prop: "background", value: bg.toHexString() }),
                        setContentStyle({
                            i: openFieldContent[0],
                            index: openFieldContent[1],
                            section: sectionMap[openFieldContent[2]],
                            style: { ...content[openFieldContent[0]].grid[openFieldContent[1]]?.insideContent?.value?.style, ...editStyle },
                        })
                    );
            }
        }
    }, [editStyle])


    const fetchStyle = (prop) => {
        if (props.from === 'header')
            return header[openFieldHeader[0]]?.arr[openFieldHeader[1]]?.style[prop]
        else if (props.from === 'footer')
            return footer[openFieldFooter[0]]?.arr[openFieldFooter[1]]?.style[prop]
        else if (props.from === 'content 3')
            return content[openFieldContent[0]]?.grid[openFieldContent[1]]?.insideContent?.footer[props.ind]?.style[prop]
        else if (props.from === 'content 1')
            return content[openFieldContent[0]]?.grid[openFieldContent[1]]?.insideContent?.header?.style[prop]
        else
            return content[openFieldContent[0]]?.grid[openFieldContent[1]]?.insideContent?.value?.style[prop]

    }

    return (
        <div className=
            {(props.small)
                ? "flex-col p-1 gap-2 rounded-lg bg-gray-200 absolute left-[0] top-[70%] z-50 cursor-auto "
                : " flex-col  justify-center p-1 gap-3 rounded-lg bg-gray-200 absolute right-[0] cursor-auto top-[0] z-50 "}>
            <div className='z-[50]'>

                <div className="flex gap-1 mt-1 mb-1 justify-between ">
                    <div className="flex-col mt-[-3px] cursor-pointer" >
                        <h1 className="text-[8px] text-black">Text:</h1>
                        <ColorPicker
                            defaultValue={"#000"}
                            className=""
                            size="small"
                            value={fetchStyle('color')}
                            onChange={(color) => {
                                setEditStyle({ color: color.toHexString() })
                            }
                            }
                        />
                    </div>
                    < div className=" flex-col mt-[-3px] cursor-pointer " >
                        <h1 className="text-[8px] text-black">bg:</h1>
                        <ColorPicker
                            defaultValue={"#000000000"}
                            className=""
                            size='small'
                            value={fetchStyle('background')}
                            onChange={(bg) => {
                                setEditStyle({ background: bg.toHexString() })
                            }
                            }
                        />
                    </div>
                    {(!props.small) &&
                        <div className=" cursor-pointer text-2xl  border-black rounded-md flex items-center justify-center">
                            <IoIosClose
                                className="text-[#599AFF] cursor-pointer "
                                onClick={() => {
                                    closeEditor();
                                }
                                }
                            />
                        </div>}
                </div>
                <div className="flex ">
                    <div className="flex h-[26px] bg-white rounded-md cursor-pointer">
                        <InputNumber
                            className=
                            {(props.small)
                                ? "w-[38px]  border-none  rounded-md "
                                : "w-12  border-none  rounded-md "}
                            min={4}
                            max={props.maxFont ? props.maxFont : 40}
                            defaultValue={16}
                            value={fetchStyle('fontSize')}
                            onChange={(val) => {
                                setEditStyle({ fontSize: val })
                            }
                            }
                        />
                        {(!props.small) &&
                            <span className="flex items-center cursor-auto px-1 bg-transparent border-l-[1px] border-gray-300">px</span>}
                    </div>
                    {(props.small) &&
                        <div className=" cursor-pointer  text-2xl  border-black rounded-md flex items-center justify-center">
                            <IoIosClose
                                className="text-[#599AFF] cursor-pointer "
                                onClick={() => {
                                    closeEditor();
                                }}
                            />
                        </div>}
                </div>


            </div>
        </div>)
}

export default ChangeStyleCard
