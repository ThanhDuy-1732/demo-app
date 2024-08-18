// Utilities
import React, { useMemo } from "react";

// Components
import { Form, Input } from "antd";

const emailRule = () => {
  return [
    {
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: 'Email Invalid'
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
      label={label}
      name={name}
      tooltip="Example: abcd@gmail.com"
      rules={emailRule()}
    >
      <Input placeholder={placeholder} />
    </Form.Item>
  )
}

export default EmailInput;