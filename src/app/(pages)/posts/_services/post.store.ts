// Utilities
import { create } from "zustand"

// APIs
import PostAPI, { CommentData, CommentsData, CommentsQuery, PostData, PostsData, SearchPosts } from "./post.api"

// Constants
import { DEFAULT_LIMIT_PAGE, DEFAULT_SKIP_PAGE } from "@/services/constants"

export type PostState = {
  post: PostData | {},
  posts: PostsData | {},
  filter: SearchPosts | {},
  comments: CommentsData | {},
}

export type PostAction = {
  reset: () => void,
  getFilter: () => PostState['filter'],
  getPost: (id: number) => Promise<void>,
  getComments: () => PostState['comments'],
  setPost: (post: PostState['post']) => void,
  setPosts: (posts: PostState['posts']) => void,
  setFilter: (filter: PostState['filter']) => void,
  setComments: (comments: PostState['comments']) => void,
  saveComment: (comment: Omit<CommentData, 'id'>) => void, 
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

  const getComments = () => get().comments;

  const reset = () => {
    setPost({});
    setPosts({});
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
    setFilter,
    getComments,
    saveComment,
    setComments,
    getCommentsByPost,
  }
})

export default usePostStore;