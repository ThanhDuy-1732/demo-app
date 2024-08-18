'use client';
// Utilities
import { useCallback, useMemo } from "react";

// Stores
import useAlertStore, { MessageType } from "@/components/Alert/services/alert.store";

// Components
import { Button, Form, Input } from "antd";

type CommentValues = {
  content: string;
}

const AddComment: React.FC = () => {
  const [form] = Form.useForm();
  const values: CommentValues = Form.useWatch([], form);
  const setMessage = useAlertStore((state) => state.addMessage);
  const hasContent: boolean = useMemo(() => !!values?.content?.length, [values]);

  const handleAddCommentClick = useCallback(() => {
    setMessage({
      type: MessageType.warning,
      message: 'The feature is developing',
    })
  }, [setMessage]);

  return (
    <Form form={form} name="form" className="flex flex-row gap-2" onFinish={handleAddCommentClick}>
      <Form.Item name="content" className="w-11/12">
        <Input name="content" placeholder="Write your comment..." />
      </Form.Item>

      <Form.Item className="w-24">
        <Button className="w-full" disabled={!hasContent} htmlType="submit">Save</Button>
      </Form.Item>
    </Form>
  ) 
}

export default AddComment;