// Utilities
import MockAdapter from 'axios-mock-adapter';
import { renderHook, act } from '@testing-library/react';

// APIs
import { AuthAPI } from './auth.http';
import { http } from '@/services/http/http';

// Stores
import useAuthStore from './auth.store';

describe('useAuthStore', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    jest.setTimeout(10000);
    mock = new MockAdapter(http());
  });

  afterEach(() => {
    mock.reset();
  });

  it('should clear access and refresh tokens when signOut is called', () => {
    const { result } = renderHook(() => useAuthStore());

    act(() => {
      result.current.setAccessToken('mockAccessToken');
      result.current.setRefreshToken('mockRefreshToken');
    });

    expect(result.current.accessToken).toBe('mockAccessToken');
    expect(result.current.refreshToken).toBe('mockRefreshToken');

    act(() => {
      result.current.signOut();
    });

    expect(result.current.accessToken).toBe('');
    expect(result.current.refreshToken).toBe('');
    expect(localStorage.getItem('accessToken')).toBe('');
    expect(localStorage.getItem('refreshToken')).toBe('');
  });

  it('should set access and refresh tokens when signIn is called', async () => {
    const mockSignInPayload = {
      username: 'emilys',
      password: 'emilyspass',
    };

    const { result } = renderHook(() => useAuthStore());

    await act(async () => {
      await result.current.signIn(mockSignInPayload);
    });

    expect(result.current.accessToken).toBeTruthy();
    expect(result.current.refreshToken).toBeTruthy();
  });

  it('should fetch and set user data when getMe is called', async () => {
    const { result } = renderHook(() => useAuthStore());

    await act(async () => {
      await result.current.getMe();
    });

    expect(result.current.me).toBeTruthy();
  });

  it('should return the user id when getMyId is called', async () => {
    const { result } = renderHook(() => useAuthStore());

    await act(async () => {
      await result.current.getMe(); 
    });

    expect(result.current.getMyId()).toBeTruthy();
  });
});
