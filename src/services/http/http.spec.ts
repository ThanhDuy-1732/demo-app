// Utilities
import axios, { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';

// APIs
import { http } from './http';

describe('http utility', () => {
  let mock: MockAdapter;
  const mockResponseData = { data: 'test data' };

  beforeEach(() => {
    mock = new MockAdapter(axios);
    localStorage.clear();
  });

  afterEach(() => {
    mock.reset();
  });

  it('should set the Content-Type header to application/json', async () => {
    const api = http();
    mock.onGet('/test').reply(200, mockResponseData);

    const response = await api.get('/test');
    
    expect(response.config.headers['Content-Type']).toBe('application/json');
  });

  it('should add Authorization header if accessToken is present in localStorage', async () => {
    const token = 'test-token';
    localStorage.setItem('accessToken', token);

    const api = http();
    mock.onGet('/test').reply(200, mockResponseData);

    const response = await api.get('/test');
    
    expect(response.config.headers['Authorization']).toBe(`Bearer ${token}`);
  });

  it('should not add Authorization header if accessToken is not present in localStorage', async () => {
    const api = http();
    mock.onGet('/test').reply(200, mockResponseData);

    const response = await api.get('/test');
    
    expect(response.config.headers['Authorization']).toBeUndefined();
  });

  it('should handle a successful response', async () => {
    const api = http();
    mock.onGet('/test').reply(200, mockResponseData);

    const response = await api.get('/test');

    expect(response.status).toBe(200);
    expect(response.data.data).toBe('test data');
  });

  it('should handle an error response and throw an error with the correct message', async () => {
    const errorMessage = 'Request failed';
    const api = http();
    mock.onGet('/test').reply(400, { message: errorMessage });

    await expect(api.get('/test')).rejects.toThrow(errorMessage);
  });

  it('should log the error if a request fails', async () => {
    const errorMessage = 'Request failed';
    const api = http();
    mock.onGet('/test').reply(400, { message: errorMessage });

    console.log = jest.fn();

    try {
      await api.get('/test');
    } catch (error) {
      // Error expected
    }

    expect(console.log).toHaveBeenCalledWith(expect.any(AxiosError));
  });
});
