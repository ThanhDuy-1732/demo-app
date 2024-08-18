import { http } from "@/services/http/http"
import { AxiosResponse } from "axios"

export enum OrderEnum {
  ASC = 'asc',
  DESC = 'desc',
}

export type PostsQuery = {
  skip?: number,
  sortBy?: string,
  limit?: number,
  order?: OrderEnum,
}

export type SearchPosts = PostsQuery & {
  keyword?: string
}

export type Post = {
  id: number,
  title: string,
  reactions: {
    likes: number,
    dislikes: number
  },
  userId: number
}

export type PostsData = PaginationResponseType<{
  posts: Array<PostData>,
}>

export type PostData = {
  id: number,
  title: string,
  body: string,
  tags: string[],
  reactions: {
    likes: number,
    dislikes: number
  },
  views: number,
  userId: number
}

export type CommentData = {
  id: number,
  body: string,
  likes: number,
  postId: number,
  user: {
    id: number,
    username: string,
    fullName: string,
  }
}

export type CommentsQuery = {
  skip?: number,
  limit?: number,
}

export type CommentsData = PaginationResponseType<{
  comments: Array<CommentData>,
}>

export default class PostAPI {
  async getPosts(query: PostsQuery): Promise<AxiosResponse<PostsData>> {
    return await http().get('/posts', {
      params: query,
    });
  }

  async searchPosts(query: SearchPosts): Promise<AxiosResponse<PostsData>> {
    return await http().get('/posts/search', {
      params: {
        ...query,
        q: query.keyword,
      }
    })
  }

  async getPost(id: number): Promise<AxiosResponse<PostData>> {
    return await http().get(`/posts/${id}`);
  }

  async getCommentByPost(id: number, query: CommentsQuery): Promise<AxiosResponse<CommentsData>> {
    return await http().get(`/comments/post/${id}`, { params: query });
  }
}