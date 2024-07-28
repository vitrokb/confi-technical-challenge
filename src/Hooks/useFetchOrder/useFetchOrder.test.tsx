import { renderHook, act } from '@testing-library/react-hooks';
import { describe, it, expect, vi } from 'vitest';
import { OrderMock } from '../../Mocks/OrderMock';
import useFetchOrder from './useFetchOrder';
import { waitFor } from '@testing-library/react';

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ orders: [OrderMock] }),
  } as Response)
);

describe('useFetchOrder', () => {
  it('should initially have loading as false and response as null', () => {
    const { result } = renderHook(() => useFetchOrder());
    expect(result.current.loading).toBe(false);
    expect(result.current.response).toBeUndefined();
  });

  it('should set loading to true while fetching', async () => {
    const { result } = renderHook(() => useFetchOrder());

    act(() => {
      result.current.fetchData('fakeurl', {});
    });

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });

  it('should update the response with fetched data', async () => {
    const { result } = renderHook(() => useFetchOrder());

    act(() => {
      result.current.fetchData('fakeurl', {});
    });

    await waitFor(() => {
      expect(result.current.response).toEqual(OrderMock);
    });
  });

  it('should handle errors properly', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error('Fetch failed'))
    );

    const { result } = renderHook(() => useFetchOrder());

    act(() => {
      result.current.fetchData('fakeurl', {});
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.response).toBeUndefined();
    });
  });
});
