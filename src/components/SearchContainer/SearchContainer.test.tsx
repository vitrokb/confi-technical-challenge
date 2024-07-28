import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { OrderContext } from '../../contexts/OrderProvider/OrderProvider';
import { useFetchOrder } from '../../Hooks/useFetchOrder';
import SearchContainer from './SearchContainer';
import { vi } from 'vitest';

vi.mock('../../Hooks/useFetchOrder');
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

const mockedUseFetchOrder = useFetchOrder as vi.Mock;
const mockedUseNavigate = useNavigate as vi.Mock;

const mockFetchData = vi.fn();
const mockSetResponse = vi.fn();
const mockSetOrder = vi.fn();

describe('SearchContainer', () => {
  beforeEach(() => {
    mockedUseFetchOrder.mockReturnValue({
      loading: false,
      response: null,
      fetchData: mockFetchData,
      setResponse: mockSetResponse,
    });

    mockedUseNavigate.mockReturnValue(vi.fn());
  });

  it('renders correctly', () => {
    render(
      <OrderContext.Provider value={{ order: null, setOrder: mockSetOrder }}>
        <SearchContainer />
      </OrderContext.Provider>
    );

    expect(screen.getByText('Olá, faça a busca do seu pedido')).toBeInTheDocument();
    expect(screen.getByLabelText('Número do Pedido')).toBeInTheDocument();
    expect(screen.getByLabelText('E-mail de confirmação')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Visualizar Pedidos/i })).toBeInTheDocument();
  });

  it('disables the button when the email is invalid', () => {
    render(
      <OrderContext.Provider value={{ order: null, setOrder: mockSetOrder }}>
        <SearchContainer />
      </OrderContext.Provider>
    );

    fireEvent.change(screen.getByLabelText('E-mail de confirmação'), {
      target: { value: 'invalid-email' },
    });

    expect(screen.getByRole('button', { name: /Visualizar Pedidos/i })).toBeDisabled();
  });

  it('enables the button when the email is valid', () => {
    render(
      <OrderContext.Provider value={{ order: null, setOrder: mockSetOrder }}>
        <SearchContainer />
      </OrderContext.Provider>
    );

    fireEvent.change(screen.getByLabelText('E-mail de confirmação'), {
      target: { value: 'valid.email@example.com' },
    });

    expect(screen.getByRole('button', { name: /Visualizar Pedidos/i })).not.toBeDisabled();
  });

  it('calls fetchData with correct parameters when button is clicked', async () => {
    render(
      <OrderContext.Provider value={{ order: null, setOrder: mockSetOrder }}>
        <SearchContainer />
      </OrderContext.Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /Visualizar Pedidos/i }));

    await waitFor(() => {
      expect(mockFetchData).toHaveBeenCalledWith(
        `${import.meta.env.VITE_BASE_URL}/admin/api/2024-04/orders.json?name=1025&status=any`,
        {
          headers: {
            'X-Shopify-Access-Token': import.meta.env.VITE_ACCESS_TOKEN,
          },
        }
      );
    });
  });

  it('shows a warning if the email does not match the response', async () => {
    mockedUseFetchOrder.mockReturnValue({
      loading: false,
      response: { email: 'different.email@example.com' },
      fetchData: mockFetchData,
      setResponse: mockSetResponse,
    });

    render(
      <OrderContext.Provider value={{ order: null, setOrder: mockSetOrder }}>
        <SearchContainer />
      </OrderContext.Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /Visualizar Pedidos/i }));

    await waitFor(() => {
      expect(
        screen.getByText('Pedido não encontrado, por favor verifique o número do pedido e email!')
      ).toBeInTheDocument();
    });
  });

  it('remove a warning if the input changes', async () => {
    mockedUseFetchOrder.mockReturnValue({
      loading: false,
      response: { email: 'different.email@example.com' },
      fetchData: mockFetchData,
      setResponse: mockSetResponse,
    });

    render(
      <OrderContext.Provider value={{ order: null, setOrder: mockSetOrder }}>
        <SearchContainer />
      </OrderContext.Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /Visualizar Pedidos/i }));

    await waitFor(() => {
      expect(
        screen.getByText('Pedido não encontrado, por favor verifique o número do pedido e email!')
      ).toBeInTheDocument();

      fireEvent.change(screen.getByLabelText('Número do Pedido'), {
        target: { value: 'teste' },
      });

      waitFor(() => {
        expect(
          screen.getByText('Pedido não encontrado, por favor verifique o número do pedido e email!')
        ).not.toBeInTheDocument();
      });
    });
  });

  it('navigates to the order page if the email matches the response', async () => {
    const mockNavigate = vi.fn();

    mockedUseNavigate.mockReturnValue(mockNavigate);
    mockedUseFetchOrder.mockReturnValue({
      loading: false,
      response: { email: 'abner.persio@after.sale' },
      fetchData: mockFetchData,
      setResponse: mockSetResponse,
    });

    render(
      <OrderContext.Provider value={{ order: null, setOrder: mockSetOrder }}>
        <SearchContainer />
      </OrderContext.Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /Visualizar Pedidos/i }));

    await waitFor(() => {
      expect(mockSetOrder).toHaveBeenCalledWith({ email: 'abner.persio@after.sale' });
      expect(mockNavigate).toHaveBeenCalledWith('/order');
    });
  });

  it('look for loading spinner when loading is true', () => {
    mockedUseFetchOrder.mockReturnValue({
      loading: true,
      response: { email: 'abner.persio@after.sale' },
      fetchData: mockFetchData,
      setResponse: mockSetResponse,
    });

    render(
      <OrderContext.Provider value={{ order: null, setOrder: mockSetOrder }}>
        <SearchContainer />
      </OrderContext.Provider>
    );

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });
});
