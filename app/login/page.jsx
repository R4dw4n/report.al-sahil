'use client'
import React from "react"
import Login from "../components/Login/Login"
// import { loginData, loginTail } from "./data"
import logo from "../../public/logo_al_sahil2.png"
import { useTranslation } from "react-i18next"
const inputClassName = "bg-white hover:border-lightgray focus:border-lightgray h-10";

const Page = () => {
  const { t } = useTranslation();
  const loginData = [
    {
      formItemProps: {
        name: "phone",
        label: t("phone_number"),
        rules: [
          {required: true, message: "Please enter your phone number"},
          {whitespace: true, message: "Phone number can't be empty"},
        ]
      },
      input: {
        type: "text",
        className: inputClassName,
      },
    },
    {
      formItemProps: {
        name: "password",
        label: t("password"),
        rules: [
          {required: true, message: "Please enter your Password"},
          {whitespace: true, message: "Password can't be empty"},
        ]
      },
      input: {
        type: "password",
        className: inputClassName,
      },
    },
  ];
  
  const loginTail = [
    {
      linkUrl: "/",
      linkText: t("forgot_password") + "?"
    }
  ];
  return (
    <Login image={logo}
      paddingY="94"
      title={t("welcome") + "!"}
      text={t("login_msg")}
      btnText={t("login")}
      data={loginData}
      tail={loginTail}
    />
  )
}

export default Page