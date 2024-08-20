// import { renderHook, act } from '@testing-library/react';
// import MockAdapter from 'axios-mock-adapter';
// import { http } from '@/services/http/http';
// import useAuthStore from './auth.store';
// import { AuthAPI } from './auth.http';

// describe('useAuthStore', () => {
//   let mock: MockAdapter;
//   const authAPI = new AuthAPI();

//   beforeEach(() => {
//     mock = new MockAdapter(http());
//   });

//   afterEach(() => {
//     mock.reset();
//   });

//   it('should set access and refresh tokens when signIn is called', async () => {
//     const mockSignInPayload = {
//       username: 'testuser',
//       password: 'password123',
//     };

//     const mockSignInResponse = {
//       token: 'mockAccessToken',
//       refreshToken: 'mockRefreshToken',
//     };

//     mock.onPost('/auth/login').reply(200, mockSignInResponse);

//     const { result } = renderHook(() => useAuthStore());

//     await act(async () => {
//       await result.current.signIn(mockSignInPayload);
//     });

//     expect(result.current.accessToken).toBe(mockSignInResponse.token);
//     expect(result.current.refreshToken).toBe(mockSignInResponse.refreshToken);
//     expect(localStorage.getItem('accessToken')).toBe(mockSignInResponse.token);
//     expect(localStorage.getItem('refreshToken')).toBe(mockSignInResponse.refreshToken);
//   });

//   it('should clear access and refresh tokens when signOut is called', () => {
//     const { result } = renderHook(() => useAuthStore());

//     act(() => {
//       result.current.setAccessToken('mockAccessToken');
//       result.current.setRefreshToken('mockRefreshToken');
//     });

//     expect(result.current.accessToken).toBe('mockAccessToken');
//     expect(result.current.refreshToken).toBe('mockRefreshToken');

//     act(() => {
//       result.current.signOut();
//     });

//     expect(result.current.accessToken).toBe('');
//     expect(result.current.refreshToken).toBe('');
//     expect(localStorage.getItem('accessToken')).toBe('');
//     expect(localStorage.getItem('refreshToken')).toBe('');
//   });

//   it('should fetch and set user data when getMe is called', async () => {
//     const mockMeResponse = {
//       id: 1,
//       age: 30,
//       email: 'testuser@example.com',
//       phone: '123-456-7890',
//       image: 'http://example.com/image.jpg',
//       gender: 'male',
//       lastName: 'Doe',
//       username: 'testuser',
//       firstName: 'John',
//       birthDate: '1993-01-01',
//       maidenName: 'Smith',
//     };

//     mock.onGet('/auth/me').reply(200, mockMeResponse);

//     const { result } = renderHook(() => useAuthStore());

//     await act(async () => {
//       await result.current.getMe();
//     });

//     expect(result.current.me).toEqual(mockMeResponse);
//   });

//   it('should return the user id when getMyId is called', () => {
//     const mockUserData = {
//       id: 1,
//       age: 30,
//       email: 'testuser@example.com',
//       phone: '123-456-7890',
//       image: 'http://example.com/image.jpg',
//       gender: 'male',
//       lastName: 'Doe',
//       username: 'testuser',
//       firstName: 'John',
//       birthDate: '1993-01-01',
//       maidenName: 'Smith',
//     };

//     const { result } = renderHook(() => useAuthStore());

//     act(() => {
//       result.current.signIn({ username: 'emilys', password: 'emilyspass' });
//       // result.current.setAccessToken('mockAccessToken');
//       // result.current.setRefreshToken('mockRefreshToken');
//       result.current.getMe(); 
//     });

//     expect(result.current.getMyId()).toBe(mockUserData.id);
//   });
// });
