'use client';
import { PropsWithChildren, useCallback, useEffect, useMemo, useState } from "react";
import usePostStore from "../_services/post.store";
import useLoadingStore from "@/components/Loading/services/loading.store";
import useAlertStore from "@/components/Alert/services/alert.store";
import { Skeleton } from "antd";
import { CommentsData, PostData } from "../_services/post.api";
import CommonAPI, { UserData } from "@/services/http/common.http";
import Detail from '@/app/(pages)/_components/PostDetail/PostDetail';
import { DEFAULT_LIMIT_PAGE, DEFAULT_SKIP_PAGE } from "@/services/constants";

type PostDetailProps = {
  params: {
    id: string,
  };
}

const PostDetail: React.FC<PropsWithChildren<PostDetailProps>> = ({ params }) => {
  const [user, setUser] = useState<UserData | {}>({});
  const getPost = usePostStore((state) => state.getPost);
  const setMessage = useAlertStore((state) => state.addMessage);
  const setLoading = useLoadingStore((state) => state.setLoading);
  const post: PostData = usePostStore((state) => state.post as PostData);
  const getCommentsByPost = usePostStore((state) => state.getCommentsByPost);
  const comments: CommentsData = usePostStore((state) => state.comments as CommentsData);

  const id = useMemo(() => params.id, [params]);

  const getUserByPost = useCallback(() => {
    if (!post?.userId) {
      return;
    }

    const commonAPI = new CommonAPI();
    commonAPI.getUserById(post?.userId).then((response) => {
      setUser(() => response.data);
    }).catch((error: any) => {
      setMessage(error.message);
    });
  }, [post.userId]);

  const getComments = useCallback(({ limit, skip }: { limit: number, skip: number }) => {
    getCommentsByPost(
      Number(id), 
      { skip, limit })
  }, [getCommentsByPost])

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      await getPost(Number(id));
      getComments({
        skip: DEFAULT_SKIP_PAGE,
        limit: DEFAULT_LIMIT_PAGE,
      })
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }, [getPost, id, setLoading, setMessage])

  useEffect(() => {
    getUserByPost();
  }, [post.userId]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <div className="w-full max-w-[50rem] min-w-80 flex flex-col mx-auto mt-2 gap-2 px-2 lg:px-0 mb-2">
        {
          post.id ?
          (
            <Detail post={post} user={user as UserData} showComment={true} comments={comments} getComment={getComments} />
          ) : (
            <Skeleton />
          )
        }
      </div>
    </>
  )
};

export default PostDetail;