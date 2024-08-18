// Utilities
import { AxiosResponse } from "axios"
import { http } from "@/services/http/http"

export enum OrderEnum {
  ASC = 'asc',
  DESC = 'desc',
}

export type PostsQuery = {
  skip?: number,
  limit?: number,
  sortBy?: string,
  order?: OrderEnum,
}

export type PostsData = PaginationResponseType<{
  posts: Array<PostData>,
}>

export type PostData = {
  id: number,
  body: string,
  title: string,
  tags: string[],
  reactions: {
    likes: number,
    dislikes: number
  },
  views: number,
  userId: number
}

export default class AccountAPI {
  async getPosts(id: number, query: PostsQuery): Promise<AxiosResponse<PostsData>> {
    return await http().get(`/posts/user/${id}`, {
      params: query,
    });
  }
}