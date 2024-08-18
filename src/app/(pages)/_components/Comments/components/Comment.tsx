import { CommentData } from "@/app/(pages)/posts/_services/post.api";
import { Avatar, Badge, Button } from "antd";
import { PropsWithChildren, ReactNode, useCallback } from "react";
import { LikeOutlined } from '@ant-design/icons';
import useAlertStore, { MessageType } from "@/components/Alert/services/alert.store";

export const Action: React.FC<PropsWithChildren<{ count: number, icon: ReactNode }>> = ({ count, icon }) => {
  return (
    <Badge count={count} showZero overflowCount={1000} size="small">
      <Avatar icon={icon} size="small" />
    </Badge>
  )
}

const Comment: React.FC<PropsWithChildren<{ comment: CommentData }>> = ({ comment }) => {
  const setMessage = useAlertStore((state) => state.addMessage);

  const handleLikeClick = useCallback(() => {
    setMessage({
      type: MessageType.warning,
      message: 'The feature is developing',
    })
  }, []);

  return (
    <>
      <div className="border-2 border-gray-200 rounded-xl p-2">
        <div className="flex justify-between">
          <div className="font-semibold">{ comment.user.fullName }</div>
          <Button type="text" className="w-fit h-fit" onClick={handleLikeClick}>
            <Action count={comment?.likes || 0} icon={<LikeOutlined />} />
          </Button>
        </div>

        <div>{ comment.body }</div>
      </div>
    </>
  )
}

export default Comment;