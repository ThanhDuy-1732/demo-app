'use client';
// Utilities
import { PropsWithChildren, useCallback, useEffect, useMemo, useState } from "react";

// Stores
import useAuthStore from "@/app/(auth)/_services/auth.store";
import useAccountStore from "../../_services/my-account.store";
import useAlertStore from "@/components/Alert/services/alert.store";
import useLoadingStore from "@/components/Loading/services/loading.store";

// Components
import { Skeleton } from "antd";
import Detail from '@/app/(pages)/_components/PostDetail/PostDetail';

// APIs
import { PostData } from "../../_services/my-account.api";
import { MeData } from "@/app/(auth)/_services/auth.http";
import CommonAPI, { UserData } from "@/services/http/common.http";
import { CommentsData } from "@/app/(pages)/posts/_services/post.api";

// Constants
import { DEFAULT_LIMIT_PAGE, DEFAULT_SKIP_PAGE } from "@/services/constants";

type PostDetailProps = {
  params: {
    id: string,
  };
}

const PostDetail: React.FC<PropsWithChildren<PostDetailProps>> = ({ params }) => {
  const [user, setUser] = useState<UserData | {}>({});
  const getPost = useAccountStore((state) => state.getPost);
  const setMessage = useAlertStore((state) => state.addMessage);
  const me: MeData = useAuthStore((state) => state.me as MeData);
  const setLoading = useLoadingStore((state) => state.setLoading);
  const setComments = useAccountStore((state) => state.setComments);
  const saveComment = useAccountStore((state) => state.saveComment);
  const post: PostData = useAccountStore((state) => state.post as PostData);
  const getCommentsByPost = useAccountStore((state) => state.getCommentsByPost);
  const comments: CommentsData = useAccountStore((state) => state.comments as CommentsData);

  const commentData: CommentsData = useMemo(() => {
    return {
      ...comments,
      comments: (comments.comments || []).slice(comments.skip, comments.limit + comments.skip),
    }
  }, [comments])

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

  const getCommentWithPageChange = useCallback(({ limit, skip }: { limit: number, skip: number }) => {
    setComments({
      limit,
      skip,
    })
  }, [setComments]);

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
  }, [getPost, id, setLoading, setMessage]);

  const handleSaveComment = useCallback((content: string, postId: number) => {
    saveComment({
      body: content,
      likes: 0,
      postId,
      user: {
        id: me.id,
        username: me.username,
        fullName: `${me.firstName} ${me.lastName}`,
      }
    })
  }, [saveComment, me]);

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
            <Detail post={post} user={user as UserData} showComment={true} comments={commentData} getComment={getCommentWithPageChange} saveComment={handleSaveComment} />
          ) : (
            <Skeleton />
          )
        }
      </div>
    </>
  )
};

export default PostDetail;