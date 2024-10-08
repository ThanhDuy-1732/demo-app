'use client';
// Utilities
import { useCallback, useEffect } from "react";

// Components
import { Skeleton } from "antd";
import Filter from "./_components/Filter/Filter";
import ListPost from "../_components/ListPosts/ListPosts";

// Stores
import usePostStore from "./_services/post.store";
import useLoadingStore from "@/components/Loading/services/loading.store";
import useAlertStore, { MessageType } from "@/components/Alert/services/alert.store";

// APIs
import { OrderEnum, PostsData, SearchPosts } from "./_services/post.api";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// Constants
import { DEFAULT_LIMIT_PAGE } from "@/services/constants";

const Posts: React.FC = () => {
  const router = useRouter();
  const pathName = usePathname();
  const param = useSearchParams();
  const posts = usePostStore((state) => state.posts);
  const getPosts = usePostStore((state) => state.getPosts);
  const getFilter = usePostStore((state) => state.getFilter);
  const setMessage = useAlertStore((state) => state.addMessage);
  const setLoading = useLoadingStore((state) => state.setLoading);

  const getData = useCallback(async (data: SearchPosts = {}): Promise<void> => {
    try {
      setLoading(true);

      const query = {
        ...getFilter(),
        ...data,
      }

      await getPosts(query);

      const searchParams = new URLSearchParams();
      Object.entries(query).forEach(([key, value]) => searchParams.set(key, value.toString()));

      router.replace(`${pathName}?${searchParams}`);
    } catch (error: any) {
      setMessage({
        message: error.message,
        type: MessageType.error,
      })
    } finally {
      setLoading(false);
    }
  }, [setLoading, getPosts, setMessage, getFilter, pathName, router]);

  const handleSearch = useCallback((sortBy: string, order: OrderEnum): void => {
    getData({
      sortBy,
      order,
    })
  }, [getData]);

  const handleChangePage = useCallback(({ limit, skip }: { limit: number, skip: number }): void => {
    getData({ limit, skip });
  }, [getData]);

  const handleGoToDetail = useCallback((id: number): string => {
    return `/posts/${id}`;
  }, []);

  useEffect(() => {
    const query: any = {};
    for (const [key, value] of param.entries()) {
      query[key as string] = value
    }
    
    getData({
      skip: 0,
      limit: DEFAULT_LIMIT_PAGE,
      ...query
    });
  }, [getData, param]);

  return (
    <>
      <div className="flex flex-col w-full mt-2">
        {
          (posts as PostsData)?.posts ?
          (
            <>
              <Filter search={handleSearch} />
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

export default Posts;