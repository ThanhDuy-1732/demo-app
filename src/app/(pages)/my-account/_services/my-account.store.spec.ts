// Utilities
import MockAdapter from 'axios-mock-adapter';
import { renderHook, act } from '@testing-library/react';

// APIs
import { http } from '@/services/http/http';
import { PostsData, CommentsData } from '@/app/(pages)/posts/_services/post.api';

// Stores
import useAccountStore from './my-account.store';

describe('useAccountStore', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(http());
  });

  afterEach(() => {
    mock.reset();
  });

  it('should fetch and set a post successfully', async () => {
    const postId = 1;

    const { result } = renderHook(() => useAccountStore());
    
    await act(async () => {
      await result.current.getPost(postId);
    });

    expect(result.current.post).toBeTruthy();
    expect(result.current.post).toHaveProperty('id', 1);
  });

  it('should fetch and set posts successfully', async () => {
    const mockUserId = 1;

    const { result } = renderHook(() => useAccountStore());

    await act(async () => {
      await result.current.setUserId(mockUserId);
      await result.current.getPosts();
    });

    expect(result.current.posts).toBeTruthy();
    expect((result.current.posts as PostsData).posts).toHaveLength;
  });

  it('should fetch and set comments successfully', async () => {
    const postId = 1;

    const { result } = renderHook(() => useAccountStore());

    await act(async () => {
      await result.current.getCommentsByPost(postId, { skip: 0, limit: 10 });
    });

    expect(result.current.comments).toBeTruthy();
    expect((result.current.comments as CommentsData).comments.length).toHaveLength;
  });

  it('should reset the state correctly', () => {
    const { result } = renderHook(() => useAccountStore());

    act(() => {
      result.current.setPost({ id: 1, body: 'Test body', title: 'Test title' });
      result.current.setUserId(1);
      result.current.setPosts({ data: [], total: 0, skip: 0, limit: 10 });
      result.current.setComments({ data: [], total: 0, skip: 0, limit: 10 });
      result.current.reset();
    });

    expect(result.current.post).toEqual({});
    expect(result.current.userId).toBe(0);
    expect(result.current.posts).toEqual({});
    expect(result.current.comments).toEqual({});
  });
});
