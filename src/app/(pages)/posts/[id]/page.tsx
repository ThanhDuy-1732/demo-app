'use client';
// Utilities
import { PropsWithChildren, useCallback, useEffect, useMemo, useState } from "react";

// Stores
import usePostStore from "../_services/post.store";
import useAuthStore from '@/app/(auth)/_services/auth.store';
import useAlertStore from "@/components/Alert/services/alert.store";
import useLoadingStore from "@/components/Loading/services/loading.store";

// Components
import { Skeleton } from "antd";
import Detail from '@/app/(pages)/_components/PostDetail/PostDetail';

// APIs
import { MeData } from '@/app/(auth)/_services/auth.http';
import { CommentsData, PostData } from "../_services/post.api";
import CommonAPI, { UserData } from "@/services/http/common.http";

// Constants
import { DEFAULT_LIMIT_PAGE, DEFAULT_SKIP_PAGE } from "@/services/constants";

type PostDetailProps = {
  params: {
    id: string,
  };
}

const PostDetail: React.FC<PropsWithChildren<PostDetailProps>> = ({ params }) => {
  const id = useMemo(() => params.id, [params]);
  const [user, setUser] = useState<UserData | {}>({});
  const getPost = usePostStore((state) => state.getPost);
  const setMessage = useAlertStore((state) => state.addMessage);
  const setComments = usePostStore((state) => state.setComments);
  const saveComment = usePostStore((state) => state.saveComment);
  const me: MeData = useAuthStore((state) => state.me as MeData);
  const setLoading = useLoadingStore((state) => state.setLoading);
  const post: PostData = usePostStore((state) => state.post as PostData);
  const getCommentsByPost = usePostStore((state) => state.getCommentsByPost);
  const comments: CommentsData = usePostStore((state) => state.comments as CommentsData);

  const commentData: CommentsData = useMemo(() => {
    return {
      ...comments,
      comments: (comments.comments || []).slice(comments.skip, comments.limit + comments.skip),
    }
  }, [comments])

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
      { skip, limit }
    )

    return;
  }, [getCommentsByPost, id]);

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