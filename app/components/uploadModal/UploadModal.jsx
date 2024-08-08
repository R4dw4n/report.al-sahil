'use client'
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import { useDispatch } from "react-redux";
import { reportServices } from "@/app/api/services/reportServices";
import { HOST } from "@/app/api/axiosInstance";

export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const UploadModal = (props) => {
  const dispatch = useDispatch();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const [fileList, setFileList] = useState(
    props.data[props.i].arr[props.index]?.image_path ? [{
      uid: -10,
      url: HOST + "/storage/" + props.data[props.i].arr[props.index]?.image_path,
      thumbUrl: HOST + "/storage/" + props.data[props.i].arr[props.index]?.image_path,
      status: 'done',
    }] : []
  );

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = (newFileList, file, dispatch) => {
    setFileList([...newFileList]);
    const data = [...props.data];
    const tmpData = [...data[props.i].arr];
    let tmp = { ...tmpData[props.index] };
    console.log('file', file);
    if (file.status === 'removed') {
      reportServices.removeImage({ image_path: tmp.image_path })
        .then(res => {
          tmp = { ...tmp, image_path: "" };
          let newData = tmpData.map((item, ind) => {
            if (ind === props.index) return { ...tmp };
            return { ...item };
          });
          dispatch(props.setter({ i: props.i, data: [...newData] }));
        })
        .catch(err => console.log(err))
    }
    else {
      console.log('adding', file.originFileObj)
      reportServices.addImage({image: file.originFileObj})
        .then(res => {
          tmp = { ...tmp, image_path: res.data.data };
          let newData = tmpData.map((item, ind) => {
            if (ind === props.index) return { ...tmp };
            return { ...item };
          });
          dispatch(props.setter({ i: props.i, data: [...newData] }));
          setFileList([{
            ...newFileList[0],
            url: HOST + "/storage/" + res.data.data,
            thumbUrl: HOST + "/storage/" + res.data.data,
          }])
        })
        .catch(err => console.log(err))
    }
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  return (
    <>
      <Upload
        action=""
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={({ fileList: newFileList, file: file }) =>
          handleChange(newFileList, file, dispatch)
        }
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: "none",
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default UploadModal;
