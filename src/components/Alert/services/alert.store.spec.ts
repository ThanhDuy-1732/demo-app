// Utilities
import { renderHook, act } from '@testing-library/react';

// Stores
import useAlertStore, { MessageType } from '@/components/Alert/services/alert.store';

jest.useFakeTimers();

describe('useAlertStore', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useAlertStore());
    while(result.current.messages.length) {
      const idToDelete = result.current.messages[0].id;

      act(() => {
        result.current.deleteMessage(idToDelete);
      });
    }
  })

  it('should initialize with an empty messages array', () => {
    const { result } = renderHook(() => useAlertStore());
    expect(result.current.messages).toEqual([]);
  });

  it('should add a message to the store', () => {
    const { result } = renderHook(() => useAlertStore());

    act(() => {
      result.current.addMessage({ message: 'Test success', type: MessageType.success });
    });

    expect(result.current.messages.length).toBe(1);
    expect(result.current.messages[0]).toMatchObject({
      message: 'Test success',
      type: MessageType.success,
    });
  });

  it('should delete a message from the store', () => {
    const { result } = renderHook(() => useAlertStore());

    act(() => {
      result.current.addMessage({ message: 'Test error', type: MessageType.error });
    });

    const idToDelete = result.current.messages[0].id;

    act(() => {
      result.current.deleteMessage(idToDelete);
    });

    expect(result.current.messages.length).toBe(0);
  });

  it('should reset the store', () => {
    const { result } = renderHook(() => useAlertStore());

    act(() => {
      result.current.addMessage({ message: 'Test warning', type: MessageType.warning });
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.messages).toEqual([]);
  });

  it('should automatically delete non-error messages after 2000ms', () => {
    const { result } = renderHook(() => useAlertStore());

    act(() => {
      result.current.addMessage({ message: 'Test success', type: MessageType.success });
    });

    expect(result.current.messages.length).toBe(1);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(result.current.messages.length).toBe(0);
  });

  it('should not automatically delete error messages', () => {
    const { result } = renderHook(() => useAlertStore());

    act(() => {
      result.current.addMessage({ message: 'Test error', type: MessageType.error });
    });

    expect(result.current.messages.length).toBe(1);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(result.current.messages.length).toBe(1);
  });

  it('should keep only the last 5 messages in the store', () => {
    const { result } = renderHook(() => useAlertStore());

    act(() => {
      for (let i = 0; i < 6; i++) {
        result.current.addMessage({ message: `Test ${i}`, type: MessageType.success });
      }
    });

    expect(result.current.messages.length).toBe(5);
    expect(result.current.messages[0].message).toBe('Test 1');
  });
});
