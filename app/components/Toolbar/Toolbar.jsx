"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DraggedDiv from "../Dragging/DraggedDiv";
import { toolbarItems } from "./toolbarData";
import { useDispatch, useSelector } from "react-redux";
import { addGrid, setContentStyle } from "@/app/redux/slices/content";
import { ColorPicker, Input, InputNumber } from "antd";
import { compareArrays } from "../DropArea/ReportHeader";
import { FaCheck } from "react-icons/fa6";
import { useTranslation } from "react-i18next"
import {
  clearStyle,
  setOpenFieldContent,
  setOpenFieldFooter,
  setOpenFieldHeader,
  setStyleProp,
} from "@/app/redux/slices/openField";
import { setHeaderStyle } from "@/app/redux/slices/header";
import { setFooterStyle } from "@/app/redux/slices/footer";
import { reportServices } from "@/app/api/services/reportServices";
import { setReportName } from "@/app/redux/slices/reportDesign";
import { loginService } from "@/app/api/services/loginService";
import { useRouter } from "next/navigation";

export const functions = ["SUM", "AVERAGE", "MAX", "MIN", "DATE"];

const Toolbar = ({ updateFlag, id }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showFunctions, setShowFunctions] = useState(false);

  const { openFieldHeader } = useSelector((state) => state.openField);
  const { openFieldContent } = useSelector((state) => state.openField);
  const { openFieldFooter } = useSelector((state) => state.openField);
  const { openStyle } = useSelector((state) => state.openField);

  const { header } = useSelector((state) => state.header);
  const { content } = useSelector((state) => state.content);
  const { footer } = useSelector((state) => state.footer);
  const { selectedTables } = useSelector(state => state.report);
  const { reportName } = useSelector(state => state.report);

  const router = useRouter();
  const handleLogout = () => {
    loginService.logout()
    .then(res => {
      localStorage.removeItem("token");
      return router.push('/login')
    })
  }

  const closeEditor = () => {
    if (!compareArrays(openFieldHeader, [-1, -1])) {
      dispatch(
        setHeaderStyle({
          i: openFieldHeader[0],
          index: openFieldHeader[1],
          style: { ...openStyle },
        })
      );
    } else if (!compareArrays(openFieldContent, [-1, -1])) {
      dispatch(
        setContentStyle({
          i: openFieldContent[0],
          index: openFieldContent[1],
          style: { ...openStyle },
        })
      );
    } else {
      dispatch(
        setFooterStyle({
          i: openFieldFooter[0],
          index: openFieldFooter[1],
          style: { ...openStyle },
        })
      );
    }
    dispatch(setOpenFieldHeader([-1, -1]));
    dispatch(setOpenFieldContent([-1, -1]));
    dispatch(setOpenFieldFooter([-1, -1]));
    dispatch(clearStyle());
  };

  const saveReport = () => {
    reportServices.storeAll(
      reportServices.convertReportFromFrontToBack(
        reportName,
        [...selectedTables],
        [...header],
        [...content],
        [...footer],
        0, updateFlag? 1: 0,
        id,
      )
    );
  };

  return (
    <div className="fixed z-[100] top-0 flex w-full md:py-6 py-2 lg:px-16 md:px-8 px-4 items-center justify-between gap bg-[#eee] shadow-md">
      {/* logo */}
      <div className="flex justify-around items-center gap-6">
        <Link href="/">
          <Image
            src="/next.svg"
            width="170"
            height="50"
            alt="alsahil-logo"
            className="max-h-full max-w-32 sm:max-w-44"
          />
        </Link>
        <Link href={`/preview/${id}`}>PREVIEW</Link>
        <button
          className="p-2 bg-[#d9d9d9] cursor-pointer rounded-md"
          onClick={() => dispatch(addGrid())}
        >
          +{t("new_table")}
        </button>

        <button
          className="p-2 bg-[#d9d9d9] cursor-pointer rounded-md"
          onClick={saveReport}
        >
          {t("save")}
        </button>

        {/* SHOW FONT SIZE AND COLOR SETTINGS HERE */}
        {(!compareArrays(openFieldHeader, [-1, -1]) ||
          !compareArrays(openFieldContent, [-1, -1]) ||
          !compareArrays(openFieldFooter, [-1, -1])) && (
          <div className="flex gap-4 items-center">
            <div>
              <InputNumber
                className="w-28"
                min={4}
                max={100}
                defaultValue={16}
                addonAfter="px"
                value={parseInt(
                  openStyle?.fontSize?.slice(0, openStyle?.fontSize.length - 2)
                )}
                onChange={(val) =>
                  dispatch(
                    setStyleProp({ prop: "fontSize", value: val + "px" })
                  )
                }
              />
            </div>

            <div>
              <ColorPicker
                defaultValue="#000"
                value={openStyle?.color}
                onChange={(color) =>
                  dispatch(
                    setStyleProp({ prop: "color", value: color.toHexString() })
                  )
                }
              />
            </div>

            <div>
              <FaCheck
                className="text-[#599AFF] cursor-pointer"
                onClick={closeEditor}
              />
            </div>
          </div>
        )}
      </div>
      {/* buttons */}
      <div className="flex items-center gap-8">
        <div>
          <Input placeholder={t("report_name")} value={reportName} className="w-64" onChange={(e) => dispatch(setReportName(e.target.value))}/>
        </div>
        <ul className="flex gap-4">
          {toolbarItems.map((item, ind) => {
            if (item.dropDown) {
              return (
                <li
                  key={ind}
                  onMouseEnter={() => setShowFunctions(true)}
                  onMouseLeave={() => setShowFunctions(false)}
                  className="w-8 bg-[#d9d9d9] cursor-pointer rounded-md relative"
                >
                  <div
                    title={t(item.label)}
                    className="p-2 flex justify-center items-center gap-4 shadow-md rounded-md transition-all duration-200 hover:bg-[#999]"
                  >
                    {item.icon}
                  </div>
                  {showFunctions && (
                    <div className="absolute bg-[#f3f3f3] top-[33px] p-4 flex flex-col gap-2">
                      {item.dropDown.map((func, i) => (
                        <DraggedDiv
                          key={i}
                          className="p-2 w-full flex justify-center items-center gap-4 rounded-md text-xs hover:bg-[#e1e1e1]"
                          data={func}
                          ind={ind}
                        >
                          {func.icon} {t(func.label)}
                        </DraggedDiv>
                      ))}
                    </div>
                  )}
                </li>
              );
            } else
              return (
                <li
                  key={ind}
                  className="w-8 bg-[#d9d9d9] cursor-pointer rounded-md transition-all duration-200 hover:bg-[#999]"
                >
                  <div title={t(item.label)}>
                    <DraggedDiv
                      className="p-2 flex justify-center items-center gap-4 shadow-md rounded-md"
                      data={item}
                      ind={ind}
                    >
                      {item.icon}
                    </DraggedDiv>
                  </div>
                </li>
              );
          })}
        </ul>
        <button className="p-2 bg-[#d9d9d9] cursor-pointer rounded-md" onClick={handleLogout}>
          {t("logout")}
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
