"use client";
import { reportServices } from "@/app/api/services/reportServices";
import { setSelectedTables } from "@/app/redux/slices/reportDesign";
import { Checkbox } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import DraggedDiv from "../Dragging/DraggedDiv";

function ValuesTab() {
  //GET THE VALS FROM BACKEND (FIELDNAMES)
  const { t } = useTranslation();
  const { selectedTables } = useSelector(state => state.report);

  const [tables, setTables] = useState([]);
  const [fieldsData, setFieldsData] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (values) => {
    console.log('values', values);
    dispatch(setSelectedTables([...values]))
  };

  useEffect(() => {
    reportServices
      .getFields()
      .then((response) => {
        setFieldsData([...response.data.data.flatMap((item) => {
          return {...item}
        })]);
        setTables([
          ...response.data.data.flatMap((item) => {
            return { value: item.nameTable, label: item.nameTable };
          }),
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
    }, []);
    
    console.log(tables);
    console.log(fieldsData);
  return (
    <div className="w-full">
      <div className="px-6 py-2">
        <h2 className="text-3xl">{t("values")}</h2>
      </div>
      <div>
        <Checkbox.Group options={tables} onChange={handleChange} value={selectedTables}></Checkbox.Group>
      </div>
      <div className="w-full grid grid-cols-3 gap-2 mt-8">
        {fieldsData.map((item, index) => {
          if(selectedTables.find(table => table === item.nameTable)) {
            return item.fields.map((field, ind) => {
              return (
                <DraggedDiv
                  key={[index, ind]}
                  className="p-1 h-12 w-auto flex justify-center items-center bg-[#d9d9d9] font-semibold"
                  data={{
                    id_field: item.id,
                    value: field,
                    labelField: item.fieldsLabel[ind],
                    type: 'value',
                    dropType: ["inside_object"],
                  }}
                >
                  <h3 className="text-xs">{item.fieldsLabel[ind]}</h3>
                </DraggedDiv>
              );
            })
          }
        })}
      </div>
    </div>
  );
}

export default ValuesTab;
