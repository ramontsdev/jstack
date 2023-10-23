import { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { CartItem } from '../../types/cart-item';
import { Product } from '../../types/product';
import { api } from '../../utils/api';
import { env } from '../../utils/environment-variables';
import { formatCurrency } from '../../utils/format-currency';
import { Button } from '../button';
import { MinusCircle } from '../Icons/MinusCircle';
import { PlusCircle } from '../Icons/PlusCircle';
import { OrderConfirmedModal } from '../order-confirmed-modal';
import { Text } from '../Text';
import { Actions, Image, Item, ProductContainer, ProductDetails, QuantityContainer, Summary, TotalContainer } from './styles';

type CartProps = {
  cartItems: CartItem[];
  onAdd(product: Product): void;
  onDecrement(product: Product): void;
  onConfirmOrder(): void;
  selectedTable: string;
}

export function Cart({ cartItems, onAdd, onDecrement, onConfirmOrder, selectedTable }: CartProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const total = cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.quantity * cartItem.product.price;
  }, 0);

  async function handleConfirmOrder() {
    setIsLoading(true);

    const payload = {
      table: selectedTable,
      products: cartItems.map(cartItem => ({
        product: cartItem.product._id,
        quantity: cartItem.quantity
      }))
    };

    await api.post('/orders', payload);
    setIsLoading(false);
    setIsModalVisible(true);
  }

  function handleOk() {
    onConfirmOrder();
    setIsModalVisible(true);
  }

  return (
    <>
      <OrderConfirmedModal
        visible={isModalVisible}
        onOk={handleOk}
      />

      {cartItems.length > 0 && (
        <FlatList
          data={cartItems}
          keyExtractor={cartItem => cartItem.product._id}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 20, maxHeight: 150 }}
          renderItem={({ item: cartItem }) => (
            <Item>
              <ProductContainer>
                <Image
                  source={{
                    uri: `${env.apiUrl}/uploads/${cartItem.product.imagePath}`
                  }}
                />

                <QuantityContainer>
                  <Text size={14} color="#566">
                    {cartItem.quantity}x
                  </Text>
                </QuantityContainer>

                <ProductDetails>
                  <Text size={14} weight="600">{cartItem.product.name}</Text>
                  <Text size={14} color="#566" style={{ marginTop: 4 }}>
                    {formatCurrency(cartItem.product.price)}
                  </Text>
                </ProductDetails>
              </ProductContainer>

              <Actions>
                <TouchableOpacity
                  style={{ marginRight: 20 }}
                  onPress={() => onAdd(cartItem.product)}
                >
                  <PlusCircle />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onDecrement(cartItem.product)}>
                  <MinusCircle />
                </TouchableOpacity>
              </Actions>
            </Item>
          )}
        />
      )}

      <Summary>
        <TotalContainer>
          {cartItems.length > 0 ? (
            <>
              <Text color='#566'>Total</Text>
              <Text size={20} weight="600">{formatCurrency(total)}</Text>
            </>
          ) : (
            <Text color='#999'>Seu carrinho está vazio</Text>
          )
          }
        </TotalContainer>

        <Button
          onPress={handleConfirmOrder}
          disabled={cartItems.length === 0}
          loading={isLoading}
        >
          Confirmar pedido
        </Button>
      </Summary>
    </>
  );
}
