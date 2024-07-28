import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { OrderType } from './OrderType';

interface OrderContextInterface {
  order: OrderType | null;
  setOrder: Dispatch<SetStateAction<OrderType | null>>;
}

const defaultState = {
  order: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setOrder: (_order: OrderType) => {},
} as OrderContextInterface;

export const OrderContext = createContext(defaultState);

type OrderContextType = {
  children: ReactNode;
};

function OrderProvider({ children }: OrderContextType) {
  const [order, setOrder] = useState<OrderType | null>(null);

  return <OrderContext.Provider value={{ order, setOrder }}>{children}</OrderContext.Provider>;
}

export default OrderProvider;
