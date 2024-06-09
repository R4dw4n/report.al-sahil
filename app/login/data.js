'use client'
const inputClassName = "bg-white hover:border-lightgray focus:border-lightgray h-10";
import { t } from "i18next"
export const loginData = [
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

export const loginTail = [
  {
    linkUrl: "/",
    linkText: t("forgot_password") + "?"
  }
];