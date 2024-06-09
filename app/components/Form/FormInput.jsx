import { Checkbox, DatePicker, Form, Input, InputNumber, Select } from "antd"
const FormInput = ({input, formItemProps}) => {
  const field = (
    input.type === "text" ? <Input {...input} />
    : input.type === "password" ? <Input.Password {...input} />
    : input.type === "select" ? <Select {...input} labelInValue showSearch suffixIcon={null} />
    : input.type === "date" ? <DatePicker {...input} allowClear placeholder="YYYY-MM-DD" />
    : input.type === "number" ? <InputNumber {...input} />
    : input.type === "checkbox" ? <Checkbox {...input} />
    : null
  )
  return (
    <Form.Item {...formItemProps}> 
      {field}
    </Form.Item>
  )
}

export default FormInput