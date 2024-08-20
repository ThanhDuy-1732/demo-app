// Utilities
import { renderHook, act } from '@testing-library/react';

// Stores
import useLoadingStore from './loading.store';

describe('useLoadingStore', () => {
  beforeEach(() => {
    // Reset the Zustand store before each test
    const { result } = renderHook(() => useLoadingStore());
    while(result.current.loadingCount > 0) {
      act(() => {
        result.current.setLoading(false); // Ensure store is reset to initial state
      });
    }
  });

  it('should initialize with loading false and loadingCount 0', () => {
    const { result } = renderHook(() => useLoadingStore());

    expect(result.current.loading).toBe(false);
    expect(result.current.loadingCount).toBe(0);
  });

  it('should set loading to true when setLoading is called with true', () => {
    const { result } = renderHook(() => useLoadingStore());

    act(() => {
      result.current.setLoading(true);
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.loadingCount).toBe(1);
  });

  it('should set loading to false when setLoading is called with false', () => {
    const { result } = renderHook(() => useLoadingStore());

    act(() => {
      result.current.setLoading(true);
      result.current.setLoading(false);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.loadingCount).toBe(0);
  });

  it('should increment loadingCount when setLoading(true) is called multiple times', () => {
    const { result } = renderHook(() => useLoadingStore());

    act(() => {
      result.current.setLoading(true);
      result.current.setLoading(true);
    });

    expect(result.current.loadingCount).toBe(2);
    expect(result.current.loading).toBe(true);
  });

  it('should decrement loadingCount when setLoading(false) is called multiple times', () => {
    const { result } = renderHook(() => useLoadingStore());

    act(() => {
      result.current.setLoading(true);
      result.current.setLoading(true);
      result.current.setLoading(false);
    });

    expect(result.current.loadingCount).toBe(1);
    expect(result.current.loading).toBe(true);

    act(() => {
      result.current.setLoading(false);
    });

    expect(result.current.loadingCount).toBe(0);
    expect(result.current.loading).toBe(false);
  });

  it('should not allow loadingCount to be negative', () => {
    const { result } = renderHook(() => useLoadingStore());

    act(() => {
      result.current.setLoading(false);
    });

    expect(result.current.loadingCount).toBe(0);
    expect(result.current.loading).toBe(false);
  });
});
