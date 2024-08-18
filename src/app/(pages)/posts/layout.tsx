'use client';
// Utilities
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

// Components
import UserInfo from "../_components/UserInfo/UserInfo";

// Stores
import usePostStore from "./_services/post.store";
import useLoadingStore from "@/components/Loading/services/loading.store";
import useAlertStore, { MessageType } from "@/components/Alert/services/alert.store";

// APIs
import { SearchPosts } from "./_services/post.api";

// Constants
import { DEFAULT_LIMIT_PAGE, DEFAULT_SKIP_PAGE } from "@/services/constants";

export default function PostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const pathName = usePathname();
  const getPosts = usePostStore((state) => state.getPosts);
  const setMessage = useAlertStore((state) => state.addMessage);
  const setLoading = useLoadingStore((state) => state.setLoading);

  const handleSearch = useCallback(async (keyword: string) => {
    try {
      setLoading(true);

      const query: SearchPosts = {
        keyword,
        skip: DEFAULT_SKIP_PAGE,
        limit: DEFAULT_LIMIT_PAGE,
      }

      if (pathName !== '/posts') {
        router.push('/posts');
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
  }, [])

  return (
    <>
      <UserInfo showSearch={true} search={handleSearch} />
      { children }
    </>
  )
}