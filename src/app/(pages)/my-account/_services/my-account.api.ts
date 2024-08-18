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
  select?: string[],
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

export default class AccountAPI {
  async getPosts(id: number, query: PostsQuery): Promise<AxiosResponse<PostsData>> {
    return await http().get(`/posts/user/${id}`, {
      params: query,
    });
  }
}