'use client';
// Utilities
import { useCallback, useEffect } from "react";

// Components
import { Skeleton } from "antd";
import ListPost from "../../_components/ListPosts/ListPosts";

// Stores
import useAccountStore from "../_services/my-account.store";
import useLoadingStore from "@/components/Loading/services/loading.store";
import useAlertStore, { MessageType } from "@/components/Alert/services/alert.store";

// APIs
import { PostsData } from "../_services/my-account.api";
import { SearchPosts } from "../../posts/_services/post.api";

// Constants
import { DEFAULT_LIMIT_PAGE } from "@/services/constants";

const MyPosts: React.FC = () => {
  const posts = useAccountStore((state) => state.posts);
  const userId = useAccountStore((state) => state.userId);
  const getPosts = useAccountStore((state) => state.getPosts);
  const getFilter = useAccountStore((state) => state.getFilter);
  const setMessage = useAlertStore((state) => state.addMessage);
  const setLoading = useLoadingStore((state) => state.setLoading);

  const getData = useCallback(async (data: SearchPosts = {}): Promise<void> => {
    try {
      setLoading(true);

      if (!userId) {
        return;
      }

      const query = {
        ...getFilter(),
        ...data,
      }

      await getPosts(query);
    } catch (error: any) {
      setMessage({
        message: error.message,
        type: MessageType.error,
      })
    } finally {
      setLoading(false);
    }
  }, [setLoading, getPosts, setMessage, userId, getFilter]);

  const handleChangePage = useCallback(({ limit, skip }: { limit: number, skip: number }): void => {
    getData({ limit, skip });
  }, [getData]);

  const handleGoToDetail = useCallback((id: number): string => {
    return `/my-account/posts/${id}`;
  }, []);

  useEffect(() => {
    getData({
      skip: 0,
      limit: DEFAULT_LIMIT_PAGE,
    });
  }, [getData]);

  return (
    <>
      <div className="flex flex-col w-full mt-2">
        {
          (posts as PostsData)?.posts ?
          (
            <>
              <div className="w-full max-w-[50rem] min-w-80 mx-auto">
                <ListPost data={(posts as PostsData)} search={handleChangePage} goTo={handleGoToDetail}  />
              </div>
            </>
          ) : (
            <>
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </>
          )
        }
      </div>
    </>
  )
};

export default MyPosts;