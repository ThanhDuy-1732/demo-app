'use client';
// Utilities
import { useRouter } from "next/navigation";
import { PropsWithChildren, ReactNode, useCallback } from "react";

// APIs
import { UserData } from "@/services/http/common.http";
import { CommentsData, PostData } from "../../posts/_services/post.api";

// Components
import Comments from "../Comments/Comments";
import { LeftOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Skeleton, Tag } from "antd";
import { LikeOutlined, DislikeOutlined, EyeOutlined } from '@ant-design/icons';

// Stores
import useAuthStore from "@/app/(auth)/_services/auth.store";
import useAlertStore, { MessageType } from "@/components/Alert/services/alert.store";

export type PostDetailProps = {
  post: PostData,
  user: UserData,
  showComment: boolean,
  comments?: CommentsData,
  saveComment: (comment: string, postId: number) => void,
  getComment: ({ limit, skip }: { limit: number, skip: number }) => void,
}

export const Author:React.FC<PropsWithChildren<{ author: UserData, myId: number }>> = ({ author, myId }) => {
  return (
    <div className="flex gap-1 justify-end items-center">
      Author:
      <span className="mx-1">
        { author.firstName } { author.lastName}
      </span>
      {
        myId === author?.id ?
        <Tag color="green">Me</Tag> :
        <></>
      }
      <Tag color="green" className="hidden lg:block">#{author.username}</Tag>
    </div>
  )
};

export const Action: React.FC<PropsWithChildren<{ count: number, icon: ReactNode }>> = ({ count, icon }) => {
  const setMessage = useAlertStore((state) => state.addMessage);

  const handleActionClick = useCallback(() => {
    setMessage({
      type: MessageType.warning,
      message: 'The feature is developing',
    })
  }, []);

  return (
    <Button type="text" className="h-fit w-fit" onClick={handleActionClick}>
      <Badge count={count} showZero overflowCount={10000}>
        <Avatar icon={icon} size="default" />
      </Badge>
    </Button>
  )
}

const PostDetail: React.FC<PropsWithChildren<PostDetailProps>> = ({ post, user, showComment, comments = {}, getComment, saveComment }) => {
  const router = useRouter();
  const myId = useAuthStore((state) => state.getMyId);

  const handleBackClick = useCallback(() => {
    router.back();
  }, [router]);

  const handleSaveComment = useCallback((content: string) => {
    saveComment(content, post.id);
  }, [post.id, saveComment]);

  return (
    <>
      <div className="flex flex-col items-start gap-2 lg:gap-0 lg:flex-row lg:items-center">
        <Button icon={<LeftOutlined />} onClick={handleBackClick}><div className="hidden lg:block">Back</div></Button>
        <div className="flex-1 lg:pr-[2rem] text-center text-xl font-semibold">{ post?.title }</div>
      </div>

      <div className="flex flex-col gap-2 mt-2 border-2 border-gray-300 p-2 rounded-xl">
        <Author author={user as UserData} myId={myId()} />
        <div>{ post.body }</div>
        <div className="flex flex-col-reverse gap-4 lg:gap-0 lg:flex-row justify-between mt-2 items-start lg:items-center">
          <div className="flex">
            <Action count={post?.views || 0} icon={<EyeOutlined />} />
            <Action count={post?.reactions?.likes || 0} icon={<LikeOutlined />} />
            <Action count={post?.reactions?.dislikes || 0} icon={<DislikeOutlined />} />
          </div>

          <div className="flex gap-2 items-center">
            <div>Tags: </div>
            {
              (post.tags || []).map((tag, index) => {
                return (
                  <Tag key={`tag-${index}`} color="cyan">#{tag}</Tag>
                )
              })
            }
          </div>
        </div>
      </div>

      {
        showComment && (comments as CommentsData)?.comments ?
        <Comments comments={comments as CommentsData} getComment={getComment} saveComment={handleSaveComment} /> :
        <Skeleton />
      }
    </>
  )
}

export default PostDetail;