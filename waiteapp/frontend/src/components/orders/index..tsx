import { useEffect, useState } from 'react';
import socketIo from 'socket.io-client';

import { Order } from '../../types/order';
import { api } from '../../utils/api';
import { env } from '../../utils/environment-variables';
import { OrdersBoard } from '../orders-board';
import { Container } from './styles';

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const socket = socketIo(env.apiUrl, {
      transports: ['websocket'],
    });

    socket.on('orders@new', (order) => {
      setOrders((prevState) => prevState.concat(order));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    api.get('/orders')
      .then(({ data }) => {
        setOrders(data);
      });
  }, []);

  const waiting = orders.filter((order) => order.status === 'WAITING');
  const inProduction = orders.filter((order) => order.status === 'IN_PRODUCTION');
  const done = orders.filter((order) => order.status === 'DONE');

  function handleCancelOrder(orderId: string) {
    setOrders((prevState) => prevState.filter(order => order._id !== orderId));
  }

  function handleOrderStatusChange(orderId: string, status: Order['status']) {
    setOrders((prevState) => prevState.map((order) => (
      order._id === orderId
        ? { ...order, status }
        : order
    )));
  }

  return (
    <Container>
      <OrdersBoard
        icon="🕒"
        title="Fila de espera"
        orders={waiting}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />

      <OrdersBoard
        icon="👨‍🍳"
        title="Em preparação"
        orders={inProduction}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />

      <OrdersBoard
        icon="✅"
        title="Pronto!"
        orders={done}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />
    </Container>
  );
}
