import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { OrderContext } from '../../contexts/OrderProvider/OrderProvider';
import { useFetchProducts } from '../../Hooks/useFetchProducts';
import Order from './Order';
import { OrderMock } from '../../Mocks/OrderMock';
import { ProductsMock } from '../../Mocks/ProductsMock';

vi.mock('../../Hooks/useFetchProducts');

const mockedUseFetchProducts = useFetchProducts as vi.Mock;

const mockFetchProducts = vi.fn();

describe('Order Component', () => {
  beforeEach(() => {
    mockedUseFetchProducts.mockReturnValue({
      loading: false,
      products: null,
      fetchProducts: mockFetchProducts,
    });
  });

  it('renders loading state', () => {
    mockedUseFetchProducts.mockReturnValueOnce({
      loading: true,
      products: [],
      fetchProducts: mockFetchProducts,
    });

    render(
      <OrderContext.Provider value={{ order: OrderMock, setOrder: vi.fn() }}>
        <Order />
      </OrderContext.Provider>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders order details', async () => {
    mockedUseFetchProducts.mockReturnValueOnce({
      loading: false,
      products: [],
      fetchProducts: mockFetchProducts,
    });

    render(
      <OrderContext.Provider value={{ order: OrderMock, setOrder: vi.fn() }}>
        <Order />
      </OrderContext.Provider>
    );

    expect(screen.getByText('Pedido #1025')).toBeInTheDocument();
    expect(screen.getByText('success')).toBeInTheDocument();
    expect(screen.getByText('18/07/2024 08:00')).toBeInTheDocument();
    expect(screen.getByText('R$ 7512.41')).toBeInTheDocument();
    expect(screen.getByText('abner.persio@after.sale')).toBeInTheDocument();
    expect(screen.getByText('(19) 97419-8800')).toBeInTheDocument();
    expect(screen.getByText('Rua Leoni Bertoline, 123 - Louveira, São Paulo')).toBeInTheDocument();
  });

  it('renders products', async () => {
    mockedUseFetchProducts.mockReturnValueOnce({
      loading: false,
      products: ProductsMock,
      fetchProducts: mockFetchProducts,
    });

    render(
      <OrderContext.Provider value={{ order: OrderMock, setOrder: vi.fn() }}>
        <Order />
      </OrderContext.Provider>
    );

    expect(screen.getByText('Camiseta Send4Lovers')).toBeInTheDocument();
    expect(screen.getByText('SKU: camiseta-send4lovers-1')).toBeInTheDocument();
    expect(screen.getByText('R$79.90')).toBeInTheDocument();
  });
});
