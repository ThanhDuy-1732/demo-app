// Utilities
import React, { useMemo } from "react";

// Components
import { Form, Input } from "antd";

const TooltipPassword: React.FC = () => {
  const rules = useMemo(() => ([
    'At 8-20 characters',
  ]), []);

  return (
    <ul className="w-max max-w-full">
      { 
        rules.map((rule, index) => {
          return (
            <li key={index}>{ rule }</li>
          )
        })
      }
    </ul>
  )
}

const passwordRule = () => {
  return [
  //   {
  //     pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,20}$/,
  //     message: 'Password should 8-20 characters'
  //  }
  {
    pattern: /^.{8,20}$/,
    message: 'Password should 8-20 characters'
 }
  ]
}

type PasswordInputProps = {
  name: string,
  label: string,
  placeholder: string,
}

const PasswordInput: React.FC<React.PropsWithChildren<PasswordInputProps>> = ({ name, label, placeholder }) => {
  return (
    <Form.Item
      name={name}
      label={label}
      rules={passwordRule()}
      tooltip={<TooltipPassword />}
    >
      <Input.Password placeholder={placeholder} />
    </Form.Item>
  )
}

export default PasswordInput;