// Utilities
import MockAdapter from 'axios-mock-adapter';

// APIs
import { http } from '@/services/http/http';
import AccountAPI, { PostsQuery, OrderEnum } from './my-account.api';

jest.useRealTimers();

describe('AccountAPI', () => {
  let mock: MockAdapter;
  let accountAPI: AccountAPI;

  beforeEach(() => {
    jest.setTimeout(10000);
    mock = new MockAdapter(http());
    accountAPI = new AccountAPI();
  });

  afterEach(() => {
    mock.reset();
  });

  it('should fetch posts successfully', async () => {
    const mockId = 1;
    const mockQuery: PostsQuery = {
      skip: 0,
      limit: 10,
      sortBy: 'createdAt',
      order: OrderEnum.ASC,
    };

    const result = await accountAPI.getPosts(mockId, mockQuery);

    expect(result.data).toHaveProperty('posts');
    expect(result.status).toBe(200);
  });

  it('should handle error when fetching posts', async () => {
    const mockId = -1;
    const mockQuery: PostsQuery = {
      skip: 0,
      limit: 10,
      sortBy: 'createdAt',
      order: OrderEnum.ASC,
    };

    await expect(accountAPI.getPosts(mockId, mockQuery)).rejects.toThrowError();
  });
});
