'use client'
import { setDraggedData, setIsDragging } from '@/app/redux/slices/draggedSlice';
import React from 'react'
import { useDispatch } from 'react-redux';

function DraggedDiv(props) {
  const dispatch = useDispatch();
  const handleDrag = (e) => {
    dispatch(setDraggedData(props.data));
    dispatch(setIsDragging(true));
    //FOR SWAPPING AND SORTING
    if(props.setCurr) {
      props.setCurr(props.index);
    }
  }
  const handleDragEnd = (e) => {
    console.log('ENDED DRAGGING')
    if(props.onDragEnd != undefined)
      props.onDragEnd(e);
    dispatch(setIsDragging(false));
  }
  return (
    <div draggable onDragStart={handleDrag} className={props.className} onDragEnter={props.onDragEnter}
    onDragLeave={props.onDragLeave} onDragEnd={handleDragEnd} onDoubleClick={props.onDoubleClick}>
      {props.children}
    </div>
  )
}

export default DraggedDiv