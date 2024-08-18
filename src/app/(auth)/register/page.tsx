'use client'
// Utilities
import Link from 'next/link';
import React, { useCallback, useMemo } from 'react';

// Components
import Title from '../_components/Title';
import { Button, Form, Input} from 'antd';
import EmailInput from '../_components/EmailInput';
import SubmitButton from '../_components/SubmitButton';
import PasswordInput from '../_components/PasswordInput';

// Stores
import useAlertStore, { MessageType } from '@/components/Alert/services/alert.store';

enum InputType {
  TEXT = 'text',
  EMAIL = 'email',
  PASSWORD = 'password',
}

type Field = {
  name: string,
  label: string,
  type: InputType,
  placeholder: string,
}

export default function Register() {
  const [form] = Form.useForm();
  const setMessage = useAlertStore((state) => state.addMessage)

  const fields = useMemo<Array<Field>>(() => {
    return [
      {
        name: 'email',
        label: 'Email',
        type: InputType.EMAIL,
        placeholder: 'Your email',
      },
      {
        name: 'username',
        label: 'Username',
        type: InputType.TEXT,
        placeholder: 'Your username',
      },
      {
        name: 'fullname',
        label: 'Full name',
        type: InputType.TEXT,
        placeholder: 'Your full name',
      },
      {
        name: 'password',
        label: 'Password',
        type: InputType.PASSWORD,
        placeholder: 'Your password'
      }
    ]
  }, []);

  const handleRegisterClick = useCallback(() => {
    setMessage({
      type: MessageType.warning,
      message: 'The feature is developing',
    })
  }, [setMessage]);

  return (
    <div className="flex flex-col items-center w-full">
      <Title>Sign up for Demo App</Title>

      <Form
        form={form}
        layout="vertical"
        className='w-full'
        onFinish={handleRegisterClick}
      >
        {
          fields.map((field, index) => {
            if (field.type === InputType.EMAIL) {
              return <EmailInput key={index} {...field} />
            }

            if (field.type === InputType.PASSWORD) {
              return <PasswordInput key={index} {...field} />
            }

            return (
              <Form.Item
                label={field.label}
                name={field.name}
                key={index}
              >
                <Input placeholder={field.placeholder} />
              </Form.Item>
            )
          })
        }

        <Form.Item className='text-center'>
          <SubmitButton className='w-80 min-w-60' form={form}>Register</SubmitButton>
        </Form.Item>
      </Form>
      <div className='flex gap-1 items-center'>
        <span>Already have an account?</span>
        <Button className='w-fit text-base p-0' htmlType='button' type='link'>
          <Link className='w-full' href={'/login'}>Login</Link>
        </Button>
      </div>
    </div>
  )
}