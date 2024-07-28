import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { useContext } from 'react';
import { describe, it, expect } from 'vitest';
import OrderProvider, { OrderContext } from './OrderProvider';
import OrderMock from '../../Mocks/OrderMock';

describe('OrderProvider', () => {
  it('provides a default state', () => {
    const TestComponent = () => {
      const { order, setOrder } = useContext(OrderContext);
      expect(order).toBeNull();
      expect(typeof setOrder).toBe('function');

      return null;
    };

    render(
      <OrderProvider>
        <TestComponent />
      </OrderProvider>
    );
  });

  it('allows updating the order state', () => {
    const TestComponent = () => {
      const { order, setOrder } = useContext(OrderContext);

      return (
        <>
          <button onClick={() => setOrder(OrderMock)}>SetState</button>
          <div>{order?.email}</div>
        </>
      );
    };

    render(
      <OrderProvider>
        <TestComponent />
      </OrderProvider>
    );

    fireEvent.click(screen.getByText('SetState'));

    waitFor(() => {
      expect(screen.getByText('abner.persio@after.sale')).toBeInTheDocument();
    });
  });
});
