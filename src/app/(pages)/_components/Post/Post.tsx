// Utilities
import Link from "next/link";
import { formatNumber } from "@/services/libs";
import { PropsWithChildren, useMemo } from "react";

// APIs
import { PostData } from "../../posts/_services/post.api";

// Components
import { Button, Tag } from "antd";
import { EyeOutlined, ArrowRightOutlined, LikeOutlined } from '@ant-design/icons';

// Stores
import useAuthStore from "@/app/(auth)/_services/auth.store";

export type PostProps = {
  post: PostData,
  goTo: (id: number) => string,
}

const Content: React.FC<PropsWithChildren<PostProps>> = ({ post, goTo }) => {
  const myId = useAuthStore((state) => state.getMyId);

  const myPost: boolean = useMemo(() => {
    return myId() === post.userId;
  }, [post, myId]);

  return (
    <>
      <div className="w-full p-3 rounded-xl border-zinc-300 border-2 flex flex-col gap-2">
        <div className="text-center font-semibold text-lg">{ post.title }</div>
        <div className="flex flex-col-reverse lg:flex-row items-start justify-between lg:items-center">
          <div className="hidden lg:flex gap-2 items-center">
            <div>{ formatNumber(post.views) } <EyeOutlined /></div>
            <div>{ formatNumber(post?.reactions?.likes) } <LikeOutlined /></div>
          </div>
          <div className="flex gap-2">
            { 
              post.tags.map((tag, index) => {
                return (
                  <Tag key={`tag-${index}`} color="cyan">#{ tag }</Tag>
                )
              }) 
            }
            {
              myPost &&
              <Tag color="green">My Post</Tag>
            }
          </div>
        </div>
        <div className="line-clamp-3">{ post.body }</div>
        <div className="text-right">
            <Link href={goTo(post.id)}>
              <Button 
                type="dashed" 
                icon={<ArrowRightOutlined />}
              >
                <div className="hidden lg:block">Go to detail...</div>
              </Button>
            </Link>
        </div>
      </div>
    </>
  )
}

export default Content;