import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

type OrderType = {
  orders: [{ [key: string]: unknown }];
};

interface OrderContextInterface {
  orders: OrderType | null;
  setOrders: Dispatch<SetStateAction<OrderType | null>>;
}

const defaultState = {
  orders: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setOrders: (_orders: OrderType) => {},
} as OrderContextInterface;

export const OrderContext = createContext(defaultState);

type OrderContextType = {
  children: ReactNode;
};

function OrderProvider({ children }: OrderContextType) {
  const [orders, setOrders] = useState<OrderType | null>(null);

  return <OrderContext.Provider value={{ orders, setOrders }}>{children}</OrderContext.Provider>;
}

export default OrderProvider;
