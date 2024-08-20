// Utilities
import axios, { AxiosResponse } from 'axios';
import MockAdapter from 'axios-mock-adapter';

// APIS
import CommonAPI, { UserData } from '@/services/http/common.http';

describe('CommonAPI', () => {
  let mock: MockAdapter;
  const mockResponseData: UserData = {
    id: 1,
    age: 30,
    email: 'test@example.com',
    phone: '123-456-7890',
    image: 'http://example.com/image.jpg',
    gender: 'Male',
    lastName: 'Doe',
    username: 'johndoe',
    firstName: 'John',
    birthDate: '1994-01-01',
    maidenName: 'Smith',
  };

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it('should fetch user data by ID', async () => {
    const userId = 1;
    mock.onGet(`/users/${userId}`).reply(200, mockResponseData);

    const api = new CommonAPI();
    const response: AxiosResponse<UserData> = await api.getUserById(userId);

    expect(response.status).toBe(200);
    expect(response.data).toEqual(mockResponseData);
  });

  it('should handle errors from the API', async () => {
    const userId = 1;
    const errorMessage = 'User not found';
    mock.onGet(`/users/${userId}`).reply(404, { message: errorMessage });

    const api = new CommonAPI();
    await expect(api.getUserById(userId)).rejects.toThrow(errorMessage);
  });
});
