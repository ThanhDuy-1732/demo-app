'use client'
// Utilities
import Link from 'next/link'
import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';

// Components
import Title from '../_components/Title';
import { Button, Form, Input} from 'antd';
import SubmitButton from '../_components/SubmitButton';
import PasswordInput from '../_components/PasswordInput';

// Stores
import useAuthStore from '../_services/auth.store';
import useLoadingStore from '@/components/Loading/services/loading.store';
import useAlertStore, { MessageType } from '@/components/Alert/services/alert.store';

// APIs
import { SignInPayload } from '../_services/auth.http';

type FormValues = {
  username: string,
  password: string,
}

export default function Login() {
  const router = useRouter();
  const [form] = Form.useForm();
  const signIn = useAuthStore((state) => state.signIn);
  const addMessage = useAlertStore((state) => state.addMessage);
  const setLoading = useLoadingStore((state) => state.setLoading);

  const handleSubmitFormClick = useCallback(async (values: FormValues) => {
    try {
      setLoading(true);
      const payload: SignInPayload = {
        expiresInMins: 1440,
        username: values.username,
        password: values.password,
      };

      await signIn(payload);
      addMessage({
        type: MessageType.success,
        message: 'Login successfully!',
      })

      router.push('/posts');
    } catch (error: any) {
      addMessage({
        message: error.message,
        type: MessageType.error,
      })
    } finally {
      setLoading(false);
    }
  }, [addMessage, setLoading, signIn, router]);

  return (
    <div className="flex flex-col items-center w-full">
      <Title>Login to Demo App</Title>

      <Form
        form={form}
        layout="vertical"
        className='w-full'
        onFinish={handleSubmitFormClick}
      >
        <Form.Item
          name="username"
          label="Username"
        >
          <Input placeholder="Your username" />
        </Form.Item>
        <PasswordInput name='password' label='Password' placeholder='Your password' />

        <Form.Item className='text-center'>
          <SubmitButton className='w-60 lg:w-80 min-w-60' form={form}>Login</SubmitButton>
        </Form.Item>
      </Form>
      <div className='flex gap-1 items-center'>
        <span>Don’t have an account?</span>
        <Button className='w-fit text-base p-0' htmlType='button' type='link'>
          <Link className='w-full' href={'/register'}>Register</Link>
        </Button>
      </div>
    </div>
  )
}