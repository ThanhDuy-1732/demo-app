// Utilities
import { create } from "zustand"

// APIs
import PostAPI, { CommentData, CommentsData, CommentsQuery, PostData, PostsData, SearchPosts } from "@/app/(pages)/posts/_services/post.api";

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
  getFilter: () => AccountState['filter'],
  setPost: (post: AccountState['post']) => void,
  setPosts: (posts: AccountState['posts']) => void,
  setFilter: (filter: AccountState['filter']) => void,
  saveComment: (comment: Omit<CommentData, 'id'>) => void,
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
    set((state) => ({ comments: { ...state.comments, ...comments } }));
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
    setComments({
      ...response?.data,
      limit: DEFAULT_LIMIT_PAGE,
    });
  }

  const saveComment = (comment: Omit<CommentData, 'id'>) => {
    const data: CommentsData = (get().comments as CommentsData);
    const comments = data.comments;

    comments.unshift({
      ...comment,
      id: Number(data.total || 0),
    });
    setComments({
      ...get().comments,
      comments,
      total: Number(data.total || 0) + 1,
    })
  }

  const getFilter = () => get().filter;
  
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
    getFilter,
    setUserId,
    setFilter,
    saveComment,
    setComments,
    getCommentsByPost,
  }
})

export default useAccountStore;