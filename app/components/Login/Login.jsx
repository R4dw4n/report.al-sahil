//This component is used for login/register or any other form signing page
import { loginService } from "@/app/api/services/loginService"
import { Form } from "antd"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import FormInput from "../Form/FormInput"

const Login = (props) => {
  const paddingProp = {
    "94": "py-[96px]",
    "20": "py-[20px]"
  }
  const router = useRouter();
  const formFinish = (vals) => {
   
    loginService.login(vals)
      .then(response => {
        if (response.status === 200) {
          localStorage.setItem("token", response?.data?.data?.token);
          return router.back();
          // dispatch some data if you need
        }
      })
      .catch(err => {
        console.log("Connection Error", err);
      })
  }
  return (
    <div className="flex flex-wrap h-screen w-screen">
      <div className="w-[45%] p-8">
        <Image src={props.image} alt="Al-Sahil Logo" />
      </div>
      <div className={`${paddingProp[props.paddingY]} px-20 w-[55%] h-full`}>
        <div className="py-8">
          <h1 className="text-3xl font-semibold">{props.title}</h1>
          <p className="text-base text-lightgray font-light">{props.text}</p>
        </div>
        <Form layout="vertical" onFinish={formFinish} className="w-[80%]">
          {props.data.map((item, ind) => {
            return (
              <FormInput key={ind} input={item.input} formItemProps={item.formItemProps} />
            )
          })}
          <Form.Item>
            <button className="w-full h-12 border-none mt-4 font-[500] bg-[#387deb] hover:bg-[#1467ec] rounded-md" type="submit">
              {props.btnText}
            </button>
          </Form.Item>
        </Form>
        {/* FORM TAIL */}
        <div className="flex justify-between items-center mt-4 w-[80%]">
          {props.tail.map((item, ind) => (
            <Link key={ind} href={item.linkUrl} className="text-sm text-lightgray hover:text-black">
              {item.linkText}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Login