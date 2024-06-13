"use client";
import { deleteContent } from "@/app/redux/slices/content";
import { setIsDragging } from "@/app/redux/slices/draggedSlice";
import { deleteFooter } from "@/app/redux/slices/footer";
import { deleteHeader } from "@/app/redux/slices/header";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export const deleteFromArray = (i, index, data, setData) => {
  //STORE INDEX IN THE ARRAY AND CHANGE IT WHEN SWAPPING...
  console.log(index, data);
  let tmpData = data;
  tmpData.splice(index, 1);
  tmpData = tmpData.map((item, i) => {
    return { ...item, index: i };
  });
  setData([...tmpData]);
};

function DropDiv(props) {
  const { draggedData } = useSelector((state) => state.dragged);
  // const { isDragging } = useSelector((state) => state.dragged);
  const dispatch = useDispatch();
  const handleDrop = (e) => {
    console.log("dragged", draggedData, props.index, props.accept);
    dispatch(setIsDragging(false));

    if (props.accept[0] === "deleting" && draggedData.array) {
      if (draggedData.array.startsWith("header"))
        dispatch(deleteHeader({i: draggedData.i, index: draggedData.index}))

      if (draggedData.array.startsWith("content"))
        dispatch(deleteContent({i: draggedData.i, index: draggedData.index}))

      if (draggedData.array.startsWith("footer"))
        dispatch(deleteFooter({i: draggedData.i, index: draggedData.index}))

      return null;
    }
    //NO DATA ARRAY TO DROP INTO
    if (props.data === null) return null;
    if (!props.accept.some((item) => item === draggedData.type)) return null;

    //FOR SWAPPING YOU NEED THE FUNCTION swapElements()
    if (
      draggedData.dropType.some((item) => item === "swap") &&
      props.swapElements &&
      props.array === draggedData.array
    ) {
      console.log("swapped here");
      props.swapElements();
      return null;
    }
    //TO DROP INSIDE AN OBJECT YOU NEED THE INDEX OF THE OBJECT AND TO CALL THE PROPERTY insideContent
    else if (
      draggedData.dropType.some((item) => item === "inside_object") &&
      props.index != undefined
    ) {
      console.log("insiding..", props.index);
      let tmp = props.data[props.i].grid[props.index];
      tmp = {
        ...tmp,
        insideContent: {
          ...tmp?.insideContent,
          id_field: draggedData?.id_field ? draggedData?.id_field: tmp?.insideContent?.id_field? tmp?.insideContent?.id_field: '',
          [props.section]: {
            text: draggedData?.labelField ? draggedData?.labelField: draggedData?.value? draggedData?.value: '',
          },
        },
      };
      let sectionMap = {
        'header': 0,
        'value': 1,
        'footer': 2,
      }
      let newData = props.data[props.i].grid.map((item, ind) => {
        if (ind === props.index) return tmp;
        return item;
      });
      dispatch(props.setter({ i: props.i, data: [...newData] }));
      console.log("inside dropped", newData);
      console.log("inside dropped in index", [props.i, props.index, props.section]);
      if (props.setVisibleBox) props.setVisibleBox([props.i, props.index, sectionMap[props.section]]);
      return null;
    } else if (draggedData.dropType.some((item) => item === "drop")) {
      // "i" is the index of the array, "index" is the index of the item in it's array.
      console.log("dropping", props.data[props.i]);
      if (draggedData.type === "add_column")
        dispatch(
          props.setter({
            i: props.i,
            item: { ...draggedData, index: props.data[props.i].grid.length, i: props.i },
          })
        );
      // props.setter([...props.data, {...draggedData, index: props.data.length}]);
      else if (draggedData.type === "text" || draggedData.type === "date") {
        if (props.setVisibleBox && draggedData.type !== "date")
          props.setVisibleBox([props.i, props.data[props.i].length]);

        dispatch(
          props.setter({
            i: props.i,
            item: {
              ...draggedData,
              value: draggedData?.value || "",
              index: props.data[props.i].length,
              i: props.i,
            },
          })
        );
      } else if (draggedData.type === "images") {
        dispatch(
          props.setter({
            i: props.i,
            item: {
              ...draggedData,
              image_path: "",
              index: props.data[props.i].length,
              i: props.i,
            },
          })
        );
      }
      console.log(props.data);
    }
  };
  return (
    <div
      onDrop={(e) => handleDrop(e)}
      onDragOver={(e) => e.preventDefault()}
      className={props.className}
      onDoubleClick={props.onDoubleClick}
    >
      {props.children}
    </div>
  );
}

export default DropDiv;
