// Utilities
import { create } from "zustand"

// APIs
import PostAPI, { CommentsData, CommentsQuery, PostData, PostsData, SearchPosts } from "@/app/(pages)/posts/_services/post.api";

// Constants
import { DEFAULT_LIMIT_PAGE, DEFAULT_SKIP_PAGE } from "@/services/constants"

// APIs
import AccountAPI from "./my-account.api";

export type AccountState = {
  userId: number;
  post: PostData | {},
  posts: PostsData | {},
  filter: SearchPosts | {},
  comments: CommentsData | {},
}

export type AccountAction = {
  reset: () => void,
  setUserId: (userId: number) => void,
  getPost: (id: number) => Promise<void>,
  setPost: (post: AccountState['post']) => void,
  setPosts: (posts: AccountState['posts']) => void,
  setFilter: (filter: AccountState['filter']) => void,
  setComments: (comments: AccountState['comments']) => void,
  getPosts: (filter?: AccountState['filter']) => Promise<void>,
  getCommentsByPost: (id: number, query: CommentsQuery) => Promise<void>,
}

const useAccountStore = create<AccountState & AccountAction>((set, get) => {
  const setPost = (post: AccountState['post']) => {
    set(() => ({ post }));
  };

  const setPosts = (posts: AccountState['posts']) => {
    set(() => ({ posts }));
  };

  const setFilter = (filter: AccountState['filter']) => {
    set(() => ({ filter }));
  }

  const setComments = (comments: AccountState['comments']) => {
    set(() => ({ comments }));
  };

  const setUserId = (userId: number) => (set(() => ({ userId })));

  const reset = () => {
    setPost({});
    setPosts([]);
    setUserId(0);
    setFilter({});
    setComments({});
  }

  const getPosts = async (filter?: AccountState['filter']) => {
    if (filter) {
      setFilter(filter);
    }

    const api = new AccountAPI();

    const response = await api.getPosts(get().userId, get().filter);

    setPosts(response?.data);
  }

  const getPost = async (id: number) => {
    const api = new PostAPI();

    const response = await api.getPost(id);

    setPost(response?.data);
  }

  const getCommentsByPost = async (id: number, query: CommentsQuery) => {
    const api = new PostAPI();
    const response = await api.getCommentByPost(id, query);
    setComments(response?.data);
  }
  
  return {
    post: {},
    userId: 0,
    posts: {},
    comments: {},
    filter: {
      skip: DEFAULT_SKIP_PAGE,
      limit: DEFAULT_LIMIT_PAGE,
    },
  
    reset,
    setPost,
    getPost,
    setPosts,
    getPosts,
    setUserId,
    setFilter,
    setComments,
    getCommentsByPost,
  }
})

export default useAccountStore;