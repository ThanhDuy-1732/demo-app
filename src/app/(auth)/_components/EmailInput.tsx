// Utilities
import React from "react";

// Components
import { Form, Input } from "antd";

const emailRule = () => {
  return [
    {
      message: 'Email Invalid',
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
   }
  ]
}

type EmailInputProps = {
  name: string,
  label: string,
  placeholder: string,
}

const EmailInput: React.FC<React.PropsWithChildren<EmailInputProps>> = ({ name, label, placeholder }) => {
  return (
    <Form.Item
      name={name}
      label={label}
      rules={emailRule()}
      tooltip="Example: abcd@gmail.com"
    >
      <Input placeholder={placeholder} />
    </Form.Item>
  )
}

export default EmailInput;