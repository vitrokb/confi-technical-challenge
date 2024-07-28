import { renderHook, act } from '@testing-library/react-hooks';
import { describe, it, expect, vi } from 'vitest';
import { waitFor } from '@testing-library/react';
import { ProductsMock } from '../../Mocks/ProductsMock';
import useFetchProducts from './useFetchProducts';

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ products: ProductsMock }),
  } as Response)
);

describe('useFetchProducts', () => {
  it('should initially have loading as false and products as null', () => {
    const { result } = renderHook(() => useFetchProducts());
    expect(result.current.loading).toBe(false);
    expect(result.current.products).toBeUndefined();
  });

  it('should set loading to true while fetching', async () => {
    const { result } = renderHook(() => useFetchProducts());

    act(() => {
      result.current.fetchProducts('fakeurl', {});
    });

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });

  it('should update the products with fetched data', async () => {
    const { result } = renderHook(() => useFetchProducts());

    act(() => {
      result.current.fetchProducts('fakeurl', {});
    });

    await waitFor(() => {
      expect(result.current.products).toEqual(ProductsMock);
    });
  });

  it('should handle errors properly', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error('Fetch failed'))
    );

    const { result } = renderHook(() => useFetchProducts());

    act(() => {
      result.current.fetchProducts('fakeurl', {});
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.products).toBeUndefined();
    });
  });
});
