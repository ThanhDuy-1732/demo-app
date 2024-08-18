// Utilities
import { useState, useEffect } from 'react';

// Components
import { Button, Form } from 'antd';
import type { FormInstance } from 'antd';

interface SubmitButtonProps {
  form: FormInstance;
  className?: string;
}

const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({ form, className, children }) => {
  const [disabled, setDisabled] = useState<boolean>(false);

  // Watch all values
  const values = Form.useWatch([], form);

  useEffect(() => {
    form.validateFields().then(() => {
      setDisabled(() => Object.keys(values || {}).length !== Object.values(values || {}).filter(Boolean).length);
    }).catch(() => {
      setDisabled(() => true);
    })
  }, [form, values]);

  return (
    <Button type="primary" className={className} htmlType="submit" disabled={disabled}>
      {children}
    </Button>
  );
};

export default SubmitButton;