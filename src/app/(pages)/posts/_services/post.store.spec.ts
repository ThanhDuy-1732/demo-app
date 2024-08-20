// Utilities
import MockAdapter from 'axios-mock-adapter';
import { renderHook, act } from '@testing-library/react';

// APIs
import { http } from '@/services/http/http';
import PostAPI, { CommentsData, PostsData } from './post.api';

// Stores
import usePostStore from './post.store';

describe('usePostStore', () => {
  let mock: MockAdapter;
  let postAPI: PostAPI;

  beforeEach(() => {
    mock = new MockAdapter(http());
    postAPI = new PostAPI();
  });

  afterEach(() => {
    mock.reset();
  });

  it('should fetch posts successfully', async () => {const { result } = renderHook(() => usePostStore());

    await act(async () => {
      await result.current.getPosts({ skip: 0, limit: 10 });
    });

    expect(result.current.posts).toHaveProperty('posts');
    expect(result.current.posts).toHaveProperty('skip');
    expect(result.current.posts).toHaveProperty('limit');
    expect(result.current.posts).toHaveProperty('total');
    expect((result.current.posts as PostsData).posts).toHaveLength;
  });

  it('should fetch a single post successfully', async () => {
    const postId = 1;
    const { result } = renderHook(() => usePostStore());

    await act(async () => {
      await result.current.getPost(postId);
    });

    expect(result.current.post).toHaveProperty('id', postId);
  });

  it('should save a comment successfully', async () => {
    const initialComments = {
      total: 0,
      skip: 0,
      limit: 10,
      comments: [],
    };

    const newComment = {
      body: 'Test comment',
      likes: 0,
      postId: 1,
      user: {
        id: 1,
        username: 'user1',
        fullName: 'User One',
      },
    };

    const { result } = renderHook(() => usePostStore());

    act(() => {
      result.current.setComments(initialComments);
      result.current.saveComment(newComment);
    });

    expect((result.current.comments as CommentsData).comments[0]).toEqual({ ...newComment, id: 0 });
    expect((result.current.comments as CommentsData).total).toBe(1);
  });

  it('should reset the state', () => {
    const initialComments = {
      total: 1,
      skip: 0,
      limit: 10,
      data: [
        {
          id: 1,
          body: 'Test comment',
          likes: 0,
          postId: 1,
          user: {
            id: 1,
            username: 'user1',
            fullName: 'User One',
          },
        },
      ],
    };

    const { result } = renderHook(() => usePostStore());

    act(() => {
      result.current.setComments(initialComments);
      result.current.reset();
    });

    expect(result.current.post).toEqual({});
    expect(result.current.posts).toEqual({});
    expect(result.current.comments).toEqual({});
    expect(result.current.filter).toEqual({});
  });

  it('should fetch comments for a post successfully', async () => {
    const postId = 1;

    const { result } = renderHook(() => usePostStore());

    await act(async () => {
      await result.current.getCommentsByPost(postId, { skip: 0, limit: 10 });
    });

    expect((result.current.comments as CommentsData)).toHaveProperty('comments');
    expect((result.current.comments as CommentsData).comments).toHaveLength;
  });
});
