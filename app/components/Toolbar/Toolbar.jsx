"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DraggedDiv from "../Dragging/DraggedDiv";
import { toolbarItems } from "./ToolbarData";
import { useDispatch, useSelector } from "react-redux";
import { addGrid } from "@/app/redux/slices/content";
import { Input } from "antd";
import { useTranslation } from "react-i18next";
import { reportServices } from "@/app/api/services/reportServices";
import { setReportName } from "@/app/redux/slices/reportDesign";
import { loginService } from "@/app/api/services/loginService";
import { useRouter } from "next/navigation";
export const functions = ["SUM", "AVERAGE", "MAX", "MIN", "DATE"];

const Toolbar = ({ updateFlag, id }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showFunctions, setShowFunctions] = useState(false);
  const { header } = useSelector((state) => state.header);
  const { content } = useSelector((state) => state.content);
  const { footer } = useSelector((state) => state.footer);
  const { selectedTables } = useSelector((state) => state.report);
  const { reportName } = useSelector((state) => state.report);
  const { mainPage } = useSelector((state) => state.mainPage);

  const router = useRouter();
  const handleLogout = () => {
    loginService.logout().then((res) => {
      localStorage.removeItem("token");
      return router.push("/login");
    });
  };

  const saveReport = () => {
      reportServices.storeAll(
        reportServices.convertReportFromFrontToBack(
          reportName,
          [...selectedTables],
          [...header],
          [...content],
          [...footer],
          updateFlag ? 1: 0,
          0,
          id
        )
      );
  };

  const decideClassName = (item) => {
    if (mainPage.availableOpers.length !== 0)
      if (mainPage.availableOpers.some((e) => e === item))
        return "p-2 flex justify-center items-center gap-4 shadow-lg rounded-md transition-all duration-200  scale-[110%] bg-[#c8c8c8]";
      else
        return "p-2 flex justify-center items-center gap-4 shadow-md rounded-md transition-all duration-200  opacity-[8%]";
    return "p-2 flex justify-center items-center gap-4 shadow-md rounded-md transition-all duration-200  hover:bg-[#c8c8c8]";
  };

  return (
    <div className="fixed z-[100] top-0 flex w-full md:py-4 py-2 lg:px-16 md:px-8 px-4 items-center justify-between gap bg-[#eee] shadow-md">
      {/* logo */}
      <div className="flex justify-around items-center gap-6">
        <Link href="/">
          <Image
            src="/alsahil_logo.png"
            width="65"
            height="10"
            alt="alsahil-logo"
            className="max-h-full max-w-32 sm:max-w-44"
          />
        </Link>
        {id && <Link href={`/preview/${id}`}>{t("preview")}</Link>}
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
      </div>
      {/* style for page */}
      {/* <div>
        <div className="flex-1 m-auto flex-col text-center pt-2" >  
          <ColorPicker
            defaultValue="#00000000"
            className=""
            value={mainPage?.style?.background}
            onChange={(background) => {
              dispatch(setMainPageStyle({ name: 'background', value: background.toHexString() }));
            }
            }
          />
          <h6 className="text-[10px] font-bold  text-gray-800">bg report</h6>
        </div>
      </div> */}
      {/* buttons */}
      <div className="flex items-center gap-8">
        <div>
          <Input
            placeholder={t("report_name")}
            value={reportName}
            className="w-64"
            onChange={(e) => dispatch(setReportName(e.target.value))}
          />
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
                    className={decideClassName(item.label)}
                    // "p-2 flex justify-center items-center gap-4 shadow-md rounded-md transition-all duration-200  hover:bg-[#999]"
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
                      className={decideClassName(item.type)}
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
        <button
          className="p-2 bg-[#d9d9d9] cursor-pointer rounded-md"
          onClick={handleLogout}
        >
          {t("logout")}
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
