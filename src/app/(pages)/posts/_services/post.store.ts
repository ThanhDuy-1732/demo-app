import { create } from "zustand"
import PostAPI, { CommentsData, CommentsQuery, PostData, PostsData, SearchPosts } from "./post.api"
import { DEFAULT_LIMIT_PAGE, DEFAULT_SKIP_PAGE } from "@/services/constants"

export type PostState = {
  post: PostData | {},
  posts: PostsData | {},
  filter: SearchPosts | {},
  comments: CommentsData | {},
}

export type PostAction = {
  reset: () => void,
  getPost: (id: number) => Promise<void>,
  setPost: (post: PostState['post']) => void,
  setPosts: (posts: PostState['posts']) => void,
  setFilter: (filter: PostState['filter']) => void,
  setComments: (comments: PostState['comments']) => void,
  getPosts: (filter?: PostState['filter']) => Promise<void>,
  getCommentsByPost: (id: number, query: CommentsQuery) => Promise<void>,
}

const usePostStore = create<PostState & PostAction>((set, get) => {
  const setPost = (post: PostState['post']) => {
    set(() => ({ post }));
  };

  const setPosts = (posts: PostState['posts']) => {
    set(() => ({ posts }));
  };

  const setFilter = (filter: PostState['filter']) => {
    set(() => ({ filter }));
  }

  const setComments = (comments: PostState['comments']) => {
    set(() => ({ comments }));
  };

  const reset = () => {
    setPost({});
    setPosts([]);
    setFilter({});
    setComments({});
  }

  const getPosts = async (filter?: PostState['filter']) => {
    if (filter) {
      setFilter(filter);
    }

    const api = new PostAPI();

    const response = await api.searchPosts(get().filter);

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
    setFilter,
    setComments,
    getCommentsByPost,
  }
})

export default usePostStore;