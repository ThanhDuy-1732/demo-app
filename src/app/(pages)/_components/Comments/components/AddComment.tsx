'use client';
// Utilities
import { PropsWithChildren, useCallback, useMemo } from "react";

// Components
import { Button, Form, Input } from "antd";

type CommentValues = {
  content: string;
}

type AddCommentProps = {
  saveComment: (comment: string) => void;
}

const AddComment: React.FC<PropsWithChildren<AddCommentProps>> = ({ saveComment }) => {
  const [form] = Form.useForm();
  const values: CommentValues = Form.useWatch([], form);
  const hasContent: boolean = useMemo(() => !!values?.content?.length, [values]);

  const handleAddCommentClick = useCallback((): void => {
    saveComment(values.content);
    form.resetFields();
  }, [saveComment, values, form]);

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