// Utilities
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// APIs
import { AuthAPI, SignInPayload, SignInData, MeData } from './auth.http';

describe('AuthAPI', () => {
  let mock: MockAdapter;
  const authAPI = new AuthAPI();

  beforeEach(() => {
    jest.setTimeout(10000);
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it('should successfully sign in a user', async () => {
    const mockSignInPayload: SignInPayload = {
      username: 'testuser',
      password: 'password123',
    };

    const mockSignInResponse: SignInData = {
      id: 1,
      email: 'testuser@example.com',
      image: 'http://example.com/image.jpg',
      token: 'mockToken',
      gender: 'male',
      lastName: 'Doe',
      username: 'testuser',
      firstName: 'John',
      refreshToken: 'mockRefreshToken',
    };

    mock.onPost('/auth/login').reply(200, mockSignInResponse);

    const response = await authAPI.signIn(mockSignInPayload);

    expect(response.status).toBe(200);
    expect(response.data).toEqual(mockSignInResponse);
  });

  it('should handle sign in errors', async () => {
    const mockSignInPayload: SignInPayload = {
      username: 'testuser',
      password: 'wrongpassword',
    };

    const mockErrorMessage = 'Invalid credentials';

    mock.onPost('/auth/login').reply(401, { message: mockErrorMessage });

    await expect(authAPI.signIn(mockSignInPayload)).rejects.toThrow(mockErrorMessage);
  });

  it('should fetch user data', async () => {
    const mockMeResponse: MeData = {
      id: 1,
      age: 30,
      email: 'testuser@example.com',
      phone: '123-456-7890',
      image: 'http://example.com/image.jpg',
      gender: 'male',
      lastName: 'Doe',
      username: 'testuser',
      firstName: 'John',
      birthDate: '1993-01-01',
      maidenName: 'Smith',
    };

    mock.onGet('/auth/me').reply(200, mockMeResponse);

    const response = await authAPI.me();

    expect(response.status).toBe(200);
    expect(response.data).toEqual(mockMeResponse);
  });

  it('should handle errors when fetching user data', async () => {
    const mockErrorMessage = 'Unauthorized';

    mock.onGet('/auth/me').reply(401, { message: mockErrorMessage });

    await expect(authAPI.me()).rejects.toThrow(mockErrorMessage);
  });
});
