// Utilities
import MockAdapter from 'axios-mock-adapter';

// APIs
import PostAPI from './post.api';
import { http } from '@/services/http/http';

describe('PostAPI', () => {
  let mock: MockAdapter;
  let postAPI: PostAPI;

  beforeEach(() => {
    mock = new MockAdapter(http());
    postAPI = new PostAPI();
  });

  afterEach(() => {
    mock.reset();
  });

  it('should fetch posts successfully', async () => {
    const response = await postAPI.getPosts({ skip: 0, limit: 10 });

    expect(response.data).toHaveProperty('posts');
    expect(response.data.posts).toHaveLength;
  });

  it('should search posts with keyword successfully', async () => {
    const response = await postAPI.searchPosts({ keyword: 'his', skip: 0, limit: 10 });

    expect(response.data).toHaveProperty('posts');
    expect(response.data.posts).toHaveLength;
  });

  it('should fetch a single post successfully', async () => {
    const postId = 1;
    const response = await postAPI.getPost(postId);

    expect(response.data).toBeTruthy;
    expect(response.data).toHaveProperty('id', postId);
  });

  it('should fetch comments for a post successfully', async () => {
    const postId = 1;
    const response = await postAPI.getCommentByPost(postId, { skip: 0, limit: 10 });

    expect(response.data).toHaveProperty('comments');
    expect(response.data.comments).toHaveLength;
  });

  it('should fetch posts with select values by keyword successfully', async () => {
    const keyword = 'his';
    const select = 'title';

    const response = await postAPI.getSelectValueWithKeyword(keyword, select);

    expect(response.data).toHaveProperty('posts');
    expect(response.data.posts).toHaveLength;
  });
});
