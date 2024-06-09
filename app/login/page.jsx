'use client'
import React from "react"
import Login from "../components/Login/Login"
import { loginData, loginTail } from "./data"
import logo from "../../public/logo_al_sahil2.png"
import { useTranslation } from "react-i18next"

const Page = () => {
  const { t } = useTranslation();
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